const { defineConfig } = require('@vue/cli-service');
const MonocoEditorPlugin = require('monaco-editor-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  // (from: https://cli.vuejs.org/config/#publicpath)
  publicPath: "./",
  pwa: {
    workboxOptions: {
      // NOTE: The size of ts.worker.js in monaco-editor is over maximumFileSizeToCacheInBytes default value
      maximumFileSizeToCacheInBytes: Number.MAX_SAFE_INTEGER,
    },
  },
  configureWebpack: {
    plugins: [
      // (from: https://github.com/microsoft/monaco-editor/blob/212670ceb460441b3ebed29e6ca30aa1e9bdde85/docs/integrate-esm.md#option-1-using-the-monaco-editor-webpack-plugin)
      new MonocoEditorPlugin(),
    ]
  }
});
