// See `@types/node`
interface ErrorConstructor {
  /** Create .stack property on a target object */
  // eslint-disable-next-line @typescript-eslint/ban-types
  captureStackTrace?: (targetObject: object, constructorOpt?: Function) => void
}
