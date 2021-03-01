import {
  Nothing,
  NegativeInteger,
  NonNegativeInteger,
} from '../types/Integer.js'
import { isInteger } from './isInteger.js'
import { isNegative } from './isNegative.js'

export function fromNumberNegative(value: NonNegativeInteger): Nothing
export function fromNumberNegative(value: NegativeInteger): NegativeInteger
export function fromNumberNegative(value: number): NegativeInteger | Nothing
export function fromNumberNegative(value: number): NegativeInteger | Nothing {
  return isInteger(value) && isNegative(value) ? value : Nothing
}
