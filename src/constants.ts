import * as Integer from './types/Integer.js'

const ni = (value: number) => value as Integer.NegativeInteger // type-coverage:ignore-line
const nni = (value: number) => value as Integer.NonNegativeInteger // type-coverage:ignore-line
const pi = (value: number) => value as Integer.PositiveInteger // type-coverage:ignore-line

// Temporary
export const NUMBERS = {
  ZERO: nni(0),
  ONE: pi(1),
  TWO: pi(2),
  THREE: pi(3),
  FOUR: pi(4),
  FIVE: pi(5),
  SIX: pi(6),
  SEVEN: pi(7),
  EIGHT: pi(8),
  NINE: pi(9),
  TEN: pi(10),
  TWENTY: pi(20),
  THIRTY: pi(30),
  FORTY: pi(40),
  FIFTY: pi(50),
  SIXTY: pi(60),
  SEVENTY: pi(70),
  EIGHTY: pi(80),
  NINETY: pi(90),
  ONE_HUNDRED: pi(100),
  ONE_THOUSAND: pi(1000),
} as const

// Temporary
export const NEGATIVE_NUMBERS = {
  ONE: ni(-1),
  TWO: ni(-2),
  THREE: ni(-3),
  FOUR: ni(-4),
  FIVE: ni(-5),
  SIX: ni(-6),
  SEVEN: ni(-7),
  EIGHT: ni(-8),
  NINE: ni(-9),
  TEN: ni(-10),
  TWENTY: ni(-20),
  THIRTY: ni(-30),
  FORTY: ni(-40),
  FIFTY: ni(-50),
  SIXTY: ni(-60),
  SEVENTY: ni(-70),
  EIGHTY: ni(-80),
  NINETY: ni(-90),
  ONE_HUNDRED: ni(-100),
  ONE_THOUSAND: ni(-1000),
} as const
