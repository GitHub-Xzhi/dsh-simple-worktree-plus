import { useEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import type { Workspace } from "../lib/types"

/** Add one scoped action to the next workspace context menu. */
export function WorkspaceContextWorktreeAction({ workspaces, children }: { workspaces: { list: { getSnapshot: () => { items: readonly Workspace[] } } }; children: (workspace: Workspace) => ReactNode }) {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  useEffect(() => {
    let observer: MutationObserver | undefined
    let mount: HTMLElement | undefined
    let selected: Workspace | undefined
    const clear = () => { observer?.disconnect(); observer = undefined; mount?.remove(); mount = undefined; setTarget(null); setWorkspace(null) }
    const attach = () => {
      if (!selected || mount) return
      const menus = [...document.querySelectorAll<HTMLElement>("[role=menu]")]
      const menu = menus.at(-1)
      const anchor = menu?.querySelector<HTMLElement>("[role=menuitem]")
      if (!menu || !anchor) return
      observer?.disconnect()
      mount = document.createElement("div")
      mount.className = "dswt-workspace-context-action"
      menu.append(mount)
      setWorkspace(selected); setTarget(mount)
    }
    const onContextMenu = (event: MouseEvent) => {
      clear()
      const element = event.target as HTMLElement | null
      selected = workspaces.list.getSnapshot().items.find(item => element?.closest("button")?.textContent?.includes(item.title) || element?.parentElement?.textContent?.includes(item.title))
      if (!selected) return
      observer = new MutationObserver(attach)
      observer.observe(document.body, { childList: true, subtree: true })
      queueMicrotask(attach)
    }
    document.addEventListener("contextmenu", onContextMenu, true)
    return () => { document.removeEventListener("contextmenu", onContextMenu, true); clear() }
  }, [workspaces])
  return target && workspace ? createPortal(children(workspace), target) as ReactNode : null
}
