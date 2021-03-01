import { Nothing, Integer, Radix } from '../types/Integer.js'
import { isInteger } from './isInteger.js'

export type FromStringArguments =
  | readonly [radix: Radix, value: string]
  | readonly [value: string]

const DEFAULT_RADIX = 10

export const _fromString = (
  ...args: FromStringArguments
): Integer | Nothing => {
  const [radix, value]: readonly [Radix, string] =
    args.length === 2 ? [args[0], args[1]] : [DEFAULT_RADIX, args[0]]

  const maybeInteger = Number.parseInt(value, radix)

  return isInteger(maybeInteger) ? maybeInteger : Nothing
}

export function fromString(radix: Radix, value: string): Integer | Nothing
export function fromString(value: string): Integer | Nothing
export function fromString(...args: FromStringArguments): Integer | Nothing {
  return _fromString(...args)
}
