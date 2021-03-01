import { Integer } from '../types/Integer.js'
import { MINIMUM, MAXIMUM } from './constants.js'

export const isSafe = (value: number): value is Integer => {
  return value <= MAXIMUM && value >= MINIMUM
}
