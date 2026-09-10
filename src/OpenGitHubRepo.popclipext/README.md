# Open GitHub Repo

Open GitHub repositories and scoped npm packages directly from selected text,
even when the reference appears inside a longer sentence or Markdown link.

## Usage

Select text containing one of the supported references and choose the generated
action:

| Selected text contains | Available action | Opens |
| --- | --- | --- |
| `octocat/Hello-World` | GitHub | `github.com/octocat/Hello-World` |
| `https://github.com/replit/codemirror-vim` | GitHub | The repository root |
| `[repo](https://github.com/replit/codemirror-vim)` | GitHub | The repository root |
| `@replit/codemirror-vim` | GitHub and npm | The matching GitHub path or npm package page |
| `@replit/codemirror-vim 6.4.0` | GitHub and npm | The matching GitHub path or npm version page |

Full GitHub URLs take precedence over plain `AUTHOR/REPO` references. Any path
after the repository name, such as `/issues/1`, and a trailing `.git` suffix are
ignored.

You can optionally configure your GitHub username to add an **Open My Repo**
action for the matched repository name. The setting uses PopClip's compact inset
layout.

The extension only constructs and opens GitHub and npmjs.com URLs. It does not
call either service's API or transmit the rest of the selected text.

## Changelog

### 1.7 — 2026-09-10

- Accept `AUTHOR/REPO` references anywhere in selected text.
- Correctly extract repository roots from full GitHub URLs and Markdown links.
- Add an npm action for scoped packages with an optional version.
- Display the GitHub username setting in inset mode.

### 1.6 — 2026-08-25

- Clarify the accepted input format and generated actions.
- Submit the initial directory release.
