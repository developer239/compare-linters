/* eslint-disable security/detect-non-literal-require,security/detect-object-injection,no-underscore-dangle */

import { compareRules, mergeRules } from 'src/services/json'
import { CustomType, DiffType, IDiffResult, STRVType } from 'src/types'

export const loadRules = (path: string) => require(path).rules

export const findRulesByDiff = (diffResult: IDiffResult, type: DiffType) => {
  const rules = []

  for (const key of Object.keys(diffResult)) {
    if (key.endsWith(type)) {
      const rule = key.replace(type, '')
      rules.push({
        name: rule,
        value: diffResult[key],
      })
    }
  }

  return rules
}

export const findRuleChanges = (diffResult: IDiffResult) => {
  const rules = []

  for (const key of Object.keys(diffResult)) {
    const diff = diffResult[key]

    if (
      !key.endsWith(DiffType.added)
      && !key.endsWith(DiffType.deleted)
    ) {
      if (Array.isArray(diff)) {
        const before = diff.filter(item => {
          return item[0] === '-' || item[0] === ' '
        }).map(item => item[1]).join(', ')
        const after = diff.filter(item => {
          return item[0] === '+' || item[0] === ' '
        }).map(item => item[1]).join(', ')

        rules.push({
          name: key,
          old: before,
          value: after,
        })
      } else {
        rules.push({
          name: key,
          old: diff.__old,
          value: diff.__new,
        })
      }
    }
  }

  return rules
}

export const loadSTRVRules = (type: STRVType) => {
  const base = loadRules(`src/repositories/code-quality-tools-master/packages/${type}/index.js`)
  const optional = loadRules(`src/repositories/code-quality-tools-master/packages/${type}/optional.js`)
  const style = loadRules(`src/repositories/code-quality-tools-master/packages/${type}/style.js`)

  return mergeRules(base, optional, style)
}

export const loadCustomRules = (type: CustomType) =>
  loadRules(`src/repositories/${type}/index.js`)

export const compare = (
  strvType: STRVType,
  customType: CustomType,
) => {
  const strvRules = loadSTRVRules(strvType)
  const customRules = loadCustomRules(customType)

  const result = compareRules(strvRules, customRules)

  const toAdd = findRulesByDiff(result, DiffType.added)
  const toDelete = findRulesByDiff(result, DiffType.deleted)
  const toChange = findRuleChanges(result)

  return {
    toAdd,
    toDelete,
    toChange,
  }
}
