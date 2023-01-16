import {type PluginObj, type NodePath, type Node} from "@babel/core";
import {type Transpiler} from "@/transpilers/Transpiler";
const BabelAsync = () => import("@babel/standalone");


interface ExpressionStatement {
  type: "ExpressionStatement";
  expression: Node;
}

// Use eval because of Babel
const AsyncFunction = eval('Object.getPrototypeOf(async function() {}).constructor');

const nippSupport = {
  loadScript(src: string) {
    const script = document.querySelector(`script[src="${src}"]`);
    // If already appended
    if (script !== null) {
      return;
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  },
};

const lastReturnBabelPlugin: (b: any) => PluginObj = (() => {
  // Find last expression statement
  let lastExpressionStatementPath: NodePath<ExpressionStatement> | undefined;
  return (b: any) => ({
    visitor: {
      ExpressionStatement(path) {
        if (!path.findParent((p) => p.isFunction())) {
          lastExpressionStatementPath = path;
        }
      },
    },
    post(file) {
      if (lastExpressionStatementPath !== undefined) {
        // Attach "return" to the last statement. (e.g. 10 → return 10;)
        lastExpressionStatementPath.replaceWith(b.types.returnStatement(lastExpressionStatementPath.node.expression));
      }
    }
  } satisfies PluginObj);
})();

export const Es2017Transpiler: Transpiler = {
  name: "ES2017",
  initLibrary: () => Promise.resolve(),
  getExecutableFunctionAndTranspiledJsCode: async (script: string, enableTopLevelAwaitIfPossible: boolean) => {
    const Babel = await BabelAsync();
    const presets = ["es2017"];
    // Transpile
    const code = Babel.transform(script, {
      presets,
      plugins: [ lastReturnBabelPlugin ],
    }).code!;
    const executableFunction = enableTopLevelAwaitIfPossible ? new AsyncFunction("nipp", "s", code) : new Function("nipp", "s", code);
    return {
      executableFunction: () => {
        // (NOTE: `INPUT` will be pure JavaScript string variable)
        return executableFunction(nippSupport, (window as any).INPUT);
      },
      transpiledJsCode: code
    };
  }
};

export const FuncEs2017Transpiler: Transpiler = {
  name: "ES2017 with Function",
  initLibrary: () => Promise.resolve(),
  getExecutableFunctionAndTranspiledJsCode: async (script: string, enableTopLevelAwaitIfPossible: boolean) => {
    const Babel = await BabelAsync();
    // Transpile
    const code = Babel.transform(script, {presets: ["es2017"]}).code!;
    // Generate executable function
    const executableFunction = new Function("nipp", "s", code);
    return {
      executableFunction: () => {
        // Use javascript global variable "INPUT"
        // (NOTE: `INPUT` will be pure JavaScript string variable)
        executableFunction(nippSupport, (window as any).INPUT);
      },
      transpiledJsCode: code
    };
  }
};
