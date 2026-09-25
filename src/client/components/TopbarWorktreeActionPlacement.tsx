import { useLayoutEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

/** Mount beside the shell workspace picker without relying on generated CSS. */
export function TopbarWorktreeActionPlacement({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  useLayoutEffect(() => {
    const mount = document.createElement("span")
    mount.className = "dswt-topbar-action"
    const sync = () => {
      const pickers = [...document.querySelectorAll<HTMLElement>('button[aria-haspopup="menu"]')]
      const picker = pickers.find(button => !button.closest('[data-slot="conversation.composer"]'))
      if (!picker) { mount.remove(); setTarget(null); return }
      if (mount.parentElement !== picker.parentElement || mount.previousSibling !== picker) picker.insertAdjacentElement("afterend", mount)
      setTarget(previous => previous === mount ? previous : mount)
    }
    const observer = new MutationObserver(sync)
    observer.observe(document.body, { childList: true, subtree: true })
    sync()
    return () => { observer.disconnect(); mount.remove() }
  }, [])
  return target ? createPortal(children, target) as ReactNode : null
}
