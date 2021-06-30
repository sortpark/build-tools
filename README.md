# @sortpark/build-tools

A collection of build tools for managing repositories on GitHub and npm.

## Installation

Using npm:

```sh
npm install --save-dev @sortpark/build-tools
```

## Usage

`build-tools` is intended to be used as a CLI tool, though it may also be imported as an ES6 or CommonJS module.
It has these sub-commands:

- `stage-release [newversion]`: Bumps npm version and creates a new branch, e.g. "release/v0.1.0". The optional [newversion] may be one of `major`, `minor`, or `patch` (default).
- `release [tagmessage]`: Runs `npm run build`, commits, tags with the version number, and merges into `master`. The optional [tagmessage] will be joined with the build number and used to annotate the tag.
- `publish-gh`: Pushes master and release branches to GitHub with all tags.

### Using with npm

Add scripts to your `package.json` to call `build-tools`:

```json
  "scripts": {
    "stage-release": "build-tools stage-release",
    "release": "build-tools release",
    "publish-gh": "build-tools publish-gh"
  }
```

Then run the script, adding any extra arguments (e.g. `minor` below):

```sh
npm run stage-release minor
```

### Configuration

`build-tools` uses the following environment variables to configure its behaviour:

- `BUILDTOOLS_VERSION_PREFIX`: Adds a prefix to the version number, e.g. "v" to produce versions like `v0.1.0`. Defaults to "".

These variables can be defined by creating a file named `.env` at your project's root (see `.env.sample` and [dotenv](https://www.npmjs.com/package/dotenv) for more info).

## Future devel

These features may be added in the future:

- configurable main branch naming
- option to delete feature branches after merging to main branch
