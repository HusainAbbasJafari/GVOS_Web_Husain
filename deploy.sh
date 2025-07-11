#!/bin/bash

set -e

# Manually load NVM + Node
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 22.14

APP_NAME="gvos"
APP_DIR="/home/gvossites/public_html/GvosSite/GVOS_Website"
TEMP_DIR="$APP_DIR/temp-build/temp-build"
BACKUP_DIR="$APP_DIR/backup"

echo "🔁 Stopping PM2 app: $APP_NAME..."
pm2 stop $APP_NAME

echo "📦 Backing up current .next..."
rm -rf "$BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
mv "$APP_DIR/.next" "$BACKUP_DIR/.next"

echo "🆕 Deploying new .next..."
mv "$TEMP_DIR/.next" "$APP_DIR/.next"

echo "🚀 Starting PM2 app: $APP_NAME..."
pm2 start $APP_NAME

# Wait a few seconds to allow app to boot
sleep 15

# Check PM2 status
APP_STATUS=$(pm2 list | grep "$APP_NAME" | awk '{print $9}')

if [[ "$APP_STATUS" == "errored" ]]; then
  echo "❌ PM2 app is in errored state. Rolling back..."
  rm -rf "$APP_DIR/.next"
  mv "$BACKUP_DIR/.next" "$APP_DIR/.next"
  pm2 start $APP_NAME
  echo "✅ Rollback to previous build completed!"
else
  echo "✅ Deployment successful. Cleaning up..."
  rm -rf "$BACKUP_DIR" "$TEMP_DIR"
fi
