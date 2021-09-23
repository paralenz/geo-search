#!/usr/bin/env bash

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$BRANCH" != "master" ]]; then
  echo '🔥 Aborting script';
  echo '🔥 This script can only be run on the master branch';
  exit 1;
fi

echo '✅ git branch is master. Continuing'

git pull

yarn install
yarn build
yarn lint

echo '✅ All good!'