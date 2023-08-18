import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import nodeExternals from "rollup-plugin-node-externals";
// import dts from "rollup-plugin-dts";
const config = [
  {
    input: "src/index.ts",
    output: {
      file: "build/bundle.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      nodeExternals({
        deps: false,
        devDeps: true,
      }),
      resolve(),
      commonjs(),
      typescript({
        compilerOptions: {
          noEmitOnError: true,
        },
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
];
export default config;
