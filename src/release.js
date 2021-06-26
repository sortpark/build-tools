import { exec, getVersion, getReleaseBranch } from './utils';

// Build, commit, and tag the release branch with its release version.
async function buildCommitTag(tagmessage) {
  console.log('Running build process in release branch.');
  await exec(`git checkout ${getReleaseBranch()} && npm run build`);

  const version = getVersion();
  const fullTagMessage = tagmessage ? `${version} ${tagmessage}` : version;

  console.log('Adding all changes and performing final commit.');
  await exec(`git add -A && git commit --allow-empty -m "Build ${version}"`);

  console.log('Tagging with provided tag message.');
  return exec(`git tag -a ${version} -m "${fullTagMessage}"`);
}

// Merge the specified branch back into master.
function mergeBranch(branch) {
  console.log('Merging release into master.')
  return exec(`git checkout master && git merge --no-ff --no-edit ${branch}`);
}

// Tag and merge the latest release into master.
export async function release(tagmessage) {
  await buildCommitTag(tagmessage || '');
  await mergeBranch(getReleaseBranch());

  // console.log('Deleting release branch.');
  // return exec(`git branch -d ${getReleaseBranch()}`);
}
