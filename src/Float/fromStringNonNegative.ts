import { Nothing, NonNegativeFloat } from '../types/Float.js'
import { isNothing } from './isNothing.js'
import { isNonNegative } from './isNonNegative.js'
import { fromString } from './fromString.js'

export const fromStringNonNegative = (
  value: string,
): NonNegativeFloat | Nothing => {
  const maybeFloat = fromString(value)

  return !isNothing(maybeFloat) && isNonNegative(maybeFloat)
    ? maybeFloat
    : Nothing
}
