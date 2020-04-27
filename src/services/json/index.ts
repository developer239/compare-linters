import jsonDiff from 'json-diff'
import * as R from 'ramda'
import { IRules } from 'src/types'

export const mergeRules = (...rules: IRules[]) => R.mergeAll(rules)

export const compareRules = (left: IRules, right: IRules) => jsonDiff.diff(left, right)
