import { compare } from 'src/services/rules'
import { CustomType, STRVType } from 'src/types'

const result = compare(STRVType.base, CustomType.base)
// const result = compare(STRVType.react, CustomType.react)
// const result = compare(STRVType.reactNative, CustomType.reactNative)
// const result = compare(STRVType.node, CustomType.node)
// const result = compare(STRVType.typescript, CustomType.typescript)

console.log('result', result)
