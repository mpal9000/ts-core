import { JsonifiedInput, Jsonified } from '../types/Json/index.js'

export type JsonStringIndentation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type JsonStringifyOptions = {
  readonly indentation?: string | JsonStringIndentation
}

export function stringify<Value extends JsonifiedInput = never>(
  options: JsonStringifyOptions,
  value: Jsonified<Value>,
): string
export function stringify<Value extends JsonifiedInput = never>(
  value: Jsonified<Value>,
): string
export function stringify<Value extends JsonifiedInput>(
  ...args:
    | readonly [options: JsonStringifyOptions, value: Jsonified<Value>]
    | readonly [value: Jsonified<Value>]
): string {
  const [options, value] =
    args.length === 2 ? [args[0], args[1]] : [{}, args[0]]
  const { indentation = 0 } = options

  return JSON.stringify(value, null, indentation)
}
