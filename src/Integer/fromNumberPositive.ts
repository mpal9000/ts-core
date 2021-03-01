import {
  Nothing,
  NonPositiveInteger,
  PositiveInteger,
} from '../types/Integer.js'
import { isInteger } from './isInteger.js'
import { isPositive } from './isPositive.js'

export function fromNumberPositive(value: NonPositiveInteger): Nothing
export function fromNumberPositive(value: PositiveInteger): PositiveInteger
export function fromNumberPositive(value: number): PositiveInteger | Nothing
export function fromNumberPositive(value: number): PositiveInteger | Nothing {
  return isInteger(value) && isPositive(value) ? value : Nothing
}
