import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it, vi } from "vitest"
import { WorktreePlugin } from "../src/client/plugin"

describe("WorktreePlugin compatibility", () => {
  it("uses the opaque DSH modal layer rather than the translucent menu material", () => {
    const styles = readFileSync(resolve(process.cwd(), "src/client/styles.css"), "utf8")
    expect(styles).toContain("background: var(--dsw-alias-bg-layer-2, var(--dsw-specific-menu))")
    expect(styles).toContain("box-shadow: var(--dsw-elevation-prominent, var(--dsw-shadow-lv3))")
  })

  it("loads against the DSH 0.1.5 client contract", () => {
    const registeredSlots: string[] = []
    const workspaces = {
      list: {
        getSnapshot: () => ({ items: [] }),
        subscribe: () => () => {},
      },
    }
    const ctx = {
      connection: { rpc: { call: vi.fn() } },
      workspaces,
      sessions: {},
      effect: (effect: () => unknown) => effect(),
      slots: {
        inject: (name: string) => registeredSlots.push(name),
      },
    }

    expect(() => WorktreePlugin.apply(ctx as any)).not.toThrow()
    expect(registeredSlots).toEqual(["conversation.input.dock", "shell.overlay", "sidebar.footer.action", "settings.section"])
    expect(WorktreePlugin.inject).toEqual(["slots", "connection", "locale", "workspaces", "sessions"])
  })
})
