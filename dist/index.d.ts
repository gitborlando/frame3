declare module 'frame/core/component' {
  import { IComponentVnode } from 'frame/types';
  export function mountComponentVnode(componentVnode: IComponentVnode, parentDom: Element): void;
  export function passiveUpdateComponent(preVnode: IComponentVnode, currentVnode: IComponentVnode, parentDom: Element): void;

}
declare module 'frame/core/diff' {
  export {};

}
declare module 'frame/core/index' {
  export * from 'frame/core/component';
  export * from 'frame/core/diff';
  export * from 'frame/core/reactive';
  export * from 'frame/core/render-dom';
  export * from 'frame/core/vnode';

}
declare module 'frame/core/reactive' {
  type ICallback<T = any> = () => T;
  export function reactive<Val>(value: Val): {
      value: Val;
  };
  export function effect<T>(cb: ICallback<T>): T;
  export function computed<T>(cb: ICallback<T>): {
      value: T;
  };
  export {};

}
declare module 'frame/core/render-dom' {
  import { IElementVnode, ITextNodeVnode, IVnode } from 'frame/types';
  export function mountElement(elementVnode: IElementVnode, parentDom: Element): void;
  export function updateElement(preVnode: IElementVnode, currentVnode: IElementVnode, parentDom: Element): void;
  export function mountTextNode(textNodeVnode: ITextNodeVnode, parentDom: Element): void;
  export function updateTextNode(preVnode: IVnode, currentVnode: IVnode, parentDom: Element): void;

}
declare module 'frame/core/vnode' {
  import { IComponentVnode, IElementVnode, ITextNodeVnode, IVnode, IVnodeProps } from 'frame/types';
  /**
   * @description 生成 vnode 的函数
   * @param jsxTag jsx的tag, 比如div, App等
   * @param props 函数组件的props作为vnode的props
   * @param children jsx的子节点
   * @returns 返回vnode
   */
  export function h(jsxTag: 0, props: IVnodeProps, children: any[]): ITextNodeVnode;
  export function h(jsxTag: string, props: IVnodeProps, children: any[]): IElementVnode;
  export function h(jsxTag: Function, props: IVnodeProps, children: never[]): IComponentVnode;
  /**
   * @description 将类型为字符串和数字的child包裹成`h('textNode',{},[])`的形式
   * @param child vnode的children
   */
  export function wrapChildAsTextNode(child: IVnode): IVnode;
  /**
   * @description 从虚拟dom中创建真实dom节点并挂载到目标dom节点
   * @param vnode 虚拟dom对象
   * @param parentDom 真实dom节点
   * @returns
   */
  export function mountVnode(vnode: IVnode, parentDom: Element): void;
  export function updateVnode(preVnode: IVnode | null, currentVnode: IVnode, parentDom: Element): void;
  export function unmountVnode(vnode: IVnode): void;

}
declare module 'frame/index' {
  export const NAME = "frame";
  export * from 'frame/core/index';

}
declare module 'frame/parse/index' {
  export * from 'frame/parse/parseCss';
  export * from 'frame/parse/parseJs';
  export * from 'frame/parse/parseJsx';
  export * from 'frame/parse/parseLabel';

}
declare module 'frame/parse/parseCss' {
  export const parseCss: (css: string) => string;

}
declare module 'frame/parse/parseJs' {
  import * as t from '@babel/types';
  import { ParseResult } from '@babel/parser';
  export const additionalJsTexts: string[];
  export const reatciveIdentifers: Set<string>;
  export function parseJs(js: string): string;
  export function parseDotValue(ast: ParseResult<t.File>): ParseResult<t.File>;

}
declare module 'frame/parse/parseJsx' {
  import { NodePath } from '@babel/traverse';
  import * as t from '@babel/types';
  export const jsx = "\n<button className=\"btn\" onClick={() => a++}>\n    {a}\n</button>\n";
  export function parseJsx(ast: t.ExpressionStatement, path: NodePath<t.LabeledStatement>): void;

}
declare module 'frame/parse/parseLabel' {
  import * as t from '@babel/types';
  import { ParseResult } from '@babel/parser';
  export function parseLabelStatement(ast: ParseResult<t.File>): ParseResult<t.File>;

}
declare module 'frame/shared/babel-polyfill' {
  import _generate from '@babel/generator';
  export const babelTraverse: {
      <S>(parent: import("@babel/types").Node | import("@babel/types").Node[] | null | undefined, opts: import("@babel/traverse").TraverseOptions<S>, scope: import("@babel/traverse").Scope | undefined, state: S, parentPath?: import("@babel/traverse").NodePath<import("@babel/types").Node> | undefined): void;
      (parent: import("@babel/types").Node | import("@babel/types").Node[] | null | undefined, opts?: import("@babel/traverse").TraverseOptions<import("@babel/types").Node> | undefined, scope?: import("@babel/traverse").Scope | undefined, state?: any, parentPath?: import("@babel/traverse").NodePath<import("@babel/types").Node> | undefined): void;
      visitors: typeof import("@babel/traverse").visitors;
      verify: typeof import("@babel/traverse").visitors.verify;
      explode: typeof import("@babel/traverse").visitors.explode;
  };
  export const babelGenerate: typeof _generate;

}
declare module 'frame/shared/process-buffer-polyfill' {
  export const processAndBufferPolyfill: () => void;

}
declare module 'frame/shared/utils' {
  import { IComponentVnode, IElementVnode, ITextNodeVnode, IVnode } from 'frame/types';
  export const runningEnv: string;
  export const makeId: () => () => number;
  export const ApiName: {
      reactive: string;
      computed: string;
      effect: string;
      mount: string;
      setProperty: string;
  };
  export const getApiName: (apiName: keyof typeof ApiName) => string;
  export const is: {
      string: (obj: any) => obj is string;
      number: (obj: any) => obj is number;
      boolean: (obj: any) => obj is boolean;
      undefined: (obj: any) => obj is undefined;
      function: (obj: any) => obj is Function;
      object: (obj: any) => obj is object;
      array: (obj: any) => obj is any[];
  };
  export const vnodeIs: {
      component: (vnode: IVnode | null) => vnode is IComponentVnode;
      element: (vnode: IVnode | null) => vnode is IElementVnode;
      textNode: (vnode: IVnode | null) => vnode is ITextNodeVnode;
  };

}
declare module 'frame/types' {
  /** vnode类型 */
  export const VnodeType: {
      /** 元素节点类型 */
      element: "element";
      /** 文本节点类型 */
      textNode: "text_node";
      /** 组件节点类型 */
      component: "component";
      textChild: "textChild";
      arrayChildren: "arrayChildren";
  };
  /** jsx的tag标签, 可以是Fuction(组件), string(html标签), 0(document.createTextNode) */
  export type IVnodeJsxTag = Function | string | 0;
  export type IVnodeType = (typeof VnodeType)[keyof typeof VnodeType];
  export type IVnodeProps = Record<string, any>;
  /** 虚拟dom对象 */
  export interface IVnodeBase {
      /** tag标签 例如input Dialog等 可以是函数或者字符串 */
      jsxTag: IVnodeJsxTag;
      /** vnode的类型, 比如是dom节点还是组件或者其他啥的 */
      type: IVnodeType;
      props: IVnodeProps;
      children: any[];
      el: Element | Text | null;
      componentInstance: IComponentInstance | null;
      key: any;
  }
  export type IVnode = IComponentVnode | IElementVnode | ITextNodeVnode;
  export type IComponentVnode = Omit<IVnodeBase, 'jsxTag'> & {
      /** 类似App, Button等的组件function */
      jsxTag: Function;
  };
  export type IElementVnode = Omit<IVnodeBase, 'jsxTag' | 'el' | 'componentInstance'> & {
      /** dom的tag标签 */
      jsxTag: string;
      el: Element | null;
  };
  export type ITextNodeVnode = Omit<IVnodeBase, 'jsxTag' | 'el' | 'componentInstance'> & {
      /** dom的tag标签 */
      jsxTag: 0;
      el: Text | null;
  };
  export interface IComponentInstance {
      update(): void;
      isMounted: boolean;
      subVnode: IVnode;
  }

}
declare module 'frame/__tests__/parseJs.test' {
  export {};

}
declare module 'frame/__tests__/reactive.test' {
  export {};

}
declare module 'frame' {
  import main = require('frame/index');
  export = main;
}