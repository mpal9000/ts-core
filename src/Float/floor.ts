import {
  Nothing as NothingI,
  NegativeInteger,
  NonPositiveInteger,
  NonNegativeInteger,
  Integer,
} from '../types/Integer.js'
import {
  Nothing as NothingF,
  NegativeFloat,
  NonPositiveFloat,
  NonNegativeFloat,
  Float,
} from '../types/Float.js'
import { isInteger } from '../Integer/isInteger.js'
import { isNothing } from './isNothing.js'

export function floor(value: NothingF): NothingI
export function floor(
  value: NegativeFloat | NothingF,
): NegativeInteger | NothingI
export function floor(
  value: NonPositiveFloat | NothingF,
): NonPositiveInteger | NothingI
export function floor(
  value: NonNegativeFloat | NothingF,
): NonNegativeInteger | NothingI
export function floor(value: Float | NothingF): Integer | NothingI
export function floor(value: Float | NothingF): Integer | NothingI {
  if (isNothing(value)) return NothingI

  const result = Math.floor(value)

  return isInteger(result) ? result : NothingI
}
