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
  export const NAME = "frame";
  export * from 'frame/core/index';
  export * from 'frame/parse/index';

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
  export function parseJsx(): void;

}
declare module 'frame/parse/parseLabel' {
  import * as t from '@babel/types';
  import { ParseResult } from '@babel/parser';
  export function parseLabelStatement(ast: ParseResult<t.File>): ParseResult<t.File>;

}
declare module 'frame/utils' {
  export const runningEnv: string;

}
declare module 'frame/__tests__/parseJsx.test' {
  export {};

}
declare module 'frame/__tests__/reactive.test' {
  export {};

}
declare module 'frame' {
  import main = require('frame/index');
  export = main;
}