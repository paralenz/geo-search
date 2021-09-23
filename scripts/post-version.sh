#!/usr/bin/env bash

PACKAGE_VERSION=$(cat package.json | grep \\\"version\\\" | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]') 

yarn install

echo 'Generating typings'
yarn build

echo "🔖 Creating tag for \"$PACKAGE_VERSION\""
git add .
git commit -m "🔖 Bump version /"$PACKAGE_VERSION/""
git tag $PACKAGE_VERSION
git push --tags
git push