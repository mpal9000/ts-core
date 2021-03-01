import { Nothing, Float } from '../types/Float.js'
import { isFloat } from './isFloat.js'

export const fromString = (value: string): Float | Nothing => {
  const maybeFloat = Number.parseFloat(value)

  return isFloat(maybeFloat) ? maybeFloat : Nothing
}
