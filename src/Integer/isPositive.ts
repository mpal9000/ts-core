import {
  NonPositiveInteger,
  PositiveInteger,
  Integer,
} from '../types/Integer.js'

export function isPositive(value: NonPositiveInteger): value is never
export function isPositive(value: Integer): value is PositiveInteger
export function isPositive(value: Integer): value is PositiveInteger {
  return value > 0
}
