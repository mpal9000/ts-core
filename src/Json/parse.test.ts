import test from 'ava'
import {
  wrapIs,
  wrapDeepEqual,
  wrapTrue,
  isType,
  unknown,
  mixed,
} from '../test.js'
import { Nothing, Json } from '../types/Json/index.js'
import * as Either from '../Either.js'
import * as Func from '../Func.js'
import { isArray } from './util.js'
import { JsonParseResult, parse } from './parse.js'

const undef = Func.always(undefined)

const errMsg = (error: Error): string => error.message

const isSyntaxError = (value: unknown): value is SyntaxError => {
  return value instanceof SyntaxError
}

test('parse()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)
  const isDeepEqual: ReturnType<typeof wrapDeepEqual> = wrapDeepEqual(t)
  const isTrue: ReturnType<typeof wrapTrue> = wrapTrue(t)

  is<Json, Json | undefined>(
    null,
    isType<Json | undefined>()(
      Either.getOrElse(undef, isType<JsonParseResult>()(parse('null'))),
    ),
  )
  is<Json, Json | undefined>(
    'xyz',
    isType<Json | undefined>()(
      Either.getOrElse(undef, isType<JsonParseResult>()(parse('"xyz"'))),
    ),
  )
  isDeepEqual<Json, Json | undefined>(
    { a: ['x', 'y', 'z'] },
    isType<Json | undefined>()(
      Either.getOrElse(
        undef,
        isType<JsonParseResult>()(parse('{ "a": ["x", "y", "z"] }')),
      ),
    ),
  )

  is<Json, Json | undefined>(
    'xyz',
    isType<Json | undefined>()(
      Either.getOrElse(
        undef,
        isType<JsonParseResult>()(
          parse(
            {
              reviver: (key, value) => {
                return key === '' ? 'xyz' : value
              },
            },
            '{ "a": ["a", "b"] }',
          ),
        ),
      ),
    ),
  )
  isDeepEqual<Json, Json | undefined>(
    { a: 'a, b', b: { a: true } },
    isType<Json | undefined>()(
      Either.getOrElse(
        undef,
        isType<JsonParseResult>()(
          parse(
            {
              reviver: (key, value) => {
                return key === 'a' && isArray(value) ? value.join(', ') : value
              },
            },
            '{ "a": ["a", "b"], "b": { "a": true } }',
          ),
        ),
      ),
    ),
  )
  isDeepEqual<Json, Json | undefined>(
    { b: true },
    isType<Json | undefined>()(
      Either.getOrElse(
        undef,
        isType<JsonParseResult>()(
          parse(
            {
              reviver: (key, value) => {
                return key === 'a' ? Nothing : value
              },
            },
            '{ "a": ["a", "b"], "b": true }',
          ),
        ),
      ),
    ),
  )
  isDeepEqual<Json, Json | undefined>(
    { a: ['a', ['b', 'b']] },
    isType<Json | undefined>()(
      Either.getOrElse(
        undef,
        isType<JsonParseResult>()(
          parse(
            {
              reviver(_key, value) {
                return isArray(this) && value === 'b' ? [value, value] : value
              },
            },
            '{ "a": ["a", "b"] }',
          ),
        ),
      ),
    ),
  )
  isDeepEqual<Json, Json | undefined>(
    { a: ['a', null] },
    isType<Json | undefined>()(
      Either.getOrElse(
        undef,
        isType<JsonParseResult>()(
          parse(
            {
              reviver(_key, value) {
                return isArray(this) && value === 'b' ? Nothing : value
              },
            },
            '{ "a": ["a", "b"] }',
          ),
        ),
      ),
    ),
  )
  isDeepEqual<Json, Json | undefined>(
    null,
    isType<Json | undefined>()(
      Either.getOrElse(
        undef,
        isType<JsonParseResult>()(
          parse(
            {
              reviver(key, value) {
                return key === '' ? Nothing : value
              },
            },
            '{ "a": ["a", "b"], "": true }',
          ),
        ),
      ),
    ),
  )

  isTrue(
    isSyntaxError(
      isType<Error | undefined>()(
        Either.getOrElse(
          undef,
          Either.swap(isType<JsonParseResult>()(parse('xyz'))),
        ),
      ),
    ),
  )
  isTrue(
    isSyntaxError(
      isType<Error | undefined>()(
        Either.getOrElse(
          undef,
          Either.swap(
            isType<JsonParseResult>()(parse('{ "a": ["x" "y" "z"] }')),
          ),
        ),
      ),
    ),
  )
  is(
    'BOOM',
    isType<string | undefined>()(
      Either.getOrElse(
        undef,
        Either.swap(
          Either.mapLeft(
            errMsg,

            isType<JsonParseResult>()(
              parse(
                {
                  reviver: () => {
                    throw new Error('BOOM')
                  },
                },
                '{ "a": ["x", "y", "z"] }',
              ),
            ),
          ),
        ),
      ),
    ),
  )
  is(
    'BOOM',
    isType<string | undefined>()(
      Either.getOrElse(
        undef,
        Either.swap(
          Either.mapLeft(
            errMsg,

            isType<JsonParseResult>()(
              parse(
                {
                  reviver: () => {
                    throw 'BOOM'
                  },
                },
                '{ "a": ["x", "y", "z"] }',
              ),
            ),
          ),
        ),
      ),
    ),
  )
  is(
    'BOOM',
    isType<string | undefined>()(
      Either.getOrElse(
        undef,
        Either.swap(
          Either.mapLeft(
            errMsg,

            isType<JsonParseResult>()(
              parse(
                {
                  reviver: () => {
                    throw { message: 'BOOM' }
                  },
                },
                '{ "a": ["x", "y", "z"] }',
              ),
            ),
          ),
        ),
      ),
    ),
  )
  is(
    'Parsing error',
    isType<string | undefined>()(
      Either.getOrElse(
        undef,
        Either.swap(
          Either.mapLeft(
            errMsg,

            isType<JsonParseResult>()(
              parse(
                {
                  reviver: () => {
                    throw null
                  },
                },
                '{ "a": ["x", "y", "z"] }',
              ),
            ),
          ),
        ),
      ),
    ),
  )
  is(
    'Unexpected string in JSON at position 12',
    isType<string | undefined>()(
      Either.getOrElse(
        undef,
        Either.swap(
          Either.mapLeft(
            errMsg,

            isType<JsonParseResult>()(
              parse(
                {
                  /* c8 ignore next 2 */
                  reviver: () => {
                    throw new Error('BOOM')
                  },
                },
                '{ "a": ["x" "y" "z"] }',
              ),
            ),
          ),
        ),
      ),
    ),
  )

  // @ts-expect-error
  parse(2)
  // @ts-expect-error
  parse(Date)
  // @ts-expect-error
  parse(mixed())
  // @ts-expect-error
  parse(unknown())
})
