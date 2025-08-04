import { createContext, useContext, useMemo } from 'react'
import { useSyncExternalStore } from 'react'
import MessagePopup from '../components/MessagePopup.jsx'
import { createMessageService } from '../services/MessageService.js'

const MessageContext = createContext(createMessageService())

export function MessageProvider({ service = createMessageService(), children }) {
  const store = useMemo(() => service, [service])
  const message = useSyncExternalStore(store.subscribe, store.getSnapshot)
  const handleClose = () => store.clear()

  return (
    <MessageContext.Provider value={store}>
      {children}
      <MessagePopup open={!!message} message={message} onClose={handleClose} />
    </MessageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMessageService = () => useContext(MessageContext)
