#!/usr/bin/env bash
# Re-vendor project skills from anthropics/skills.
# Usage: update-skills.sh [ref]   (default: the commit pinned in README.md)
set -euo pipefail

SKILLS=(frontend-design mcp-builder theme-factory web-artifacts-builder)
DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PINNED="$(grep -oE '^ *commit  *[0-9a-f]{40}' "$DEST/README.md" | grep -oE '[0-9a-f]{40}')"
REF="${1:-$PINNED}"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

git -C "$WORK" init -q
git -C "$WORK" remote add origin https://github.com/anthropics/skills.git
git -C "$WORK" sparse-checkout init --cone
git -C "$WORK" sparse-checkout set "${SKILLS[@]/#/skills/}"

if [[ "$REF" =~ ^[0-9a-f]{40}$ ]]; then
  git -C "$WORK" fetch -q --depth 1 origin "$REF"
else
  git -C "$WORK" fetch -q --depth 1 origin "$REF"
fi
git -C "$WORK" checkout -q FETCH_HEAD

SHA="$(git -C "$WORK" rev-parse HEAD)"
DATE="$(git -C "$WORK" log -1 --format=%cs HEAD)"

for s in "${SKILLS[@]}"; do
  [ -d "$WORK/skills/$s" ] || { echo "missing upstream skill: $s" >&2; exit 1; }
  rm -rf "${DEST:?}/$s"
  cp -r "$WORK/skills/$s" "$DEST/"
  echo "vendored $s"
done

python3 - "$DEST/README.md" "$SHA" "$DATE" <<'PY'
import re, sys
path, sha, date = sys.argv[1], sys.argv[2], sys.argv[3]
with open(path) as f:
    s = f.read()
s = re.sub(r'(^ *commit  +)[0-9a-f]{40}', r'\g<1>' + sha, s, flags=re.M)
s = re.sub(r'(^ *dated   +)\S+', r'\g<1>' + date, s, flags=re.M)
with open(path, 'w') as f:
    f.write(s)
PY

echo
echo "pinned at $SHA ($DATE)"
echo "review with: git diff --stat .claude/skills"
