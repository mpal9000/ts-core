import test from 'ava'
import { IsEqual, isType, f, i } from '../../test.js'
import { Float } from '../Float.js'
import { Integer } from '../Integer.js'
import { JsonifiedInput, Jsonified } from './Jsonified.js'

test('Jsonified', (t) => {
  {
    type Obj = { readonly a: string; readonly b: boolean }
    type JsonifiedObj = Jsonified<Obj>
    type Result = IsEqual<Obj, JsonifiedObj>

    const result: Result = true
    isType<true>()(result)
  }

  {
    type JsonifiedObj = Jsonified<{ a: string }>
    type Result = IsEqual<{ readonly a: string }, JsonifiedObj>

    const result: Result = true
    isType<true>()(result)
  }

  t.pass()
})

test('Jsonified in', (t) => {
  const jsonifiedIn = <Value extends JsonifiedInput>(v: Jsonified<Value>) => v

  type T = {
    a: null
    b: boolean
    c: Float
    d: Integer
    e: string
    readonly f: [
      null,
      boolean,
      Float,
      Integer,
      string,
      { a: { readonly b: [null, boolean, Float, Integer, string] } },
    ]
    g: { a: { b?: readonly [null, boolean, Float, Integer, string] } }
    h: { a: { b?: 'x' } }
    i: { readonly [Key in string]: string }
    j: undefined
    k: string | undefined
    l?: undefined
    m?: string
    z1: { [Key in number]: string }
    z2: { 1: string }
    z3: { a: { [Key in number]: string } }
    z4: { a: { 1: string } }
    z5: { a: { [Key in Float]: string } }
    z6: { a: { [Key in symbol]: 'x' } }
    z7: { a?: { [Key in symbol]: 'x' } }
  }

  {
    const v: T = {
      a: null,
      b: true,
      c: f(),
      d: i(),
      e: 'x',
      f: [null, true, f(), i(), 'x', { a: { b: [null, true, f(), i(), 'x'] } }],
      g: { a: { b: [null, true, f(), i(), 'x'] } },
      h: { a: { b: 'x' } },
      i: { a: 'x' },
      j: undefined,
      k: 'x',
      l: undefined,
      m: 'x',
      z1: { 0: 'x' },
      z2: { 1: 'x' },
      z3: { a: { 0: 'x' } },
      z4: { a: { 1: 'x' } },
      z5: { a: { [f()]: 'x' } },
      z6: { a: { [Symbol('x')]: 'x' } },
      z7: { a: { [Symbol('x')]: 'x' } },
    }

    jsonifiedIn(
      // @ts-expect-error
      v,
    )
  }

  {
    const v: T = {
      a: null,
      b: true,
      c: f(),
      d: i(),
      e: 'x',
      f: [null, true, f(), i(), 'x', { a: { b: [null, true, f(), i(), 'x'] } }],
      g: { a: { b: undefined } },
      h: { a: { b: undefined } },
      i: { a: 'x' },
      j: undefined,
      k: undefined,
      l: undefined,
      m: undefined,
      z1: { 0: 'x' },
      z2: { 1: 'x' },
      z3: { a: { 0: 'x' } },
      z4: { a: { 1: 'x' } },
      z5: { a: { [f()]: 'x' } },
      z6: { a: { [Symbol('x')]: 'x' } },
      z7: { a: undefined },
    }

    jsonifiedIn(
      // @ts-expect-error
      v,
    )
  }

  jsonifiedIn<T>({
    a: null,
    b: true,
    c: f(),
    d: i(),
    e: 'x',
    f: [null, true, f(), i(), 'x', { a: { b: [null, true, f(), i(), 'x'] } }],
    g: { a: { b: [null, true, f(), i(), 'x'] } },
    h: { a: { b: 'x' } },
    i: { a: 'x' },
    j: undefined,
    k: 'x',
    l: undefined,
    m: 'x',
    z1: {},
    z2: {},
    z3: { a: {} },
    z4: { a: {} },
    z5: { a: {} },
    z6: { a: {} },
    z7: { a: {} },
  })

  jsonifiedIn<T>({
    a: null,
    b: true,
    c: f(),
    d: i(),
    e: 'x',
    f: [null, true, f(), i(), 'x', { a: { b: [null, true, f(), i(), 'x'] } }],
    g: { a: { b: [null, true, f(), i(), 'x'] } },
    h: { a: { b: 'x' } },
    i: { a: 'x' },
    j: undefined,
    k: 'x',
    l: undefined,
    m: 'x',
    z1: {
      // @ts-expect-error
      0: 'x',
    },
    z2: {
      // @ts-expect-error
      1: 'x',
    },
    z3: {
      a: {
        // @ts-expect-error
        0: 'x',
      },
    },
    z4: {
      a: {
        // @ts-expect-error
        1: 'x',
      },
    },
    z5: {
      // @ts-expect-error
      a: { [f()]: 'x' },
    },
    z6: {
      // @ts-expect-error
      a: { [Symbol('x')]: 'x' },
    },
    z7: {
      // @ts-expect-error
      a: { [Symbol('x')]: 'x' },
    },
  })

  jsonifiedIn<T>({
    a: null,
    b: true,
    c: f(),
    d: i(),
    e: 'x',
    f: [null, true, f(), i(), 'x', { a: { b: [null, true, f(), i(), 'x'] } }],
    g: { a: { b: undefined } },
    h: { a: { b: undefined } },
    i: { a: 'x' },
    j: undefined,
    k: undefined,
    z1: {},
    z2: {},
    z3: { a: {} },
    z4: { a: {} },
    z5: { a: {} },
    z6: { a: {} },
    z7: { a: undefined },
  })

  jsonifiedIn<T>({
    a: null,
    b: true,
    c: f(),
    d: i(),
    e: 'x',
    f: [null, true, f(), i(), 'x', { a: { b: [null, true, f(), i(), 'x'] } }],
    g: { a: { b: undefined } },
    h: { a: { b: undefined } },
    i: { a: 'x' },
    j: undefined,
    k: undefined,
    z1: {
      // @ts-expect-error
      0: 'x',
    },
    z2: {
      // @ts-expect-error
      1: 'x',
    },
    z3: {
      a: {
        // @ts-expect-error
        0: 'x',
      },
    },
    z4: {
      a: {
        // @ts-expect-error
        1: 'x',
      },
    },
    z5: {
      // @ts-expect-error
      a: { [f()]: 'x' },
    },
    z6: {
      a: {
        // @ts-expect-error
        a: undefined,
      },
    },
    z7: {
      // @ts-expect-error
      a: { [Symbol('x')]: 'x' },
    },
  })

  t.pass()
})

