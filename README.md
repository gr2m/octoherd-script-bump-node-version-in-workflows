# octoherd-script-bump-node-version-in-workflows

> Octoherd script to set the node-version input for actions/setup-node to the latest LTS major version

[![@latest](https://img.shields.io/npm/v/octoherd-script-bump-node-version-in-workflows.svg)](https://www.npmjs.com/package/octoherd-script-bump-node-version-in-workflows)
[![Build Status](https://github.com/gr2m/octoherd-script-bump-node-version-in-workflows/workflows/Test/badge.svg)](https://github.com/gr2m/octoherd-script-bump-node-version-in-workflows/actions?query=workflow%3ATest+branch%3Amain)

## Usage

Minimal usage

```js
npx octoherd-script-bump-node-version-in-workflows
```

Pass all options as CLI flags to avoid user prompts

```js
npx octoherd-script-bump-node-version-in-workflows \
  -T ghp_0123456789abcdefghjklmnopqrstuvwxyzA \
  -R "gr2m/*" \
  --version 16 \
  --workflow release.yml
```

## Options

| option                       | type             | description                                                                                                                                                                                                                                 |
| ---------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--version`                  | number           | Defaults to latest Node LTS major version                                                                                                                                                                                                   |
| `--workflow`                 | string           | workflow file name or pattern to only update a subset of workflows. Defaults to "'\*'"                                                                                                                                                      |
| `--octoherd-token`, `-T`     | string           | A personal access token ([create](https://github.com/settings/tokens/new?scopes=repo)). Script will create one if option is not set                                                                                                         |
| `--octoherd-repos`, `-R`     | array of strings | One or multiple space-separated repositories in the form of `repo-owner/repo-name`. `repo-owner/*` will find all repositories for one owner. `*` will find all repositories the user has access to. Will prompt for repositories if not set |
| `--octoherd-bypass-confirms` | boolean          | Bypass prompts to confirm mutating requests                                                                                                                                                                                                 |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## About Octoherd

[@octoherd](https://github.com/octoherd/) is project to help you keep your GitHub repositories in line.

## License

[ISC](LICENSE.md)
