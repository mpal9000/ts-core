import { Nothing, PositiveInteger, Radix } from '../types/Integer.js'
import { isNothing } from './isNothing.js'
import { isPositive } from './isPositive.js'
import { FromStringArguments, _fromString } from './fromString.js'

export function fromStringPositive(
  radix: Radix,
  value: string,
): PositiveInteger | Nothing
export function fromStringPositive(value: string): PositiveInteger | Nothing
export function fromStringPositive(
  ...args: FromStringArguments
): PositiveInteger | Nothing {
  const maybeInteger = _fromString(...args)

  return !isNothing(maybeInteger) && isPositive(maybeInteger)
    ? maybeInteger
    : Nothing
}
