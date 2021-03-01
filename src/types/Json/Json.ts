import * as Float from '../Float.js'
import * as Integer from '../Integer.js'

export type JsonPrimitive =
  | null
  | boolean
  | Float.Float
  | Integer.Integer
  | string

export type JsonArray = readonly Json[]

export type JsonRecord = { readonly [Key in string]: Json }

export type Json = JsonPrimitive | JsonArray | JsonRecord
