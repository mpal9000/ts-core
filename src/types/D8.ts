import * as Integer from './Integer.js'

interface ValidDateTag {
  readonly ValidDate: unique symbol
}

export type ValidDate = Date & ValidDateTag

export type DateRange = {
  readonly from: ValidDate
  readonly to: ValidDate
}

export type Day = (0 | 2 | 1 | 3 | 4 | 5 | 6) & Integer.NonNegativeInteger
