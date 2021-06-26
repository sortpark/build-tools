import { promisify } from 'util';
import { exec as execOrig } from 'child_process';
import { readFileSync } from 'fs';

export const exec = promisify(execOrig);

export function getVersion() {
  // Uses readFileSync() instead of require() to prevent caching of values.
  const pkg = JSON.parse(readFileSync('./package.json'));
  return pkg.version;
}

export function getReleaseBranch() {
  return `release-${getVersion()}`;
}
