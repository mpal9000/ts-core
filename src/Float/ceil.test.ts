import test from 'ava'
import {
  MI,
  MNPI,
  MNNI,
  MPI,
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
import { ceil } from './ceil.js'

test('ceil()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(i(2), isType<MI>()(ceil(f(1.1))))
  is(i(-1), isType<MNPI>()(ceil(nf(-1.1))))
  is(i(-0), isType<MNPI>()(ceil(npf(-0.1))))
  is(i(1), isType<MNNI>()(ceil(nnf(0.1))))
  is(i(2), isType<MPI>()(ceil(pf(1.1))))

  is(i(2), isType<MI>()(ceil(mf(1.1))))
  is(i(-1), isType<MNPI>()(ceil(mnf(-1.1))))
  is(i(-0), isType<MNPI>()(ceil(mnpf(-0.1))))
  is(i(1), isType<MNNI>()(ceil(mnnf(0.1))))
  is(i(2), isType<MPI>()(ceil(mpf(1.1))))

  is(NothingI, isType<NothingI>()(ceil(NothingF)))

  is(i(-1262), ceil(f(-1262.48)))
  is(i(-65), ceil(f(-65.18)))
  is(i(-46), ceil(f(-46.5)))
  is(i(-42), ceil(f(-42)))
  is(i(-39), ceil(f(-39.425)))
  is(i(-18), ceil(f(-18.15)))
  is(i(-17), ceil(f(-17.1)))
  is(i(-17), ceil(f(-17)))
  is(i(-9), ceil(f(-9.13)))
  is(i(-5), ceil(f(-5.12)))
  is(i(-4), ceil(f(-4.6)))
  is(i(-4), ceil(f(-4.5)))
  is(i(-3), ceil(f(-3.9)))
  is(i(-3), ceil(f(-3.5)))
  is(i(-3), ceil(f(-3.1)))
  is(i(-3), ceil(f(-3)))
  is(i(-2), ceil(f(-2.9)))
  is(i(-2), ceil(f(-2.5)))
  is(i(-2), ceil(f(-2.26)))
  is(i(-2), ceil(f(-2.1755465135353)))
  is(i(-2), ceil(f(-2.175495134384)))
  is(i(-2), ceil(f(-2.1753543549)))
  is(i(-2), ceil(f(-2.1)))
  is(i(-2), ceil(f(-2)))
  is(i(-1), ceil(f(-1.9)))
  is(i(-1), ceil(f(-1.5)))
  is(i(-1), ceil(f(-1.4999999999999998)))
  is(i(-1), ceil(f(-1.45)))
  is(i(-1), ceil(f(-1.34)))
  is(i(-1), ceil(f(-1.123456789)))
  is(i(-1), ceil(f(-1.1)))
  is(i(-1), ceil(f(-1.015)))
  is(i(-1), ceil(f(-1.005)))
  is(i(-1), ceil(f(-1.0049999)))
  is(i(-1), ceil(f(-1)))
  is(i(-0), ceil(f(-0.9)))
  is(i(-0), ceil(f(-0.6)))
  is(i(-0), ceil(f(-0.5000000000000001)))
  is(i(-0), ceil(f(-0.5)))
  is(i(-0), ceil(f(-0.49999999999999994)))
  is(i(-0), ceil(f(-0.4)))
  is(i(-0), ceil(f(-0.2)))
  is(i(-0), ceil(f(-0.1)))
  is(i(-0), ceil(f(-0.014999999999999999)))
  is(i(-0), ceil(f(-0.01499999999999999)))
  is(i(-0), ceil(f(-0.0000001)))
  is(i(-0), ceil(f(-1e-8)))
  is(i(-0), ceil(f(-0)))
  is(i(0), ceil(f(0)))
  is(i(1), ceil(f(1e-8)))
  is(i(1), ceil(f(0.0000001)))
  is(i(1), ceil(f(0.01499999999999999)))
  is(i(1), ceil(f(0.014999999999999999)))
  is(i(1), ceil(f(0.1)))
  is(i(1), ceil(f(0.2)))
  is(i(1), ceil(f(0.4)))
  is(i(1), ceil(f(0.49999999999999994)))
  is(i(1), ceil(f(0.5)))
  is(i(1), ceil(f(0.5000000000000001)))
  is(i(1), ceil(f(0.6)))
  is(i(1), ceil(f(0.9)))
  is(i(1), ceil(f(1)))
  is(i(2), ceil(f(1.0049999)))
  is(i(2), ceil(f(1.005)))
  is(i(2), ceil(f(1.015)))
  is(i(2), ceil(f(1.1)))
  is(i(2), ceil(f(1.123456789)))
  is(i(2), ceil(f(1.34)))
  is(i(2), ceil(f(1.45)))
  is(i(2), ceil(f(1.4999999999999998)))
  is(i(2), ceil(f(1.5)))
  is(i(2), ceil(f(1.9)))
  is(i(2), ceil(f(2)))
  is(i(3), ceil(f(2.1)))
  is(i(3), ceil(f(2.1753543549)))
  is(i(3), ceil(f(2.175495134384)))
  is(i(3), ceil(f(2.1755465135353)))
  is(i(3), ceil(f(2.26)))
  is(i(3), ceil(f(2.5)))
  is(i(3), ceil(f(2.9)))
  is(i(3), ceil(f(3)))
  is(i(4), ceil(f(3.1)))
  is(i(4), ceil(f(3.5)))
  is(i(4), ceil(f(3.9)))
  is(i(5), ceil(f(4.5)))
  is(i(5), ceil(f(4.6)))
  is(i(6), ceil(f(5.12)))
  is(i(10), ceil(f(9.13)))
  is(i(17), ceil(f(17)))
  is(i(18), ceil(f(17.1)))
  is(i(19), ceil(f(18.15)))
  is(i(40), ceil(f(39.425)))
  is(i(42), ceil(f(42)))
  is(i(47), ceil(f(46.5)))
  is(i(66), ceil(f(65.18)))
  is(i(1263), ceil(f(1262.48)))

  is(i(1), ceil(f(EPSILON)))
  is(i(-0), ceil(f(EPSILON - 1)))
  is(i(2), ceil(f(EPSILON + 1)))

  is(i(1), ceil(f(SMALLEST)))
  is(i(-1), ceil(f(SMALLEST - 1)))
  is(i(1), ceil(f(SMALLEST + 1)))

  is(NothingI, ceil(f(MINIMUM)))
  is(NothingI, ceil(f(MAXIMUM)))
})
