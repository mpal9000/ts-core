import {
  Nothing,
  NegativeFloat,
  NonPositiveFloat,
  NonNegativeFloat,
  PositiveFloat,
  Float,
} from '../types/Float.js'
import { isFloat } from './isFloat.js'

export function fromNumber(value: NegativeFloat): NegativeFloat
export function fromNumber(value: PositiveFloat): PositiveFloat
export function fromNumber(value: NonPositiveFloat): NonPositiveFloat
export function fromNumber(value: NonNegativeFloat): NonNegativeFloat
export function fromNumber(value: Float): Float
export function fromNumber(value: number): Float | Nothing
export function fromNumber(value: number): Float | Nothing {
  return isFloat(value) ? value : Nothing
}
