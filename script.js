// @ts-check

/**
 * Octoherd script to set the node-version input for actions/setup-node to the latest LTS major version
 *
 * @param {import('@octoherd/cli').Octokit} octokit
 * @param {import('@octoherd/cli').Repository} repository
 * @param {object} options
 * @param {number} [options.version] Defaults to latest Node LTS major version
 * @param {string} [options.workflow] workflow file name or pattern to only update a subset of workflows
 */
export async function script(octokit, repository, { version, workflow }) {}
