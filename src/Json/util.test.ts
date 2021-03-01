import test from 'ava'
import { Float } from '../types/Float.js'
import {
  wrapIs,
  wrapTrue,
  wrapFalse,
  isType,
  apply,
  unknown,
  mixed,
  f,
  i,
} from '../test.js'
import {
  isNothing,
  isPrimitive,
  isArray,
  isRecord,
  isJson,
  normalizeJsonString,
  ensureError,
} from './util.js'

test('isNothing()', (t) => {
  const isTrue: ReturnType<typeof wrapTrue> = wrapTrue(t)
  const isFalse: ReturnType<typeof wrapFalse> = wrapFalse(t)

  /* c8 ignore start */
  // @ts-expect-error
  apply((v) => (isNothing(v) ? isType<never>()(v) : v), undefined)
  apply((v) => (isNothing(v) ? isType<undefined>()(v) : v), undefined)
  /* c8 ignore stop */

  isTrue(isType<boolean>()(isNothing(undefined)))

  isFalse(isType<boolean>()(isNothing(null)))
})

test('isPrimitive()', (t) => {
  const isTrue: ReturnType<typeof wrapTrue> = wrapTrue(t)
  const isFalse: ReturnType<typeof wrapFalse> = wrapFalse(t)

  /* c8 ignore start */
  // @ts-expect-error
  apply((v) => (isPrimitive(v) ? isType<never>()(v) : v), true)
  apply((v) => (isPrimitive(v) ? isType<true>()(v) : v), true)
  // @ts-expect-error
  apply((v) => (isPrimitive(v) ? isType<never>()(v) : v), f())
  apply((v) => (isPrimitive(v) ? isType<Float>()(v) : v), f())
  // @ts-expect-error
  apply((v) => (isPrimitive(v) ? isType<never>()(v) : v), 'x')
  apply((v) => (isPrimitive(v) ? isType<'x'>()(v) : v), 'x')
  // @ts-expect-error
  apply((v) => (isPrimitive(v) ? isType<never>()(v) : v), null)
  apply((v) => (isPrimitive(v) ? isType<null>()(v) : v), null)
  /* c8 ignore stop */

  isTrue(isType<boolean>()(isPrimitive(true)))
  isTrue(isType<boolean>()(isPrimitive(f())))
  isTrue(isType<boolean>()(isPrimitive('x')))
  isTrue(isType<boolean>()(isPrimitive(null)))

  isFalse(isType<boolean>()(isPrimitive([true])))

  // @ts-expect-error
  isPrimitive(Symbol('x'))
  // @ts-expect-error
  isPrimitive(Date)
  // @ts-expect-error
  isPrimitive(mixed())
  // @ts-expect-error
  isPrimitive(unknown())
})

test('isArray()', (t) => {
  const isTrue: ReturnType<typeof wrapTrue> = wrapTrue(t)
  const isFalse: ReturnType<typeof wrapFalse> = wrapFalse(t)

  /* c8 ignore start */
  // @ts-expect-error
  apply((v) => (isArray(v) ? isType<never>()(v) : v), [true] as const)
  apply((v) => (isArray(v) ? isType<readonly [true]>()(v) : v), [true] as const)
  /* c8 ignore stop */

  isTrue(
    isType<boolean>()(
      isArray([
        true,
        f(),
        'x',
        null,
        { a: true, b: i(), c: 'x', d: null },
        [true, f(), 'x', null, { a: true, b: i(), c: 'x', d: null }],
      ]),
    ),
  )

  isFalse(isType<boolean>()(isArray(true)))

  // @ts-expect-error
  isArray(['x', Symbol('x')])
  // @ts-expect-error
  isArray(['x', Date])
  // @ts-expect-error
  isArray(mixed())
  // @ts-expect-error
  isArray(unknown())
})

