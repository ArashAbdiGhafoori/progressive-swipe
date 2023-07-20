import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-ts";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "./src/main.ts",
    output: {
      dir: "./lib/",
      format: "es",
    },
    plugins: [
      nodeResolve(),
      // typescript({
      //   module: "es6",
      //   allowJs: true,
      //   sourceMap: !production,
      //   inlineSources: !production,
      //   noImplicitAny: true,
      //   compilerOptions: {
      //     declaration: true,
      //     declarationMap: true,
      //     outDir: "./lib/",
      //   },
      // }),
      ts({ tsconfig: production ? "tsconfig.json" : "tsconfig.json" }),
    ],
  },
];
