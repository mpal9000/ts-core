export class UnreachableCaseError extends Error {
  constructor(value: never) {
    const message = `Unreachable case: ${String(value)}`

    super(message)

    this.name = this.constructor.name

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(message).stack
    }
  }
}
