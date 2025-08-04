const LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

class ConsoleTransport {
  log(level, message, meta) {
    const args = [`[${level.toUpperCase()}]`, message]
    if (meta) args.push(meta)
    switch (level) {
      case 'error':
        console.error(...args)
        break
      case 'warn':
        console.warn(...args)
        break
      case 'info':
        console.info(...args)
        break
      default:
        console.debug(...args)
    }
  }
}

export class Logger {
  constructor({ level = 'info', transports = [new ConsoleTransport()] } = {}) {
    this.level = level
    this.transports = transports
  }

  log(level, message, meta) {
    if (LEVELS[level] < LEVELS[this.level]) return
    this.transports.forEach((t) => t.log(level, message, meta))
  }

  debug(message, meta) {
    this.log('debug', message, meta)
  }
  info(message, meta) {
    this.log('info', message, meta)
  }
  warn(message, meta) {
    this.log('warn', message, meta)
  }
  error(message, meta) {
    this.log('error', message, meta)
  }
}

function detectEnv() {
  if (typeof import.meta !== 'undefined' && import.meta.env?.MODE) {
    return import.meta.env.MODE
  }
  if (globalThis?.process?.env?.NODE_ENV) {
    return globalThis.process.env.NODE_ENV
  }
  return 'development'
}

const env = detectEnv()
const defaultLevel = env === 'development' ? 'debug' : 'info'

export const logger = new Logger({ level: defaultLevel })

export default logger
