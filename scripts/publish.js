const execSync = require("child_process").execSync;

process.on('unhandledRejection', err => {
  throw err;
});

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: "inherit",
    env: Object.assign({}, process.env, extraEnv)
  });

const execOut = (command, extraEnv) =>
  execSync(command, {
    stdio: "pipe",
    env: Object.assign({}, process.env, extraEnv)
  }).toString('utf8').trim();

const branch = execOut('git rev-parse --symbolic-full-name --abbrev-ref HEAD');

if (branch !== 'master') {
  console.log('You must be on branch "master" to run: npm run publish');
  process.exit(1);
}

const bump = process.argv[3];

if (!bump || !['major', 'minor', 'patch'].includes(bump)) {
  console.log(`Please pass (major|minor|patch) as an argument.`);
  console.log(`example: npm run publish minor`);
  process.exit(1);
}

console.log('Making sure we have the latest master changes.');
exec('git pull');

console.log(`Creating new ${bump} version of react-governor.`);
exec('npm run build');

// This will fail and exit if the git working directory is not clean
// This updates and commits the package.json
console.log('Updating package.json');
exec(`npm version ${bump}`);

const packageJSON = require("../package.json");
console.log('Pushing to npm repository');
exec('npm publish --access public');

console.log('Tagging branch');
exec(`git tag v${packageJSON.version}`);

console.log('Pushing to master');
exec('git push');
