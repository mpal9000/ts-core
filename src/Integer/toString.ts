import { Integer, Radix } from '../types/Integer.js'

const DEFAULT_RADIX = 10

export function toString(radix: Radix, value: Integer): string
export function toString(value: Integer): string
export function toString(
  ...args: readonly [radix: Radix, value: Integer] | readonly [value: Integer]
): string {
  const [radix, value]: readonly [Radix, Integer] =
    args.length === 2 ? [args[0], args[1]] : [DEFAULT_RADIX, args[0]]

  return value.toString(radix)
}
