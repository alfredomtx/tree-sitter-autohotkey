#!/bin/bash
set -e

VERSION=$(grep '^version' extension.toml | head -1 | sed 's/.*"\(.*\)"/\1/')
TAG="v$VERSION"

if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "Error: Tag $TAG already exists"
  exit 1
fi

echo "Creating tag $TAG..."
git tag "$TAG"
git push origin "$TAG"
echo "Done! Tag $TAG pushed. GitHub Action will create release and PR."
