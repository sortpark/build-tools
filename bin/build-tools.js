#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const buildTools = require(`../${pkg.main}`);

program.version(pkg.version, '-v, --version');
program
  .command('stage-release [newversion]')
  .description('Bump version and create a "release/[version]" branch')
  .action(buildTools.stageRelease);
program
  .command('release [tagmessage]')
  .description('Tag and merge the latest release into master')
  .action(buildTools.release)
program
  .command('publish-gh')
  .description('Push master and release branches to GitHub with tags')
  .action(buildTools.publishGH)
program.parse(process.argv);
