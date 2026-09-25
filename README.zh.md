# DSH Simple Worktree Plus

`@xzhi/dsh-simple-worktree-plus` 是一个用于 [DeepSeek Harness](https://github.com/deepseek-ai/DeepSeek-Harness) 的 Git Worktree 管理插件。

本项目基于 [alpacachen/dsh-worktree](https://github.com/alpacachen/dsh-worktree) 的开源实现继续开发，感谢原项目提供的 Worktree 创建、Workspace 注册与隔离会话能力。

在此基础上，Plus 版本扩展了 Worktree 的删除策略、管理入口与按工作区管理能力，使日常多分支任务切换和清理更加直接。

## 安装

```sh
dsh plugin --profile web add @xzhi/dsh-simple-worktree-plus
```

安装或升级后重启 `dsh web`，再刷新页面。

## 使用

- 在 Git Workspace 的新建会话中创建 Worktree；
- 通过侧边栏 **Worktree 管理** 查看全部 Workspace 的 Worktree；
- 右键指定 Workspace，选择 **Worktree 管理**，只扫描该 Workspace；
- 删除 Worktree 时根据确认弹窗中的选项，一并删除对应 Git 分支。

## Plus 新增功能

| 功能 | 说明 |
| --- | --- |
| 删除时管理分支 | 删除 Worktree 时可同时删除对应 Git 分支。 |
| 默认删除分支 | “同时删除 Git 分支”默认勾选。 |
| 强制删除未合并分支 | 可使用 `git branch -D` 删除未合并分支；默认勾选，请谨慎使用。 |
| 顶部管理入口 | 在顶部 Workspace 选择器旁提供 Worktree 管理入口。 |
| 侧边栏管理入口 | 在左侧边栏 **设置** 上方提供 Worktree 管理入口。 |
| 指定 Workspace 管理 | 右键某个 Workspace 后打开仅针对该 Workspace 的 Worktree 管理。 |
| 删除选项默认值 | 可在 Worktree 管理中设置下次打开删除确认弹窗时的默认勾选状态。 |
| 插件独立命名 | 包名和 DSH 插件标识调整为 `@xzhi/dsh-simple-worktree-plus`，可与原插件区分安装。 |

## 风险提示

启用“强制删除未合并的 Git 分支”会永久移除该本地分支中未合并的提交。删除前请确认重要提交已经推送、合并或另有备份。
