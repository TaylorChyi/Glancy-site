import { useState, useRef, useEffect, useCallback } from 'react'

export default function useOutsideToggle(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen)
  const ref = useRef(null)

  const logSetOpen = useCallback((next) => {
    console.log('useOutsideToggle:setOpen', next)
    setOpen(next)
  }, [])

  useEffect(() => {
    console.log('useOutsideToggle: open changed', open)

    function handleStart(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log('useOutsideToggle: outside interaction', e.target)
        setOpen(false)
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        console.log('useOutsideToggle: escape pressed')
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleStart)
      document.addEventListener('touchstart', handleStart)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleStart)
      document.removeEventListener('touchstart', handleStart)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return { open, setOpen: logSetOpen, ref }
}
