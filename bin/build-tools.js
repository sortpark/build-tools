#!/usr/bin/env node

const { program } = require('commander');
const buildTools = require('../dist/build-tools.cjs.js');
const pkg = require('../package.json');

program.version(pkg.version, '-v, --version');
program
  .command('stage-release [newversion]')
  .description('Bump version and create a "release/[version]" branch')
  .action(buildTools.stageRelease);
program.parse(process.argv);