test('Jsonified out', (t) => {
  const jsonifiedOut = <Value extends JsonifiedInput>(): Jsonified<Value> => {
    /*
      eslint-disable
      @typescript-eslint/no-explicit-any,
      @typescript-eslint/no-unsafe-return,
    */
    // type-coverage:ignore-next-line
    return {} as any
    /*
      eslint-enable
      @typescript-eslint/no-explicit-any,
      @typescript-eslint/no-unsafe-return,
    */
  }

  type T = {
    a: null
    b: boolean
    c: Float
    d: Integer
    e: string
    readonly f: [
      null,
      boolean,
      Float,
      Integer,
      string,
      { a: { readonly b: [null, boolean, Float, Integer, string] } },
    ]
    g: { a: { b?: readonly [null, boolean, Float, Integer, string] } }
    h: { a: { b?: 'x' } }
    i: { readonly [Key in string]: string }
    j: undefined
    k: string | undefined
    l?: undefined
    m?: string
    n: {
      a: {
        b?: readonly [
          null,
          boolean,
          Float,
          Integer,
          string,
          {
            a: {
              b?: readonly [null, boolean, Float, Integer, string]
              c: {
                a: {
                  b?: readonly [
                    null,
                    boolean,
                    Float,
                    Integer,
                    string,
                    {
                      a: {
                        b?: readonly [null, boolean, Float, Integer, string]
                        c?: {
                          a: {
                            b?: readonly [null, boolean, Float, Integer, string]
                            c: {
                              a: {
                                b?: readonly [
                                  null,
                                  boolean,
                                  Float,
                                  Integer,
                                  string,
                                  {
                                    a: {
                                      readonly b?: readonly [
                                        null,
                                        boolean,
                                        Float,
                                        Integer,
                                        string,
                                        {
                                          z1: { [Key in number]: string }
                                          z2: { 1: string }
                                          z3: { a: { [Key in number]: string } }
                                          z4: { a: { 1: string } }
                                          z5: { a: { [Key in Float]: string } }
                                          z6: { a: { [Key in symbol]: 'x' } }
                                          z7: { a?: { [Key in symbol]: 'x' } }
                                        },
                                        { [Key in number]: string },
                                        { 1: string },
                                        { a: { [Key in number]: string } },
                                        { a: { 1: string } },
                                        { a: { [Key in Float]: string } },
                                        { a: { [Key in symbol]: 'x' } },
                                        { a?: { [Key in symbol]: 'x' } },
                                      ]
                                    }
                                    b: { [Key in string]: string }
                                    z1: { [Key in number]: string }
                                    z2: { 1: string }
                                    z3: { a: { [Key in number]: string } }
                                    z4: { a: { 1: string } }
                                    z5: { a: { [Key in Float]: string } }
                                    z6: { a: { [Key in symbol]: 'x' } }
                                    z7: { a?: { [Key in symbol]: 'x' } }
                                  },
                                ]
                              }
                            }
                          }
                        }
                      }
                    },
                  ]
                }
              }
            }
          },
        ]
      }
    }
    z1: { [Key in number]: string }
    z2: { 1: string }
    z3: { a: { [Key in number]: string } }
    z4: { a: { 1: string } }
    z5: { a: { [Key in Float]: string } }
    z6: { a: { [Key in symbol]: 'x' } }
    z7: { a?: { [Key in symbol]: 'x' } }
  }

  isType<{
    readonly a: null
    readonly b: boolean
    readonly c: Float
    readonly d: Integer
    readonly e: string
    readonly f: readonly [
      null,
      boolean,
      Float,
      Integer,
      string,
      {
        readonly a: {
          readonly b: readonly [null, boolean, Float, Integer, string]
        }
      },
    ]
    readonly g: {
      readonly a: {
        readonly b?: readonly [null, boolean, Float, Integer, string]
      }
    }
    readonly h: { readonly a: { readonly b?: 'x' } }
    readonly i: { readonly [Key in string]: string }
    readonly j: undefined
    readonly k: string | undefined
    readonly l?: undefined
    readonly m?: string
    readonly n: {
      readonly a: {
        readonly b?: readonly [
          null,
          boolean,
          Float,
          Integer,
          string,
          {
            readonly a: {
              readonly b?: readonly [null, boolean, Float, Integer, string]
              readonly c: {
                readonly a: {
                  readonly b?: readonly [
                    null,
                    boolean,
                    Float,
                    Integer,
                    string,
                    {
                      readonly a: {
                        readonly b?: readonly [
                          null,
                          boolean,
                          Float,
                          Integer,
                          string,
                        ]
                        readonly c?: {
                          readonly a: {
                            readonly b?: readonly [
                              null,
                              boolean,
                              Float,
                              Integer,
                              string,
                            ]
                            readonly c: {
                              readonly a: {
                                readonly b?: readonly [
                                  null,
                                  boolean,
                                  Float,
                                  Integer,
                                  string,
                                  {
                                    readonly a: {
                                      readonly b?: readonly [
                                        null,
                                        boolean,
                                        Float,
                                        Integer,
                                        string,
                                        {
                                          readonly z1: {
                                            readonly [x: string]: never
                                          }
                                          readonly z2: {
                                            readonly [x: string]: never
                                          }
                                          readonly z3: {
                                            readonly a: {
                                              readonly [x: string]: never
                                            }
                                          }
                                          readonly z4: {
                                            readonly a: {
                                              readonly [x: string]: never
                                            }
                                          }
                                          readonly z5: {
                                            readonly a: {
                                              readonly [x: string]: never
                                            }
                                          }
                                          readonly z6: {
                                            readonly a: {
                                              readonly [x: string]: never
                                            }
                                          }
                                          readonly z7: {
                                            readonly a?: {
                                              readonly [x: string]: never
                                            }
                                          }
                                        },
                                        { readonly [x: string]: never },
                                        { readonly [x: string]: never },
                                        {
                                          readonly a: {
                                            readonly [x: string]: never
                                          }
                                        },
                                        {
                                          readonly a: {
                                            readonly [x: string]: never
                                          }
                                        },
                                        {
                                          readonly a: {
                                            readonly [x: string]: never
                                          }
                                        },
                                        {
                                          readonly a: {
                                            readonly [x: string]: never
                                          }
                                        },
                                        {
                                          readonly a?: {
                                            readonly [x: string]: never
                                          }
                                        },
                                      ]
                                    }
                                    readonly b: {
                                      readonly [Key in string]: string
                                    }
                                    readonly z1: {
                                      readonly [x: string]: never
                                    }
                                    readonly z2: { readonly [x: string]: never }
                                    readonly z3: {
                                      readonly a: {
                                        readonly [x: string]: never
                                      }
                                    }
                                    readonly z4: {
                                      readonly a: {
                                        readonly [x: string]: never
                                      }
                                    }
                                    readonly z5: {
                                      readonly a: {
                                        readonly [x: string]: never
                                      }
                                    }
                                    readonly z6: {
                                      readonly a: {
                                        readonly [x: string]: never
                                      }
                                    }
                                    readonly z7: {
                                      readonly a?: {
                                        readonly [x: string]: never
                                      }
                                    }
                                  },
                                ]
                              }
                            }
                          }
                        }
                      }
                    },
                  ]
                }
              }
            }
          },
        ]
      }
    }
    readonly z1: { readonly [x: string]: never }
    readonly z2: { readonly [x: string]: never }
    readonly z3: { readonly a: { readonly [x: string]: never } }
    readonly z4: { readonly a: { readonly [x: string]: never } }
    readonly z5: { readonly a: { readonly [x: string]: never } }
    readonly z6: { readonly a: { readonly [x: string]: never } }
    readonly z7: { readonly a?: { readonly [x: string]: never } }
  }>()(jsonifiedOut<T>())

  t.pass()
})
