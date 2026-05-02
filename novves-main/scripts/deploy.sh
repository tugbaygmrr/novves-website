#!/usr/bin/env bash
# Depo kökünden veya sadece novves-main repo ise çalışır; build + PM2 yenileme.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$APP_DIR/.." && pwd)"

if [ -d "$REPO_ROOT/.git" ]; then
  (cd "$REPO_ROOT" && git pull --ff-only)
elif [ -d "$APP_DIR/.git" ]; then
  (cd "$APP_DIR" && git pull --ff-only)
else
  echo "deploy: Bu dizinlerde .git bulunamadı: $REPO_ROOT veya $APP_DIR" >&2
  exit 1
fi

cd "$APP_DIR"
npm ci
npm run build
pm2 startOrReload ecosystem.config.cjs --update-env

echo "deploy: Bitti. Kontrol: pm2 list  |  Log: pm2 logs novves"
