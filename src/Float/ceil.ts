import {
  Nothing as NothingI,
  NonPositiveInteger,
  NonNegativeInteger,
  PositiveInteger,
  Integer,
} from '../types/Integer.js'
import {
  Nothing as NothingF,
  NonPositiveFloat,
  NonNegativeFloat,
  PositiveFloat,
  Float,
} from '../types/Float.js'
import { isInteger } from '../Integer/isInteger.js'
import { isNothing } from './isNothing.js'

export function ceil(value: NothingF): NothingI
export function ceil(
  value: PositiveFloat | NothingF,
): PositiveInteger | NothingI
export function ceil(
  value: NonPositiveFloat | NothingF,
): NonPositiveInteger | NothingI
export function ceil(
  value: NonNegativeFloat | NothingF,
): NonNegativeInteger | NothingI
export function ceil(value: Float | NothingF): Integer | NothingI
export function ceil(value: Float | NothingF): Integer | NothingI {
  if (isNothing(value)) return NothingI

  const result = Math.ceil(value)

  return isInteger(result) ? result : NothingI
}
