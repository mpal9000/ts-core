import { Nothing, Integer } from '../types/Integer.js'

export const isNothing = (value: Integer | Nothing): value is Nothing => {
  return value === undefined
}
