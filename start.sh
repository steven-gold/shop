#!/bin/bash
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

cd "$ROOT/backend"
if [ ! -d node_modules ]; then
  npm install
fi

cd "$ROOT/frontend"
if [ ! -d node_modules ]; then
  npm install
fi

cd "$ROOT/backend"
node server.js &
BACKEND_PID=$!

trap 'kill $BACKEND_PID' EXIT

cd "$ROOT/frontend"
npm run dev
