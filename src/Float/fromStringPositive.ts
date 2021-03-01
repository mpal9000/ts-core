import { Nothing, PositiveFloat } from '../types/Float.js'
import { isNothing } from './isNothing.js'
import { isPositive } from './isPositive.js'
import { fromString } from './fromString.js'

export const fromStringPositive = (value: string): PositiveFloat | Nothing => {
  const maybeFloat = fromString(value)

  return !isNothing(maybeFloat) && isPositive(maybeFloat) ? maybeFloat : Nothing
}
