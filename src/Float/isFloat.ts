import { Float } from '../types/Float.js'
import { isFinite } from './isFinite.js'

export function isFloat(value: Float): value is Float
export function isFloat(value: unknown): value is Float
export function isFloat(value: unknown): value is Float {
  return typeof value === 'number' && isFinite(value)
}
