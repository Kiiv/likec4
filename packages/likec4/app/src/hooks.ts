import { useIsomorphicLayoutEffect } from '@react-hookz/web'
import { useLikeC4Model } from 'virtual:likec4/model'

// To get the transparent background
// We need to add a class to the HTML element
export function useTransparentBackground(enabled = true) {
  useIsomorphicLayoutEffect(() => {
    const htmlEl = document.body.parentElement
    if (!htmlEl || enabled !== true) return
    // see ../../likec4.css
    const classname = 'transparent-bg'
    htmlEl.classList.add(classname)
    return () => {
      htmlEl.classList.remove(classname)
    }
  }, [enabled])
}

export function useLikeC4DiagramView(viewId: string) {
  return useLikeC4Model().findView(viewId)?.$view ?? null
}
