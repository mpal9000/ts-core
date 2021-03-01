import * as Util from './types/Util.js'

export * from './types/Util.js'

export function ifElse<
  Value,
  ConditionResult extends boolean,
  OnTrueResult,
  OnFalseResult
>(
  condition: (value: Value) => ConditionResult,
  onTrue: (value: Value) => OnTrueResult,
  onFalse: (value: Value) => OnFalseResult,
): (value: Value) => ConditionResult extends true ? OnTrueResult : OnFalseResult
export function ifElse<
  Value,
  ConditionResult extends boolean,
  OnTrueResult,
  OnFalseResult
>(
  condition: (value: Value) => ConditionResult,
  onTrue: (value: Value) => OnTrueResult,
  onFalse: (value: Value) => OnFalseResult,
  value: Value,
): ConditionResult extends true ? OnTrueResult : OnFalseResult
export function ifElse<Value, OnTrueResult, OnFalseResult>(
  ...args:
    | readonly [
        (value: Value) => boolean,
        (value: Value) => OnTrueResult,
        (value: Value) => OnFalseResult,
        Value,
      ]
    | readonly [
        (value: Value) => boolean,
        (value: Value) => OnTrueResult,
        (value: Value) => OnFalseResult,
      ]
):
  | ((value: Value) => OnTrueResult | OnFalseResult)
  | (OnTrueResult | OnFalseResult) {
  const condition = args[0]
  const onTrue = args[1]
  const onFalse = args[2]

  const getResult = (value: Value) => {
    return condition(value) ? onTrue(value) : onFalse(value)
  }

  return args.length === 3 ? getResult : getResult(args[3])
}

export function ifElseRefine<
  Value,
  RefinedValue extends Value,
  OnTrueResult,
  OnFalseResult
>(
  condition: (value: Value) => value is RefinedValue,
  onTrue: (value: RefinedValue) => OnTrueResult,
  onFalse: (value: Util.Exclude<Value, RefinedValue>) => OnFalseResult,
): (
  value: Value,
) => Util.IsNever<Util.Exclude<Value, RefinedValue>> extends true
  ? OnTrueResult
  : OnTrueResult | OnFalseResult
export function ifElseRefine<
  Value,
  RefinedValue extends Value,
  OnTrueResult,
  OnFalseResult
>(
  condition: (value: Value) => value is RefinedValue,
  onTrue: (value: RefinedValue) => OnTrueResult,
  onFalse: (value: Util.Exclude<Value, RefinedValue>) => OnFalseResult,
  value: Value,
): Util.IsNever<Util.Exclude<Value, RefinedValue>> extends true
  ? OnTrueResult
  : OnTrueResult | OnFalseResult
export function ifElseRefine<
  Value,
  RefinedValue extends Value,
  OnTrueResult,
  OnFalseResult
>(
  ...args:
    | readonly [
        (value: Value) => value is RefinedValue,
        (value: RefinedValue) => OnTrueResult,
        (value: Util.Exclude<Value, RefinedValue>) => OnFalseResult,
        Value,
      ]
    | readonly [
        (value: Value) => value is RefinedValue,
        (value: RefinedValue) => OnTrueResult,
        (value: Util.Exclude<Value, RefinedValue>) => OnFalseResult,
      ]
):
  | ((value: Value) => OnTrueResult | OnFalseResult)
  | (OnTrueResult | OnFalseResult) {
  const condition = args[0]
  const onTrue = args[1]
  const onFalse = args[2]

  const getResult = (value: Value) => {
    return condition(value)
      ? onTrue(value)
      : onFalse(
          // type-coverage:ignore-next-line
          value as Util.Exclude<Value, RefinedValue>,
        )
  }

  return args.length === 3 ? getResult : getResult(args[3])
}
