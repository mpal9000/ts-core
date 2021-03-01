import test from 'ava'
import {
  MI,
  MNI,
  MNPI,
  MNNI,
  wrapIs,
  isType,
  f,
  nf,
  npf,
  nnf,
  pf,
  mf,
  mnf,
  mnpf,
  mnnf,
  mpf,
  i,
} from '../test.js'
import { Nothing as NothingI } from '../types/Integer.js'
import { Nothing as NothingF } from '../types/Float.js'
import { EPSILON, SMALLEST, MINIMUM, MAXIMUM } from './constants.js'
import { floor } from './floor.js'

test('floor()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(i(1), isType<MI>()(floor(f(1.1))))
  is(i(-2), isType<MNI>()(floor(nf(-1.1))))
  is(i(-1), isType<MNPI>()(floor(npf(-0.1))))
  is(i(0), isType<MNNI>()(floor(nnf(0.1))))
  is(i(1), isType<MNNI>()(floor(pf(1.1))))

  is(i(1), isType<MI>()(floor(mf(1.1))))
  is(i(-2), isType<MNI>()(floor(mnf(-1.1))))
  is(i(-1), isType<MNPI>()(floor(mnpf(-0.1))))
  is(i(0), isType<MNNI>()(floor(mnnf(0.1))))
  is(i(1), isType<MNNI>()(floor(mpf(1.1))))

  is(NothingI, isType<NothingI>()(floor(NothingF)))

  is(i(-1263), floor(f(-1262.48)))
  is(i(-66), floor(f(-65.18)))
  is(i(-47), floor(f(-46.5)))
  is(i(-42), floor(f(-42)))
  is(i(-40), floor(f(-39.425)))
  is(i(-19), floor(f(-18.15)))
  is(i(-18), floor(f(-17.1)))
  is(i(-17), floor(f(-17)))
  is(i(-10), floor(f(-9.13)))
  is(i(-6), floor(f(-5.12)))
  is(i(-5), floor(f(-4.6)))
  is(i(-5), floor(f(-4.5)))
  is(i(-4), floor(f(-3.9)))
  is(i(-4), floor(f(-3.5)))
  is(i(-4), floor(f(-3.1)))
  is(i(-3), floor(f(-3)))
  is(i(-3), floor(f(-2.9)))
  is(i(-3), floor(f(-2.5)))
  is(i(-3), floor(f(-2.26)))
  is(i(-3), floor(f(-2.1755465135353)))
  is(i(-3), floor(f(-2.175495134384)))
  is(i(-3), floor(f(-2.1753543549)))
  is(i(-3), floor(f(-2.1)))
  is(i(-2), floor(f(-2)))
  is(i(-2), floor(f(-1.9)))
  is(i(-2), floor(f(-1.5)))
  is(i(-2), floor(f(-1.4999999999999998)))
  is(i(-2), floor(f(-1.45)))
  is(i(-2), floor(f(-1.34)))
  is(i(-2), floor(f(-1.123456789)))
  is(i(-2), floor(f(-1.1)))
  is(i(-2), floor(f(-1.015)))
  is(i(-2), floor(f(-1.005)))
  is(i(-2), floor(f(-1.0049999)))
  is(i(-1), floor(f(-1)))
  is(i(-1), floor(f(-0.9)))
  is(i(-1), floor(f(-0.6)))
  is(i(-1), floor(f(-0.5000000000000001)))
  is(i(-1), floor(f(-0.5)))
  is(i(-1), floor(f(-0.49999999999999994)))
  is(i(-1), floor(f(-0.4)))
  is(i(-1), floor(f(-0.2)))
  is(i(-1), floor(f(-0.1)))
  is(i(-1), floor(f(-0.014999999999999999)))
  is(i(-1), floor(f(-0.01499999999999999)))
  is(i(-1), floor(f(-0.0000001)))
  is(i(-1), floor(f(-1e-8)))
  is(i(-0), floor(f(-0)))
  is(i(0), floor(f(0)))
  is(i(0), floor(f(1e-8)))
  is(i(0), floor(f(0.0000001)))
  is(i(0), floor(f(0.01499999999999999)))
  is(i(0), floor(f(0.014999999999999999)))
  is(i(0), floor(f(0.1)))
  is(i(0), floor(f(0.2)))
  is(i(0), floor(f(0.4)))
  is(i(0), floor(f(0.49999999999999994)))
  is(i(0), floor(f(0.5)))
  is(i(0), floor(f(0.5000000000000001)))
  is(i(0), floor(f(0.6)))
  is(i(0), floor(f(0.9)))
  is(i(1), floor(f(1)))
  is(i(1), floor(f(1.0049999)))
  is(i(1), floor(f(1.005)))
  is(i(1), floor(f(1.015)))
  is(i(1), floor(f(1.1)))
  is(i(1), floor(f(1.123456789)))
  is(i(1), floor(f(1.34)))
  is(i(1), floor(f(1.45)))
  is(i(1), floor(f(1.4999999999999998)))
  is(i(1), floor(f(1.5)))
  is(i(1), floor(f(1.9)))
  is(i(2), floor(f(2)))
  is(i(2), floor(f(2.1)))
  is(i(2), floor(f(2.1753543549)))
  is(i(2), floor(f(2.175495134384)))
  is(i(2), floor(f(2.1755465135353)))
  is(i(2), floor(f(2.26)))
  is(i(2), floor(f(2.5)))
  is(i(2), floor(f(2.9)))
  is(i(3), floor(f(3)))
  is(i(3), floor(f(3.1)))
  is(i(3), floor(f(3.5)))
  is(i(3), floor(f(3.9)))
  is(i(4), floor(f(4.5)))
  is(i(4), floor(f(4.6)))
  is(i(5), floor(f(5.12)))
  is(i(9), floor(f(9.13)))
  is(i(17), floor(f(17)))
  is(i(17), floor(f(17.1)))
  is(i(18), floor(f(18.15)))
  is(i(39), floor(f(39.425)))
  is(i(42), floor(f(42)))
  is(i(46), floor(f(46.5)))
  is(i(65), floor(f(65.18)))
  is(i(1262), floor(f(1262.48)))

  is(i(0), floor(f(EPSILON)))
  is(i(-1), floor(f(EPSILON - 1)))
  is(i(1), floor(f(EPSILON + 1)))

  is(i(0), floor(f(SMALLEST)))
  is(i(-1), floor(f(SMALLEST - 1)))
  is(i(1), floor(f(SMALLEST + 1)))

  is(NothingI, floor(f(MINIMUM)))
  is(NothingI, floor(f(MAXIMUM)))
})
