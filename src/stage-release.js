import { exec, getVersion, getReleaseBranch } from './utils';

// Bump version using NPM (only affects package*.json, doesn't commit).
function bumpVersion(newversion) {
  console.log('Bumping version number.');
  return exec(`npm --no-git-tag-version version ${newversion}`);
}

// Stage a release (bump version and create a 'release/[version]' branch).
export async function stageRelease(newversion) {
  await bumpVersion(newversion || 'patch');

  console.log('Creating release branch and committing changes.');
  return exec(`git checkout -b ${getReleaseBranch()} && git add -A && git commit -m "Prepare release ${getVersion()}"`);
}
