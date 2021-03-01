import test from 'ava'
import { isTypeAssignable, f, i } from '../../test.js'
import { JsonPrimitive, JsonArray, JsonRecord, Json } from './Json.js'

test('Json', (t) => {
  isTypeAssignable<JsonPrimitive>()(true)
  isTypeAssignable<JsonPrimitive>()(f())
  isTypeAssignable<JsonPrimitive>()('x')
  isTypeAssignable<JsonPrimitive>()(null)

  isTypeAssignable<JsonArray>()([
    true,
    f(),
    'x',
    null,
    { a: true, b: i(), c: 'x', d: null },
    [true, f(), 'x', null, { a: true, b: i(), c: 'x', d: null }],
  ])

  isTypeAssignable<JsonRecord>()({
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
  })

  isTypeAssignable<Json>()(true)
  isTypeAssignable<Json>()(f())
  isTypeAssignable<Json>()('x')
  isTypeAssignable<Json>()(null)
  isTypeAssignable<Json>()([
    true,
    f(),
    'x',
    null,
    { a: true, b: i(), c: 'x', d: null },
    [true, f(), 'x', null, { a: true, b: i(), c: 'x', d: null }],
  ])
  isTypeAssignable<Json>()({
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
  })

  t.pass()
})
