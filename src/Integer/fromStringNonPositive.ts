import { Nothing, NonPositiveInteger, Radix } from '../types/Integer.js'
import { isNothing } from './isNothing.js'
import { isNonPositive } from './isNonPositive.js'
import { FromStringArguments, _fromString } from './fromString.js'

export function fromStringNonPositive(
  radix: Radix,
  value: string,
): NonPositiveInteger | Nothing
export function fromStringNonPositive(
  value: string,
): NonPositiveInteger | Nothing
export function fromStringNonPositive(
  ...args: FromStringArguments
): NonPositiveInteger | Nothing {
  const maybeInteger = _fromString(...args)

  return !isNothing(maybeInteger) && isNonPositive(maybeInteger)
    ? maybeInteger
    : Nothing
}
