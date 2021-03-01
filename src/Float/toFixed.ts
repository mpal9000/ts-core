import { Float, FractionDigitsNumber } from '../types/Float.js'
import { EPSILON } from './constants.js'

const EPSILON_PLUS_ONE = EPSILON + 1

const FRACTION_DIGIT_POWERS: {
  readonly [Key in FractionDigitsNumber]: number
} = {
  1: Math.pow(10, 1),
  2: Math.pow(10, 2),
  3: Math.pow(10, 3),
  4: Math.pow(10, 4),
  5: Math.pow(10, 5),
  6: Math.pow(10, 6),
  7: Math.pow(10, 7),
  8: Math.pow(10, 8),
  9: Math.pow(10, 9),
  10: Math.pow(10, 10),
  11: Math.pow(10, 11),
  12: Math.pow(10, 12),
  13: Math.pow(10, 13),
  14: Math.pow(10, 14),
  15: Math.pow(10, 15),
  16: Math.pow(10, 16),
  17: Math.pow(10, 17),
  18: Math.pow(10, 18),
  19: Math.pow(10, 19),
  20: Math.pow(10, 20),
}

export const toFixed = (
  fractionDigits: FractionDigitsNumber,
  value: Float,
): string => {
  const fixed = value.toFixed(fractionDigits)

  if (Number(fixed) === value) return fixed

  const power = FRACTION_DIGIT_POWERS[fractionDigits]

  const result = Math.round(value * power * EPSILON_PLUS_ONE) / power

  return result.toFixed(fractionDigits)
}
