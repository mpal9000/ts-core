import {
  isDate as isDate_,
  isValid as isValid_,
  isEqual as isEqual_,
  isBefore as isBefore_,
  isAfter as isAfter_,
  isWithinInterval as isWithin_,
  startOfSecond as startOfSecond_,
  startOfMinute as startOfMinute_,
  startOfHour as startOfHour_,
  startOfDay as startOfDay_,
  startOfMonth as startOfMonth_,
  startOfYear as startOfYear_,
  endOfSecond as endOfSecond_,
  endOfMinute as endOfMinute_,
  endOfHour as endOfHour_,
  endOfDay as endOfDay_,
  endOfMonth as endOfMonth_,
  endOfYear as endOfYear_,
  getMilliseconds as getMilliseconds_,
  getSeconds as getSeconds_,
  getMinutes as getMinutes_,
  getHours as getHours_,
  getDay as getDay_,
  getMonth as getMonth_,
  getYear as getYear_,
  setMilliseconds as setMilliseconds_,
  setSeconds as setSeconds_,
  setMinutes as setMinutes_,
  setHours as setHours_,
  setMonth as setMonth_,
  setYear as setYear_,
  addMilliseconds as addMilliseconds_,
  addSeconds as addSeconds_,
  addMinutes as addMinutes_,
  addHours as addHours_,
  addDays as addDays_,
  addMonths as addMonths_,
  addYears as addYears_,
  subMilliseconds as subMilliseconds_,
  subSeconds as subSeconds_,
  subMinutes as subMinutes_,
  subHours as subHours_,
  subDays as subDays_,
  subMonths as subMonths_,
  subYears as subYears_,
  eachDayOfInterval as eachDayOfInterval_,
  parseISO as parseISO_,
} from 'date-fns'
import * as Util from './types/Util.js'
import * as Integer from './types/Integer.js'
import * as D8 from './types/D8.js'

export * from './types/D8.js'

export const create = (): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return new Date(Date.now()) as D8.ValidDate
}

export function isDateInstance<Value extends Util.Mixed>(
  value: Value,
): value is Util.ExtractUnsafe<Value, Date>
export function isDateInstance(value: unknown): value is Date
export function isDateInstance(value: unknown): boolean {
  return isDate_(value)
}

export const isValid = (value: Date): value is D8.ValidDate => {
  return isValid_(value)
}

export function isDate<Value extends Util.Mixed>(
  value: Value,
): value is Util.ExtractUnsafe<Value, D8.ValidDate>
export function isDate(value: unknown): value is D8.ValidDate
export function isDate(value: unknown): boolean {
  return isDateInstance(value) && isValid(value)
}

export const fromIsoString = (isoString: string): D8.ValidDate | undefined => {
  const maybeValidDate = parseISO_(isoString)

  return isValid(maybeValidDate) ? maybeValidDate : undefined
}

export const toIsoString = (date: D8.ValidDate): string => {
  return date.toISOString()
}

export const isEqual = (date1: D8.ValidDate, date2: D8.ValidDate): boolean => {
  return isEqual_(date1, date2)
}

export const isBefore = (
  dateToCompare: D8.ValidDate,
  date: D8.ValidDate,
): boolean => {
  return isBefore_(date, dateToCompare)
}

export const isEqualOrBefore = (
  dateToCompare: D8.ValidDate,
  date: D8.ValidDate,
): boolean => {
  return !isAfter_(date, dateToCompare)
}

export const isAfter = (
  dateToCompare: D8.ValidDate,
  date: D8.ValidDate,
): boolean => {
  return isAfter_(date, dateToCompare)
}

export const isEqualOrAfter = (
  dateToCompare: D8.ValidDate,
  date: D8.ValidDate,
): boolean => {
  return !isBefore_(date, dateToCompare)
}

export const isWithin = (
  dateRange: D8.DateRange,
  date: D8.ValidDate,
): boolean => {
  const { from: start, to: end } = dateRange

  return isWithin_(date, { start, end })
}

export const getFullYear = (date: D8.ValidDate): Integer.NonNegativeInteger => {
  // type-coverage:ignore-next-line
  return date.getFullYear() as Integer.NonNegativeInteger
}

export const getTime = (date: D8.ValidDate): Integer.NonNegativeInteger => {
  // type-coverage:ignore-next-line
  return date.getTime() as Integer.NonNegativeInteger
}

export const getStartOfSecond = (date: D8.ValidDate): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return startOfSecond_(date) as D8.ValidDate
}

export const getStartOfMinute = (date: D8.ValidDate): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return startOfMinute_(date) as D8.ValidDate
}

export const getStartOfHour = (date: D8.ValidDate): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return startOfHour_(date) as D8.ValidDate
}

