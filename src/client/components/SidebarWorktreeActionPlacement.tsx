import { useLayoutEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

/** Place management immediately before the localized Settings sidebar action. */
export function SidebarWorktreeActionPlacement({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  useLayoutEffect(() => {
    const mount = document.createElement("span")
    mount.className = "dswt-sidebar-action"
    const sync = () => {
      const settings = [...document.querySelectorAll<HTMLButtonElement>("button")].find(button => ["设置", "Settings"].includes(button.textContent?.trim() ?? ""))
      if (!settings) { mount.remove(); setTarget(null); return }
      if (mount.parentElement !== settings.parentElement || mount.nextSibling !== settings) settings.insertAdjacentElement("beforebegin", mount)
      setTarget(previous => previous === mount ? previous : mount)
    }
    const observer = new MutationObserver(sync)
    observer.observe(document.body, { childList: true, subtree: true })
    sync()
    return () => { observer.disconnect(); mount.remove() }
  }, [])
  return target ? createPortal(children, target) as ReactNode : null
}
