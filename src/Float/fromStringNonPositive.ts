import { Nothing, NonPositiveFloat } from '../types/Float.js'
import { isNothing } from './isNothing.js'
import { isNonPositive } from './isNonPositive.js'
import { fromString } from './fromString.js'

export const fromStringNonPositive = (
  value: string,
): NonPositiveFloat | Nothing => {
  const maybeFloat = fromString(value)

  return !isNothing(maybeFloat) && isNonPositive(maybeFloat)
    ? maybeFloat
    : Nothing
}
