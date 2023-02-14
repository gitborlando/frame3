declare module 'frame/core/index' {
  export * from 'frame/core/reactive';

}
declare module 'frame/core/reactive' {
  type ICallback = () => void;
  export function reactive<Val>(value: Val): {
      value: Val;
  };
  export function effect(cb: ICallback): void;
  export function computed<T extends any>(cb: () => T): {
      value: T;
  };
  export {};

}
declare module 'frame/index' {
  export * from 'frame/core/index';
  export * from 'frame/parse/index';

}
declare module 'frame/parse/index' {
  export * from 'frame/parse/parseCss';
  export * from 'frame/parse/parseJs';

}
declare module 'frame/parse/parseCss' {
  export const css = "\n\t\t.div {\n\t\t\twidth: (width + 2) px;\n\t\t\theight: 200px;\n\t\t\tbackground-color: gray;\n\t\t}\n";
  export const values: {
      width: number;
  };
  export const parseCss: (css: string) => void;

}
declare module 'frame/parse/parseJs' {
  import * as t from '@babel/types';
  import { ParseResult } from '@babel/parser';
  export const exposeValueMap: Map<string, any>;
  export function parseJs(js: string): string;
  export function parseLabel(ast: ParseResult<t.File>, env?: 'browser' | 'node'): void;

}
declare module 'frame/utils' {
  export const runningEnv: string;

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