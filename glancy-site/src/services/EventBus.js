class EventBus {
  constructor(listeners = new Map()) {
    this.listeners = listeners
  }

  on = (event, callback) => {
    let handlers = this.listeners.get(event)
    if (!handlers) {
      handlers = new Set()
      this.listeners.set(event, handlers)
    }
    handlers.add(callback)
    return () => handlers.delete(callback)
  }

  emit = (event, payload) => {
    const handlers = this.listeners.get(event)
    if (!handlers) return
    for (const cb of handlers) cb(payload)
  }
}

class CompositeEventBus {
  constructor(buses = []) {
    this.buses = buses
  }

  on = (event, callback) => {
    const unsubs = this.buses.map((bus) => bus.on(event, callback))
    return () => unsubs.forEach((unsub) => unsub())
  }

  emit = (event, payload) => {
    for (const bus of this.buses) bus.emit(event, payload)
  }
}

export function createEventBus({ buses = [] } = {}) {
  return buses.length ? new CompositeEventBus(buses) : new EventBus()
}

export { EventBus, CompositeEventBus }

