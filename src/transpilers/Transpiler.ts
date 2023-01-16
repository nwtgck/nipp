export type Transpiler = {
  name: string,
  aceEditorMode: string,
  initLibrary: () => Promise<void>,
  getExecutableFunctionAndTranspiledJsCode: (rubyScript: string, enableTopLevelAwaitIfPossible: boolean) => Promise<{ executableFunction: Function, transpiledJsCode: string }>
};
