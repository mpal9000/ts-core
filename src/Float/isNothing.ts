import { Nothing, Float } from '../types/Float.js'

export const isNothing = (value: Float | Nothing): value is Nothing => {
  return value === undefined
}
