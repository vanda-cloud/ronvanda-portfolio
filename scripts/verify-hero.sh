#!/usr/bin/env bash
# Verify the v2 scaffold + Hero section build cleanly, then launch the dev server.
#
# Usage:
#   ./scripts/verify-hero.sh           # install (if needed) + lint + typecheck + build, then start dev
#   ./scripts/verify-hero.sh --no-dev  # install + lint + typecheck + build only, skip starting the dev server

set -euo pipefail
cd "$(dirname "$0")/.."

START_DEV=true
for arg in "$@"; do
  if [ "$arg" = "--no-dev" ]; then
    START_DEV=false
  fi
done

if [ ! -d "node_modules" ]; then
  echo "==> Installing dependencies (first run)..."
  npm install
fi

echo "==> Lint..."
npm run lint

echo "==> Type-check..."
npm run typecheck

echo "==> Production build..."
npm run build

echo ""
echo "Build OK. Hero section, i18n (km/en/ja/zh), and dark/light theme compiled cleanly."

if [ "$START_DEV" = true ]; then
  echo "==> Starting dev server at http://localhost:3000 (Hero is the homepage)..."
  npm run dev
fi
