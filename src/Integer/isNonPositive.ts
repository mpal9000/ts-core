import {
  NonPositiveInteger,
  PositiveInteger,
  Integer,
} from '../types/Integer.js'

export function isNonPositive(value: PositiveInteger): value is never
export function isNonPositive(value: Integer): value is NonPositiveInteger
export function isNonPositive(value: Integer): value is NonPositiveInteger {
  return value <= 0
}
