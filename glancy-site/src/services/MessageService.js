class MessageService {
  constructor() {
    this.current = ''
    this.listeners = new Set()
  }

  getSnapshot = () => this.current

  subscribe = (callback) => {
    this.listeners.add(callback)
    return () => this.listeners.delete(callback)
  }

  show = (msg) => {
    this.current = msg
    this._emit()
  }

  clear = () => {
    this.current = ''
    this._emit()
  }

  _emit = () => {
    for (const cb of this.listeners) {
      cb()
    }
  }
}

export function createMessageService() {
  return new MessageService()
}
