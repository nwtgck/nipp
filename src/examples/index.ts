import {Transpiler} from "@/transpilers/Transpiler";
import {Es2017Transpiler} from "@/transpilers/Es2017Transpiler";

export type Example = {
  readonly name: string,
  readonly transpier: Transpiler,
  readonly options: {
    clickRun: boolean,
    promiseWait: boolean,
    topLevelAwait: boolean,
  },
  readonly script: () => string | Promise<string>,
} | {
  readonly name: string,
  readonly transpier: Transpiler,
  readonly urlFragment: () => string | Promise<string>,
};

export const examples: readonly Example[] = [
  {
    name: "Text length",
    transpier: Es2017Transpiler,
    options: {
      clickRun: false,
      promiseWait: true,
      topLevelAwait: true,
    },
    script: () => `s.length`,
  },
  {
    name: "Load script from CDN",
    transpier: Es2017Transpiler,
    options: {
      clickRun: false,
      promiseWait: true,
      topLevelAwait: true,
    },
    script: () => `\
// Load lodash (dynamic <script src="...js">)
await nipp.loadScript("https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js");

const result = _.partition([1, 2, 3, 4], n => n % 2);

JSON.stringify(result);
`,
  },
  {
    name: "2048 Game",
    transpier: Es2017Transpiler,
    urlFragment: () => import("./2048Game").then(p => p.urlFragmentOf2048Game),
  }
];
