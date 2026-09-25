import { useEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import type { Workspace } from "../lib/types"

/**
 * Wait only for the next context-menu render and disconnect before mounting.
 * Observing the whole document while our portal mutates it caused a feedback
 * loop in DSH's menu renderer.
 */
export function WorkspaceContextWorktreeAction({ workspaces, children }: { workspaces: { list: { getSnapshot: () => { items: readonly Workspace[] } } }; children: (workspace: Workspace) => ReactNode }) {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  useEffect(() => {
    let observer: MutationObserver | undefined
    let mount: HTMLElement | undefined
    const clear = () => { observer?.disconnect(); observer = undefined; mount?.remove(); mount = undefined; setTarget(null); setWorkspace(null) }
    const onContextMenu = (event: MouseEvent) => {
      clear()
      const element = event.target as HTMLElement | null
      const selected = workspaces.list.getSnapshot().items.find(item => element?.closest("button")?.textContent?.includes(item.title) || element?.parentElement?.textContent?.includes(item.title))
      if (!selected) return
      observer = new MutationObserver(() => {
        const anchor = [...document.querySelectorAll<HTMLElement>("[role=menuitem]")].find(item => /在资源管理器中打开|Open in File Explorer/.test(item.textContent ?? ""))
        if (!anchor || mount) return
        observer?.disconnect()
        mount = document.createElement("div")
        mount.className = "dswt-workspace-context-action"
        anchor.insertAdjacentElement("afterend", mount)
        setWorkspace(selected); setTarget(mount)
      })
      observer.observe(document.body, { childList: true, subtree: true })
    }
    document.addEventListener("contextmenu", onContextMenu, true)
    return () => { document.removeEventListener("contextmenu", onContextMenu, true); clear() }
  }, [workspaces])
  return target && workspace ? createPortal(children(workspace), target) as ReactNode : null
}
