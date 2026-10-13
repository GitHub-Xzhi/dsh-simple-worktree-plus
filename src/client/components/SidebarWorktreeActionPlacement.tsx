import { useLayoutEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

/** Marks the stable sidebar slot action available in DSH 0.2 and newer. */
export const NATIVE_SIDEBAR_ACTION_ATTRIBUTE = "data-dswt-native-sidebar-action"

/**
 * Legacy fallback for DSH 0.1. The 0.2 sidebar owns a footer-action slot, so
 * suppress this DOM placement as soon as that native action has mounted.
 */
export function SidebarWorktreeActionPlacement({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  useLayoutEffect(() => {
    const mount = document.createElement("span")
    mount.className = "dswt-sidebar-action"
    const sync = () => {
      if (document.querySelector(`[${NATIVE_SIDEBAR_ACTION_ATTRIBUTE}]`)) {
        mount.remove()
        setTarget(null)
        return
      }
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
