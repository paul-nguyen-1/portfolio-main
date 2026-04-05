import { useEffect, useRef } from 'react'

// Single shared observer per page — performance: one IO instead of N
let sharedObserver: IntersectionObserver | null = null
const callbacks = new Map<Element, () => void>()

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target)
            if (cb) {
              cb()
              // Unobserve after reveal — no wasted work
              sharedObserver?.unobserve(entry.target)
              callbacks.delete(entry.target)
            }
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
  }
  return sharedObserver
}

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = getObserver()

    callbacks.set(el, () => {
      el.classList.add('vis')
    })
    observer.observe(el)

    return () => {
      observer.unobserve(el)
      callbacks.delete(el)
    }
  }, [])

  return ref
}
