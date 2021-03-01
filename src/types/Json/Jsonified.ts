import * as Float from '../Float.js'
import * as Integer from '../Integer.js'

export type JsonifiedArrayInput = readonly JsonifiedInput[]

export type JsonifiedRecordInput = { readonly [Key in string]?: JsonifiedInput }

export type JsonifiedInput =
  | null
  | boolean
  | Float.Float
  | Integer.Integer
  | string
  | JsonifiedArrayInput
  | JsonifiedRecordInput

type JsonifiedArray<Input extends JsonifiedArrayInput> = {
  readonly [Key in keyof Input]: Jsonified<Input[Key]>
}

type JsonifiedRecordValue<
  Value extends JsonifiedInput | undefined
> = Value extends JsonifiedInput
  ? Jsonified<Value>
  : Value extends JsonifiedInput | undefined
  ? Jsonified<Exclude<Value, undefined>> | undefined
  : never

type JsonifiedRecord<
  Input extends JsonifiedRecordInput
> = keyof Input extends string
  ? { readonly [Key in keyof Input]: JsonifiedRecordValue<Input[Key]> }
  : { readonly [Key in string]: never }

type JsonifiedValue<
  Value extends JsonifiedInput
> = Value extends JsonifiedArrayInput
  ? JsonifiedArray<Value>
  : Value extends JsonifiedRecordInput
  ? JsonifiedRecord<Value>
  : Value

export type Jsonified<Value extends JsonifiedInput> = JsonifiedValue<Value>
