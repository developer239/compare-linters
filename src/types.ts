export enum STRVType {
  base = 'eslint-config-base',
  node = 'eslint-config-node',
  react = 'eslint-config-react',
  reactNative = 'eslint-config-react-native',
  typescript = 'eslint-config-typescript',
}

export enum CustomType {
  base = 'eslint-config-base-master',
  node = 'eslint-config-node-master',
  react = 'eslint-config-react-master',
  reactNative = 'eslint-config-react-native-master',
  typescript = 'eslint-config-typescript-master',
}

export enum DiffType {
  added = '__added',
  deleted = '__deleted',
}

export type IDiffResult = any

export interface IRules {
  [key: string]: string | number | []
}
