import {
  NegativeFloat,
  NonPositiveFloat,
  NonNegativeFloat,
  PositiveFloat,
  Float,
} from '../types/Float.js'
import {
  NegativeInteger,
  NonPositiveInteger,
  NonNegativeInteger,
  PositiveInteger,
  Integer,
} from '../types/Integer.js'

export function toFloat(value: NegativeInteger): NegativeFloat
export function toFloat(value: PositiveInteger): PositiveFloat
export function toFloat(value: NonPositiveInteger): NonPositiveFloat
export function toFloat(value: NonNegativeInteger): NonNegativeFloat
export function toFloat(value: Integer): Float
export function toFloat(value: Integer): Float {
  // type-coverage:ignore-next-line
  return (value as unknown) as Float
}
