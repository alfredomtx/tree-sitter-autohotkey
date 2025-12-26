#!/bin/bash
set -e

for query in languages/autohotkey/*.scm; do
    echo "Validating $(basename "$query")..."
    tree-sitter query "$query" test.ahk --quiet
done

echo "All query files valid."