export const getStartOfDay = (date: D8.ValidDate): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return startOfDay_(date) as D8.ValidDate
}

export const getStartOfMonth = (date: D8.ValidDate): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return startOfMonth_(date) as D8.ValidDate
}

export const getStartOfYear = (date: D8.ValidDate): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return startOfYear_(date) as D8.ValidDate
}

export const getEndOfSecond = (date: D8.ValidDate): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return endOfSecond_(date) as D8.ValidDate
}

export const getEndOfMinute = (date: D8.ValidDate): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return endOfMinute_(date) as D8.ValidDate
}

export const getEndOfHour = (date: D8.ValidDate): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return endOfHour_(date) as D8.ValidDate
}

export const getEndOfDay = (date: D8.ValidDate): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return endOfDay_(date) as D8.ValidDate
}

export const getEndOfMonth = (date: D8.ValidDate): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return endOfMonth_(date) as D8.ValidDate
}

export const getEndOfYear = (date: D8.ValidDate): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return endOfYear_(date) as D8.ValidDate
}

export const getMilliseconds = (
  date: D8.ValidDate,
): Integer.NonNegativeInteger => {
  // type-coverage:ignore-next-line
  return getMilliseconds_(date) as Integer.NonNegativeInteger
}

export const getSeconds = (date: D8.ValidDate): Integer.NonNegativeInteger => {
  // type-coverage:ignore-next-line
  return getSeconds_(date) as Integer.NonNegativeInteger
}

export const getMinutes = (date: D8.ValidDate): Integer.NonNegativeInteger => {
  // type-coverage:ignore-next-line
  return getMinutes_(date) as Integer.NonNegativeInteger
}

export const getHours = (date: D8.ValidDate): Integer.NonNegativeInteger => {
  // type-coverage:ignore-next-line
  return getHours_(date) as Integer.NonNegativeInteger
}

export const getDay = (date: D8.ValidDate): D8.Day => {
  // type-coverage:ignore-next-line
  return getDay_(date) as D8.Day
}

export const getMonth = (date: D8.ValidDate): Integer.NonNegativeInteger => {
  // type-coverage:ignore-next-line
  return getMonth_(date) as Integer.NonNegativeInteger
}

export const getYear = (date: D8.ValidDate): Integer.NonNegativeInteger => {
  // type-coverage:ignore-next-line
  return getYear_(date) as Integer.NonNegativeInteger
}

export const setMilliseconds = (
  milliseconds: Integer.Integer,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return setMilliseconds_(date, milliseconds) as D8.ValidDate
}

export const setSeconds = (
  seconds: Integer.Integer,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return setSeconds_(date, seconds) as D8.ValidDate
}

export const setMinutes = (
  minutes: Integer.Integer,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return setMinutes_(date, minutes) as D8.ValidDate
}

export const setHours = (
  hours: Integer.Integer,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return setHours_(date, hours) as D8.ValidDate
}

export const setMonth = (
  month: Integer.Integer,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return setMonth_(date, month) as D8.ValidDate
}

export const setYear = (
  year: Integer.Integer,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return setYear_(date, year) as D8.ValidDate
}

export const addMilliseconds = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return addMilliseconds_(date, amount) as D8.ValidDate
}

export const addSeconds = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return addSeconds_(date, amount) as D8.ValidDate
}

export const addMinutes = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return addMinutes_(date, amount) as D8.ValidDate
}

export const addHours = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return addHours_(date, amount) as D8.ValidDate
}

export const addDays = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return addDays_(date, amount) as D8.ValidDate
}

export const addMonths = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return addMonths_(date, amount) as D8.ValidDate
}

export const addYears = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return addYears_(date, amount) as D8.ValidDate
}

export const subtractMilliseconds = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return subMilliseconds_(date, amount) as D8.ValidDate
}

export const subtractSeconds = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return subSeconds_(date, amount) as D8.ValidDate
}

export const subtractMinutes = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return subMinutes_(date, amount) as D8.ValidDate
}

export const subtractHours = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return subHours_(date, amount) as D8.ValidDate
}

export const subtractDays = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return subDays_(date, amount) as D8.ValidDate
}

export const subtractMonths = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return subMonths_(date, amount) as D8.ValidDate
}

export const subtractYears = (
  amount: Integer.NonNegativeInteger,
  date: D8.ValidDate,
): D8.ValidDate => {
  // type-coverage:ignore-next-line
  return subYears_(date, amount) as D8.ValidDate
}

export const getDatesBetween = (
  dateRange: D8.DateRange,
): readonly D8.ValidDate[] => {
  const { from: start, to: end } = dateRange

  // type-coverage:ignore-next-line
  return eachDayOfInterval_({ start, end }) as D8.ValidDate[]
}
