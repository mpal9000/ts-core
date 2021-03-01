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

export function trunc(value: NothingF): NothingI
export function trunc(
  value: NonPositiveFloat | NothingF,
): NonPositiveInteger | NothingI
export function trunc(
  value: NonNegativeFloat | NothingF,
): NonNegativeInteger | NothingI
export function trunc(value: Float | NothingF): Integer | NothingI
export function trunc(value: Float | NothingF): Integer | NothingI {
  if (isNothing(value)) return NothingI

  const result = Math.trunc(value)

  return isInteger(result) ? result : NothingI
}
