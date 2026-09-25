import { useEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import type { Workspace } from "../lib/types"

export function WorkspaceContextWorktreeAction({ workspaces, children }: { workspaces: { list: { getSnapshot: () => { items: readonly Workspace[] } } }; children: (workspace: Workspace) => ReactNode }) {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  useEffect(() => {
    let selected: Workspace | null = null
    const onContextMenu = (event: MouseEvent) => {
      const element = event.target as HTMLElement | null
      selected = workspaces.list.getSnapshot().items.find(item => element?.closest("button")?.textContent?.includes(item.title) || element?.parentElement?.textContent?.includes(item.title)) ?? null
    }
    const observer = new MutationObserver(() => {
      if (!selected) return
      const anchor = [...document.querySelectorAll<HTMLElement>("[role=menuitem]")].find(item => /在资源管理器中打开|Open in File Explorer/.test(item.textContent ?? ""))
      if (!anchor) return
      const mount = document.createElement("div")
      mount.className = "dswt-workspace-context-action"
      anchor.insertAdjacentElement("afterend", mount)
      setWorkspace(selected); setTarget(mount)
    })
    document.addEventListener("contextmenu", onContextMenu, true)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => { document.removeEventListener("contextmenu", onContextMenu, true); observer.disconnect() }
  }, [workspaces])
  return target && workspace ? createPortal(children(workspace), target) as ReactNode : null
}
