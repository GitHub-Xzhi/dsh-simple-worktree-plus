// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, expect, it } from "vitest"
import { SidebarWorktreeActionPlacement } from "../src/client/components/SidebarWorktreeActionPlacement"

afterEach(cleanup)

it("places worktree management immediately above Settings", async () => {
  render(<div data-testid="sidebar"><button>Workspace</button><SidebarWorktreeActionPlacement><button>Worktree 管理</button></SidebarWorktreeActionPlacement><button>设置</button></div>)
  await waitFor(() => expect(screen.getByTestId("sidebar").children[1].textContent).toBe("Worktree 管理"))
  expect(screen.getByTestId("sidebar").children[2].textContent).toBe("设置")
})

it("defers to the native DSH 0.2 footer action when available", async () => {
  render(<div data-testid="sidebar"><button data-dswt-native-sidebar-action="">Worktree 管理</button><SidebarWorktreeActionPlacement><button>旧版入口</button></SidebarWorktreeActionPlacement><button>设置</button></div>)
  await waitFor(() => expect(screen.queryByText("旧版入口")).toBeNull())
  expect(screen.getByTestId("sidebar").children).toHaveLength(2)
})

