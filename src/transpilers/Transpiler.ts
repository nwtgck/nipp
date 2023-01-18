export type Transpiler = {
  readonly id: symbol,
  readonly name: string,
  initLibrary: () => Promise<void>,
  readonly getExecutableFunctionAndTranspiledJsCode: (rubyScript: string, enableTopLevelAwaitIfPossible: boolean) => Promise<{ executableFunction: Function, transpiledJsCode: string }>
};
