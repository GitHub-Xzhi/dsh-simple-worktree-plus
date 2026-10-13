import type {} from "@deepseek-ai/dsh-client-ui-slots"

/**
 * DSH 0.2 declares this stable sidebar footer slot. Keep the declaration local
 * so the client bundle can still typecheck against DSH 0.1 development types.
 */
declare module "@deepseek-ai/dsh-client-ui-slots" {
  interface SlotMap {
    "sidebar.footer.action": {
      kind: "list"
      scope: "root"
      owner: { wide: boolean }
    }
  }
}

export {}
