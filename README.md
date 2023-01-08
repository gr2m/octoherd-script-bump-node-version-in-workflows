# octoherd-script-bump-node-version-in-workflows

> Octoherd script to set the node-version input for actions/setup-node to the latest LTS major version

[![@latest](https://img.shields.io/npm/v/octoherd-script-bump-node-version-in-workflows.svg)](https://www.npmjs.com/package/octoherd-script-bump-node-version-in-workflows)
[![Build Status](https://github.com/gr2m/octoherd-script-bump-node-version-in-workflows/workflows/Test/badge.svg)](https://github.com/gr2m/octoherd-script-bump-node-version-in-workflows/actions?query=workflow%3ATest+branch%3Amain)

## Usage

Note: You **must** set a custom token for this script because it requires the `workflow` scope. [Create a token here](https://github.com/settings/tokens/new?scopes=workflow,repo&description=octoherd-script-bump-node-version-in-workflows)

Minimal usage

```js
npx octoherd-script-bump-node-version-in-workflows -T ghp_0123456789abcdefghjklmnopqrstuvwxyzA
```

Pass all options as CLI flags to avoid user prompts

```js
npx octoherd-script-bump-node-version-in-workflows@latest \
  -T ghp_0123456789abcdefghjklmnopqrstuvwxyzA \
  -R "gr2m/*" \
  --node-version 16 \
  --workflow release.yml
```

The script uses [`js-yaml`](https://github.com/nodeca/js-yaml), so the updated YAML code might also include **formatting changes**. Unfortunately the parsing and then serializing using `js-yaml` **removes all comments**. But the script will only update a file if a node-version was actually changed.

If `node-version` is set to a value which includes a `${{ ... }}` placeholder then it's not updated.

I run the script against all [@octokit repositories](https://github.com/orgs/octokit/repositories) so I'm fairly confident it doesn't break anything.

## Options

| option                       | type             | description                                                                                                                                                                                                                                 |
| ---------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--node-version`             | number           | **Required** May be set to `lts/*`. See [all supported versions](https://github.com/actions/setup-node#supported-version-syntax)                                                                                                            |
| `--workflow`                 | string           | workflow file name or pattern to only update a subset of workflows. [matcher](https://github.com/sindresorhus/matcher#usage) is used for matching. Defaults to `*`                                                                          |
| `--octoherd-token`, `-T`     | string           | A personal access token ([create](https://github.com/settings/tokens/new?scopes=repo)). Script will create one if option is not set                                                                                                         |
| `--octoherd-repos`, `-R`     | array of strings | One or multiple space-separated repositories in the form of `repo-owner/repo-name`. `repo-owner/*` will find all repositories for one owner. `*` will find all repositories the user has access to. Will prompt for repositories if not set |
| `--octoherd-bypass-confirms` | boolean          | Bypass prompts to confirm mutating requests                                                                                                                                                                                                 |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## About Octoherd

[@octoherd](https://github.com/octoherd/) is project to help you keep your GitHub repositories in line.

## License

[ISC](LICENSE.md)
