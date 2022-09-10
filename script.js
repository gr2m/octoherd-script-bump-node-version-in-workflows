// @ts-check

import { isMatch } from "matcher";
import { composeCreateOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file";
import yaml from "js-yaml";

/**
 * Octoherd script to set the node-version input for actions/setup-node to the latest LTS major version
 *
 * @param {import('@octoherd/cli').Octokit} octokit
 * @param {import('@octoherd/cli').Repository} repository
 * @param {object} options
 * @param {number | string} [options.nodeVersion] Defaults to latest Node LTS major version
 * @param {string} [options.workflow] workflow file name or pattern to only update a subset of workflows
 */
export async function script(
  octokit,
  repository,
  { nodeVersion = "", workflow = "*" }
) {
  if (!nodeVersion) {
    throw new Error(`--node-version is required`);
  }
  if (repository.archived) {
    octokit.log.info(`Repository is archived, ignoring`);
    return;
  }

  const owner = repository.owner.login;
  const repo = repository.name;

  // find all workflow files
  const { data: files } = await octokit
    .request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner,
      repo,
      path: ".github/workflows",
    })
    .catch((error) => {
      if (error.status !== 404) throw error;

      // if `.github/workflows` does not exist we treat it an empty directory
      return { data: [] };
    });

  if (!Array.isArray(files)) {
    octokit.log.warn(`.github/workflows is not a directory. Ignoring`);
    return;
  }

  if (files.length === 0) {
    octokit.log.info(`No workflow files to update`);
    return;
  }

  const fileNames = files.map((file) => file.name);
  const ignored = [];
  const filteredFileNames = fileNames.filter((name) => {
    if (isMatch(name, workflow)) return true;
    ignored.push(name);
  });

  if (ignored.length) {
    octokit.log.debug(`Ignored workflows: ${ignored.join(", ")}`);
  }

  for (const name of filteredFileNames) {
    const {
      updated,
      // @ts-ignore - incorrect types returned by `composeCreateOrUpdateTextFile`
      data: { commit },
    } = await composeCreateOrUpdateTextFile(octokit, {
      owner,
      repo,
      path: `.github/workflows/${name}`,
      content({ content }) {
        /** @type {import("./types").Workflow} */
        let config;
        let nodeVersionChanged = false;

        try {
          config = yaml.load(content);
        } catch (error) {
          octokit.log.warn(`Invalid YAML: ${name}`);
          return content;
        }

        if (!config?.jobs) {
          octokit.log.warn(`No jobs in ${name}`);
          return content;
        }

        for (const [jobName, job] of Object.entries(config.jobs)) {
          if (!job.steps) {
            octokit.log.warn(`No steps in ${name} -> ${jobName}`);
            continue;
          }

          for (const step of job.steps) {
            if ("uses" in step && step.uses.startsWith("actions/setup-node")) {
              if (!step.with) step.with = {};

              // `version` is the legacy property that should no longer be used.
              if (step.with.version) {
                delete step.with.version;
                if (!step.with["node-version"]) {
                  step.with.version;
                }
              }

              if (Number(step.with["node-version"]) === nodeVersion) continue;
              if (String(step.with["node-version"]).includes("${{")) continue;

              step.with["node-version"] = nodeVersion;
              nodeVersionChanged = true;
            }
          }
        }

        if (!nodeVersionChanged) return content;

        return yaml.dump(config, {
          quotingType: '"',
        });
      },
      message: `build(${name}): set node-version to ${nodeVersion}`,
    });

    if (updated) {
      octokit.log.info(`${name} updated ${commit.html_url}`);
    }
  }
}
