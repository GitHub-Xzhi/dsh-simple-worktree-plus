// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { afterEach, expect, it } from "vitest"
import { WorkspaceContextWorktreeAction } from "../src/client/components/WorkspaceContextWorktreeAction"

afterEach(cleanup)

it("mounts one scoped action after the context menu without recursive observers", async () => {
  const workspaces = { list: { getSnapshot: () => ({ items: [{ workspaceId: "alpha", title: "Alpha", path: "/alpha" }] }) } }
  render(<><button>Alpha</button><WorkspaceContextWorktreeAction workspaces={workspaces as any}>{workspace => <button>Manage {workspace.title}</button>}</WorkspaceContextWorktreeAction></>)
  fireEvent.contextMenu(screen.getByRole("button", { name: "Alpha" }))
  const menu = document.createElement("div"); menu.setAttribute("role", "menu")
  const anchor = document.createElement("button"); anchor.setAttribute("role", "menuitem"); anchor.textContent = "在资源管理器中打开"; menu.append(anchor); document.body.append(menu)
  await waitFor(() => expect(screen.getAllByRole("button", { name: "Manage Alpha" })).toHaveLength(1))
  expect(menu.querySelectorAll(".dswt-workspace-context-action")).toHaveLength(1)
})
