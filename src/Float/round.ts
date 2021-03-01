import {
  Nothing as NothingI,
  NonPositiveInteger,
  NonNegativeInteger,
  Integer,
} from '../types/Integer.js'
import {
  Nothing as NothingF,
  NonPositiveFloat,
  NonNegativeFloat,
  Float,
} from '../types/Float.js'
import { isInteger } from '../Integer/isInteger.js'
import { isNothing } from './isNothing.js'

export function round(value: NothingF): NothingI
export function round(
  value: NonPositiveFloat | NothingF,
): NonPositiveInteger | NothingI
export function round(
  value: NonNegativeFloat | NothingF,
): NonNegativeInteger | NothingI
export function round(value: Float | NothingF): Integer | NothingI
export function round(value: Float | NothingF): Integer | NothingI {
  if (isNothing(value)) return NothingI

  const result = Math.round(Math.abs(value)) * Math.sign(value)

  return isInteger(result) ? result : NothingI
}
