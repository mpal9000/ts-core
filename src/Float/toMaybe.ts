import {
  Nothing,
  NegativeFloat,
  NonPositiveFloat,
  NonNegativeFloat,
  PositiveFloat,
  Float,
} from '../types/Float.js'
import { isNothing } from './isNothing.js'
import * as Maybe from '../types/Maybe.js'

export function toMaybe(value: Nothing): Maybe.Nothing
export function toMaybe(value: NegativeFloat): NegativeFloat
export function toMaybe(value: PositiveFloat): PositiveFloat
export function toMaybe(value: NonPositiveFloat): NonPositiveFloat
export function toMaybe(value: NonNegativeFloat): NonNegativeFloat
export function toMaybe(value: Float): Float
export function toMaybe(
  value: NegativeFloat | Nothing,
): Maybe.Maybe<NegativeFloat>
export function toMaybe(
  value: PositiveFloat | Nothing,
): Maybe.Maybe<PositiveFloat>
export function toMaybe(
  value: NonPositiveFloat | Nothing,
): Maybe.Maybe<NonPositiveFloat>
export function toMaybe(
  value: NonNegativeFloat | Nothing,
): Maybe.Maybe<NonNegativeFloat>
export function toMaybe(value: Float | Nothing): Maybe.Maybe<Float>
export function toMaybe(value: Float | Nothing): Maybe.Maybe<Float> {
  return isNothing(value) ? undefined : value
}
