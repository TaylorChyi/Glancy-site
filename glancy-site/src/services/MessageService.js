import { createEventBus } from './EventBus.js'

class MessageService {
  constructor(bus = createEventBus()) {
    this.current = ''
    this.bus = bus
  }

  getSnapshot = () => this.current

  subscribe = (callback) => this.bus.on('message', () => callback())

  show = (msg) => {
    this.current = msg
    this.bus.emit('message', this.current)
  }

  clear = () => {
    this.current = ''
    this.bus.emit('message', this.current)
  }
}

export function createMessageService({ bus } = {}) {
  return new MessageService(bus)
}