test('isRecord()', (t) => {
  const isTrue: ReturnType<typeof wrapTrue> = wrapTrue(t)
  const isFalse: ReturnType<typeof wrapFalse> = wrapFalse(t)

  /* c8 ignore start */
  // @ts-expect-error
  apply((v) => (isRecord(v) ? isType<never>()(v) : v), { a: true } as const)
  apply((v) => (isRecord(v) ? isType<{ readonly a: true }>()(v) : v), {
    a: true,
  } as const)
  /* c8 ignore stop */

  isTrue(
    isType<boolean>()(
      isRecord({
        a: true,
        b: i(),
        c: 'x',
        d: null,
        e: [
          true,
          f(),
          'x',
          null,
          { a: true, b: i(), c: 'x', d: null },
          [true, f(), 'x', null, { a: true, b: i(), c: 'x', d: null }],
        ],
      }),
    ),
  )

  isFalse(isType<boolean>()(isRecord([true])))

  // @ts-expect-error
  isRecord({ a: 'x', b: Symbol('x') })
  // @ts-expect-error
  isRecord({ a: 'x', b: Date })
  // @ts-expect-error
  isRecord(mixed())
  // @ts-expect-error
  isRecord(unknown())
})

test('isJson()', (t) => {
  const isTrue: ReturnType<typeof wrapTrue> = wrapTrue(t)
  const isFalse: ReturnType<typeof wrapFalse> = wrapFalse(t)

  /* c8 ignore start */
  // @ts-expect-error
  apply((v) => (isJson(v) ? isType<never>()(v) : v), true)
  apply((v) => (isJson(v) ? isType<true>()(v) : v), true)
  // @ts-expect-error
  apply((v) => (isJson(v) ? isType<never>()(v) : v), f())
  apply((v) => (isJson(v) ? isType<Float>()(v) : v), f())
  // @ts-expect-error
  apply((v) => (isJson(v) ? isType<never>()(v) : v), 'x')
  apply((v) => (isJson(v) ? isType<'x'>()(v) : v), 'x')
  // @ts-expect-error
  apply((v) => (isJson(v) ? isType<never>()(v) : v), null)
  apply((v) => (isJson(v) ? isType<null>()(v) : v), null)
  // @ts-expect-error
  apply((v) => (isJson(v) ? isType<never>()(v) : v), [true] as const)
  apply((v) => (isJson(v) ? isType<readonly [true]>()(v) : v), [true] as const)
  // @ts-expect-error
  apply((v) => (isJson(v) ? isType<never>()(v) : v), {
    a: true,
  } as const)
  apply((v) => (isJson(v) ? isType<{ readonly a: true }>()(v) : v), {
    a: true,
  } as const)
  /* c8 ignore stop */

  isTrue(isType<boolean>()(isJson(true)))
  isTrue(isType<boolean>()(isJson(f())))
  isTrue(isType<boolean>()(isJson('x')))
  isTrue(isType<boolean>()(isJson(null)))
  isTrue(
    isType<boolean>()(
      isJson([
        true,
        f(),
        'x',
        null,
        { a: true, b: i(), c: 'x', d: null },
        [true, f(), 'x', null, { a: true, b: i(), c: 'x', d: null }],
      ]),
    ),
  )
  isTrue(
    isType<boolean>()(
      isJson({
        a: true,
        b: i(),
        c: 'x',
        d: null,
        e: [
          true,
          f(),
          'x',
          null,
          { a: true, b: i(), c: 'x', d: null },
          [true, f(), 'x', null, { a: true, b: i(), c: 'x', d: null }],
        ],
      }),
    ),
  )

  isFalse(isType<boolean>()(isJson(Date)))
  isFalse(isType<boolean>()(isJson(['x', Symbol('x')])))
  isFalse(isType<boolean>()(isJson({ a: 'x', b: Symbol('x'), c: Date })))
})

test('normalizeJsonString()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is('abc\\u2028def', isType<string>()(normalizeJsonString('abc\u2028def')))
  is('abc\\u2029def', isType<string>()(normalizeJsonString('abc\u2029def')))
  is(
    'abc\\u2028def\\u2029ghi',
    isType<string>()(normalizeJsonString('abc\u2028def\u2029ghi')),
  )
  is('abcdef', isType<string>()(normalizeJsonString('abcdef')))

  t.throws(() =>
    normalizeJsonString(
      // @ts-expect-error
      mixed(),
    ),
  )
  t.throws(() =>
    normalizeJsonString(
      // @ts-expect-error
      unknown(),
    ),
  )
})

test('ensureError()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is('BOOM', isType<string>()(ensureError('BAM', new Error('BOOM')).message))
  is('BOOM', isType<string>()(ensureError('BAM', 'BOOM').message))
  is('BOOM', isType<string>()(ensureError('BAM', { message: 'BOOM' }).message))
  is('BAM', isType<string>()(ensureError('BAM', null).message))
})
