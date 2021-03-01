import { Float, Radix } from '../types/Float.js'

const DEFAULT_RADIX = 10

export function toString(radix: Radix, value: Float): string
export function toString(value: Float): string
export function toString(
  ...args: readonly [radix: Radix, value: Float] | readonly [value: Float]
): string {
  const [radix, value]: readonly [Radix, Float] =
    args.length === 2 ? [args[0], args[1]] : [DEFAULT_RADIX, args[0]]

  return value.toString(radix)
}
