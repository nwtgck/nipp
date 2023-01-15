const MonocoEditorPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  // (from: https://cli.vuejs.org/config/#publicpath)
  publicPath: "./",
  configureWebpack: {
    plugins: [
      // (from: https://github.com/microsoft/monaco-editor/blob/212670ceb460441b3ebed29e6ca30aa1e9bdde85/docs/integrate-esm.md#option-1-using-the-monaco-editor-webpack-plugin)
      new MonocoEditorPlugin(),
    ]
  }
}
