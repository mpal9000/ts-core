import { Float } from '../types/Float.js'

export const isFinite = (value: number): value is Float => {
  return Number.isFinite(value)
}
