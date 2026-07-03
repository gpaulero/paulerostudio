#!/bin/bash
# Start Next.js dev server, capture screenshots, stop server
set -e

cd /home/z/my-project

# Kill any existing next servers
pkill -f "next dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true
sleep 2

# Start dev server in background
npx next dev -p 3000 > /tmp/next-dev.log 2>&1 &
NEXT_PID=$!
echo "Started Next.js with PID $NEXT_PID"

# Wait for server to be ready (max 60s)
echo "Waiting for server to be ready..."
for i in $(seq 1 60); do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null || echo "000")
  if [ "$CODE" = "200" ]; then
    echo "Server ready after ${i}s (HTTP $CODE)"
    break
  fi
  sleep 1
done

# Trigger compilation of each demo route
echo "Warming up demo routes..."
for slug in parrilla-la-esquina estudio-fernandez-romero cabanas-del-lago; do
  for attempt in 1 2 3; do
    CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/demos/$slug" 2>/dev/null || echo "000")
    echo "  $slug attempt $attempt: $CODE"
    if [ "$CODE" = "200" ]; then break; fi
    sleep 3
  done
done

# Run playwright capture
echo "Running Playwright capture..."
node /home/z/my-project/scripts/capture-demos.js

# Stop dev server
echo "Stopping Next.js dev server (PID $NEXT_PID)..."
kill $NEXT_PID 2>/dev/null || true
sleep 2
pkill -f "next dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true

echo "DONE"
