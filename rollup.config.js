import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

process.env.NODE_ENV = "production";

const config = {
  input: "src/index.ts",
  output: {
    name: "ReactGovernor",
    globals: {
      react: "React",
      "react-dom": "ReactDOM"
    },
    format: "umd",
    file: "index.ts"
  },
  external: ["react", "react-dom"],
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    uglify()
  ]
};

export default config;
