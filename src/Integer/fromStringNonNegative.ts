import { Nothing, NonNegativeInteger, Radix } from '../types/Integer.js'
import { isNothing } from './isNothing.js'
import { isNonNegative } from './isNonNegative.js'
import { FromStringArguments, _fromString } from './fromString.js'

export function fromStringNonNegative(
  radix: Radix,
  value: string,
): NonNegativeInteger | Nothing
export function fromStringNonNegative(
  value: string,
): NonNegativeInteger | Nothing
export function fromStringNonNegative(
  ...args: FromStringArguments
): NonNegativeInteger | Nothing {
  const maybeInteger = _fromString(...args)

  return !isNothing(maybeInteger) && isNonNegative(maybeInteger)
    ? maybeInteger
    : Nothing
}
