const execSync = require("child_process").execSync;

process.on('unhandledRejection', err => {
  throw err;
});

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: "inherit",
    env: Object.assign({}, process.env, extraEnv)
  });

console.log(`Building react-governor.`);
exec('npm run build');

const packageJSON = require("../package.json");
console.log('Pushing to npm repository');
exec('npm publish --access public');

console.log('Tagging branch');
exec(`git tag v${packageJSON.version}`);

console.log('Pushing to master');
exec('git push');
