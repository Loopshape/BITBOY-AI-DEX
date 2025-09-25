# ===============================
# Update README with git changelog + repo tree
# ===============================
echo "📚 Updating README.md with changelog + repo structure..."

# Grab last 5 commits
CHANGELOG=$(git log -n 5 --pretty=format:"- %ad: %s" --date=short)

# Generate repo tree
TREE_OUTPUT=$(find . -maxdepth 4 -not -path '*/\.*' | sort | sed 's|^\./||')

awk -v changelog="$CHANGELOG" -v tree="$TREE_OUTPUT" '
BEGIN {printedChangelog=0; printedTree=0; skip=0}
{
  if ($0 ~ /^## Changelog/) {
    print "## Changelog"
    print changelog
    printedChangelog=1
    skip=1
    next
  }
  if ($0 ~ /^## Repo Structure/) {
    print "## Repo Structure\n```\n" tree "\n```"
    printedTree=1
    skip=1
    next
  }
  if (skip && /^```$/) { skip=0; next }
  if (!skip) print
}
END {
  if (!printedChangelog) {
    print "\n## Changelog"
    print changelog
  }
  if (!printedTree) {
    print "\n## Repo Structure\n```\n" tree "\n```"
  }
}
' README.md > README.md.tmp && mv README.md.tmp README.md

echo "✅ README.md updated with changelog + repo tree"
