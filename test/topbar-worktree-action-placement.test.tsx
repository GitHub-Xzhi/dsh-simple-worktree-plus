// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, expect, it } from "vitest"
import { TopbarWorktreeActionPlacement } from "../src/client/components/TopbarWorktreeActionPlacement"

afterEach(cleanup)

it("places worktree management directly after the shell workspace picker", async () => {
  render(<><div data-slot="conversation.composer"><button aria-haspopup="menu">Conversation workspace</button></div><div data-testid="topbar"><button aria-haspopup="menu">Workspace</button><TopbarWorktreeActionPlacement><button>Worktree Management</button></TopbarWorktreeActionPlacement></div></>)
  await waitFor(() => expect(screen.getByTestId("topbar").children[1].textContent).toBe("Worktree Management"))
  expect(screen.queryByText("Conversation workspace")?.nextSibling?.textContent).not.toBe("Worktree Management")
})
