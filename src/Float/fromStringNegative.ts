import { Nothing, NegativeFloat } from '../types/Float.js'
import { isNothing } from './isNothing.js'
import { isNegative } from './isNegative.js'
import { fromString } from './fromString.js'

export const fromStringNegative = (value: string): NegativeFloat | Nothing => {
  const maybeFloat = fromString(value)

  return !isNothing(maybeFloat) && isNegative(maybeFloat) ? maybeFloat : Nothing
}
