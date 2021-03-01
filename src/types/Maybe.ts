import * as Util from './Util.js'

export type Nothing = null | undefined

export type Just<Value> = Util.ExcludeUnsafe<Value, Nothing>

export type Maybe<Value extends Util.NonNullableValue> = Value | Nothing
