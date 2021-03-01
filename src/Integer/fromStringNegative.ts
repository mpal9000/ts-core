import { Nothing, NegativeInteger, Radix } from '../types/Integer.js'
import { isNothing } from './isNothing.js'
import { isNegative } from './isNegative.js'
import { FromStringArguments, _fromString } from './fromString.js'

export function fromStringNegative(
  radix: Radix,
  value: string,
): NegativeInteger | Nothing
export function fromStringNegative(value: string): NegativeInteger | Nothing
export function fromStringNegative(
  ...args: FromStringArguments
): NegativeInteger | Nothing {
  const maybeInteger = _fromString(...args)

  return !isNothing(maybeInteger) && isNegative(maybeInteger)
    ? maybeInteger
    : Nothing
}
