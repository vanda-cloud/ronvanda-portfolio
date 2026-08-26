#!/usr/bin/env bash
# Runs `next dev` against a chosen environment's .env file.
# Usage: npm run dev -- [dev|uat|prod]   (defaults to dev)
set -euo pipefail

ENV_NAME="${1:-dev}"

case "$ENV_NAME" in
  dev|uat|prod) ;;
  *)
    echo "Unknown environment '$ENV_NAME'. Usage: npm run dev -- [dev|uat|prod]" >&2
    exit 1
    ;;
esac

ENV_FILE=".env.${ENV_NAME}"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE" >&2
  exit 1
fi

echo "▶ next dev — using $ENV_FILE"
exec npx dotenv -e "$ENV_FILE" -- next dev
