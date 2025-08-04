import { useState, useRef, useEffect, useCallback } from 'react'

export default function useOutsideToggle(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen)
  const ref = useRef(null)

  const updateOpen = useCallback((next) => {
    setOpen(prev => (typeof next === 'function' ? next(prev) : next))
  }, [])

  const toggle = useCallback(() => {
    updateOpen(prev => !prev)
  }, [updateOpen])

  useEffect(() => {
    function handlePointerDown(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        updateOpen(false)
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        updateOpen(false)
      }
    }

    if (open) {
      document.addEventListener('pointerdown', handlePointerDown)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, updateOpen])

  return { open, setOpen: updateOpen, toggle, ref }
}
