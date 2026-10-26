#!/usr/bin/env bash
# Nightly backup of the SQLite database and uploaded media. Keeps 14 days.
set -euo pipefail
APP=/var/www/ai742
DEST=$APP/backups
STAMP=$(date +%Y-%m-%d_%H%M)
mkdir -p "$DEST"
sqlite3 "$APP/data/ai742.db" ".backup '$DEST/ai742_$STAMP.db'"
tar -czf "$DEST/media_$STAMP.tar.gz" -C "$APP" media
find "$DEST" -type f \( -name '*.db' -o -name '*.tar.gz' \) -mtime +14 -delete
echo "Backup complete: $STAMP"
