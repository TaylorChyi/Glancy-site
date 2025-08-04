import { useState, useRef, useEffect } from 'react'

export default function useOutsideToggle(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen)
  const ref = useRef(null)

  useEffect(() => {
    function handleStart(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
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

  return { open, setOpen, ref }
}
