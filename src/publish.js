import { exec, getReleaseBranch } from './utils';

export function publishGH() {
  return exec(`git push --follow-tags origin master ${getReleaseBranch()}`);
}
