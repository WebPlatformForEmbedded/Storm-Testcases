#!/usr/bin/env node
const { execSync } = require('child_process')

const diffTree = execSync('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD')
  .toString()
  .trim()

const gitRoot = execSync('git rev-parse --show-toplevel')
  .toString()
  .trim()

if (diffTree.split('\n').filter(file => /package(-lock)?\.json/.test(file)).length) {
  execSync('npm install && npm prune', {
    stdio: 'inherit',
    cwd: gitRoot,
  })
}
