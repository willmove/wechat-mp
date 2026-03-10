#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="$(cd "$(dirname "$0")" && pwd)"
DEST_DIR="/var/www/wechat-mp"

rsync -av --delete \
  --exclude '.git/' \
  --exclude '.gitignore' \
  --exclude 'README.md' \
  --exclude 'deploy.sh' \
  "$SRC_DIR/" "$DEST_DIR/"

echo "Deployed to $DEST_DIR"
