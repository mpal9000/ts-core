export type IsLiteral<Value extends string> = Value extends string
  ? string extends Value
    ? false
    : true
  : false
