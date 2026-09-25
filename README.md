# DSH Simple Worktree Plus

`@xzhi/dsh-simple-worktree-plus` is a Git Worktree management plugin for [DeepSeek Harness](https://github.com/deepseek-ai/DeepSeek-Harness).

This project continues the open-source work of [alpacachen/dsh-worktree](https://github.com/alpacachen/dsh-worktree). Thank you to the original project for the Worktree creation, Workspace registration, and isolated-session foundation.

The Plus edition extends deletion policies, management entry points, and per-Workspace management for easier multi-branch task work and cleanup.

## Install

```sh
dsh plugin --profile web add @xzhi/dsh-simple-worktree-plus
```

Restart `dsh web` and refresh the page after installation or upgrade.

## Usage

- Create a Worktree from a new session in a Git Workspace.
- Use **Worktree Management** in the sidebar to view Worktrees across all Workspaces.
- Right-click a Workspace and select **Worktree Management** to scan only that Workspace.
- When deleting a Worktree, use the confirmation options to delete its Git branch as well.

## Plus features

| Feature | Description |
| --- | --- |
| Branch handling on deletion | Optionally delete the corresponding Git branch when deleting a Worktree. |
| Delete branch by default | **Also delete the Git branch** is enabled by default. |
| Force-delete unmerged branches | Use `git branch -D` for unmerged branches; enabled by default and should be used carefully. |
| Top-bar entry | Opens Worktree Management beside the top Workspace picker. |
| Sidebar entry | Opens Worktree Management immediately above **Settings** in the sidebar. |
| Scoped Workspace management | Right-click a Workspace to open Worktree Management scoped to that Workspace only. |
| Deletion default preferences | Configure the default checkbox states used the next time a deletion dialog opens. |
| Independent plugin identity | Uses the `@xzhi/dsh-simple-worktree-plus` package and DSH plugin identity. |

## Warning

Force-deleting an unmerged Git branch permanently removes commits that are only on that local branch. Push, merge, or otherwise back up important work before deleting it.
