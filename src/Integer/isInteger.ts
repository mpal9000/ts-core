import { Integer } from '../types/Integer.js'

export function isInteger(value: Integer): value is Integer
export function isInteger(value: unknown): value is Integer
export function isInteger(value: unknown): value is Integer {
  return Number.isSafeInteger(value)
}
