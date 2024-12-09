import { consola } from '@likec4/log'
import { hrtime } from 'node:process'
import { inspect } from 'node:util'
import prettyMilliseconds from 'pretty-ms'
import { isCI } from 'std-env'
import k from 'tinyrainbow'
import type { LogErrorOptions, LogOptions } from 'vite'
import { createLogger } from 'vite'

const ERROR = k.bold(k.bgRed(k.white('ERROR')))
const WARN = k.bold(k.yellow('WARN'))
const INFO = k.bold(k.green('INFO'))

export function createLikeC4Logger(prefix: string) {
  const logger = createLogger('info', {
    prefix,
    allowClearScreen: !isCI
  })

  const timestamp = !isCI

  return {
    ...logger,
    info(msg: string, options?: LogOptions) {
      logger.info(`${INFO} ${msg}`, {
        timestamp,
        ...options
      })
    },
    warn(msg: unknown, options?: LogOptions) {
      if (msg instanceof Error) {
        logger.warn(`${WARN} ${k.red(msg.name + ' ' + msg.message)}\n${inspect(msg, { colors: true })}`, {
          timestamp,
          ...options
        })
        return
      }
      logger.warn(`${WARN} ${msg}`, {
        timestamp,
        ...options
      })
    },
    error(err: unknown, options?: LogErrorOptions) {
      if (err instanceof Error) {
        logger.error(`${ERROR} ${k.red(err.name + ' ' + err.message)}\n${inspect(err, { colors: true })}`, {
          timestamp,
          error: err,
          ...options
        })
        return
      }
      logger.error(`${ERROR} ${err}`, {
        timestamp,
        ...options
      })
      return
    }
  }
}
export type ViteLogger = ReturnType<typeof createLikeC4Logger>

export type Logger = {
  info(msg: string): void
  warn(msg: unknown): void
  error(err: unknown): void
}
const noop = () => void 0
export const NoopLogger: Logger = {
  info: noop,
  warn: noop,
  error: noop
}

const NS_PER_MS = 1e6

export function inMillis(start: [number, number]) {
  const [seconds, nanoseconds] = hrtime(start)
  const ms = seconds * 1000 + nanoseconds / NS_PER_MS
  return {
    ms,
    pretty: prettyMilliseconds(ms)
  }
}

export function startTimer(logger?: Logger) {
  const start = hrtime()
  return {
    stopAndLog(msg = 'done in ') {
      msg = k.green(`${msg}${inMillis(start).pretty}`)
      if (logger) {
        logger.info(msg)
      } else {
        consola.success(msg)
      }
    }
  }
}
