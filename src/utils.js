import { promisify } from 'util';
import { exec as execOrig } from 'child_process';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export const exec = promisify(execOrig);

export function getVersion() {
  // Uses readFileSync() instead of require() to prevent caching of values.
  const pkg = JSON.parse(readFileSync('./package.json'));
  const prefix = process?.env?.BUILDTOOLS_VERSION_PREFIX || '';
  return `${prefix}${pkg.version}`;
}

export function getReleaseBranch() {
  return `release-${getVersion()}`;
}
