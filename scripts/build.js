const fs = require("fs");
const execSync = require("child_process").execSync;
const prettyBytes = require("pretty-bytes");
const gzipSize = require("gzip-size");

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: "inherit",
    env: Object.assign({}, process.env, extraEnv)
  });

console.log("\nBuilding UMD ...");
exec("rollup --config rollup.config.js", {
  BABEL_ENV: "production",
  NODE_ENV: "production"
});

const size = gzipSize.sync(fs.readFileSync("index.js"));
console.log("\ngzipped, the UMD build is %s", prettyBytes(size));
