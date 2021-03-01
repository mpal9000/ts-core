// Temporary
declare module 'micro-memoize' {
  namespace MicroMemoize {
    // eslint-disable-next-line @typescript-eslint/ban-types
    type Options = {}
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  export default function memoize<Fn extends Function>(
    fn: Fn,
    options?: MicroMemoize.Options,
  ): Fn
}
