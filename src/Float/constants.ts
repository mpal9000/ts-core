import { NegativeFloat, PositiveFloat } from '../types/Float.js'

// type-coverage:ignore-next-line
export const MINIMUM = -Number.MAX_VALUE as NegativeFloat
// type-coverage:ignore-next-line
export const MAXIMUM = Number.MAX_VALUE as PositiveFloat
// type-coverage:ignore-next-line
export const SMALLEST = Number.MIN_VALUE as PositiveFloat
// type-coverage:ignore-next-line
export const EPSILON = Number.EPSILON as PositiveFloat
