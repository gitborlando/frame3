import _generate from '@babel/generator'
import _template from '@babel/template'
import _traverse from '@babel/traverse'
import { isBrowser, NAME } from '../shared/utils'

export const babelTraverse = (_traverse as any).default as typeof _traverse
export const babelGenerate = (_generate as any).default as typeof _generate
export const babelTemplate = (_template as any).default as typeof _template

export const uuid = () => Math.random().toString(36).slice(2, 12)

export const requiredFrameApis = new Set<keyof typeof FrameApi>()

export const reatciveIdentifers = new Set<string>()

export const propIdentifiers = new Set<string>()

export const parseState = { toMountElementSelector: '' as any, hasJsx: false, isInJsx: false }

export const FrameApi = isBrowser()
  ? {
      h: `${NAME}.h` as const,
      reactive: `${NAME}.reactive` as const,
      computed: `${NAME}.computed` as const,
      effect: `${NAME}.effect` as const,
      mount: `${NAME}.mount` as const,
    }
  : {
      h: '$_h' as const,
      reactive: '$_reactive' as const,
      computed: '$_computed' as const,
      effect: '$_effect' as const,
      mount: '$_mount' as const,
    }
