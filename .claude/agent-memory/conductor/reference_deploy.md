---
name: reference-deploy
description: How the Retro-Source shop is deployed — gabServer Docker image built from ~/retro-source-build, no git/CI on the server
metadata:
  type: reference
---

Shop is live at https://retro-source.net: Cloudflare → Caddy (Docker) → container `retro-source` (nginx:alpine) on **gabServer 192.168.2.135**.
SSH: `ssh -o IdentitiesOnly=yes -i ~/.ssh/server_getrich gabriel@192.168.2.135` (check `hostname` = gabServer; .137 is a Pi).

- No CI, no git on the server. Image `retro-source:latest` is built from `~/retro-source-build/` (holds a copied `dist/` + Dockerfile).
- Compose: `~/serveur_websites/sites/retro-source/docker-compose.yml` runs the image on the external `web` network.
- Deploy = `npm run build` locally → copy `dist/`, `Dockerfile`, `nginx.conf` to `~/retro-source-build` → `docker build -t retro-source:latest .` → `docker compose up -d` in the sites folder. No Caddy restart needed.
- `www.` redirects to apex, so mAgIc CORS only needs `https://retro-source.net`.
- Deploying/pushing is the user's action (outside conductor boundary); reading server files over SSH was denied by the permission classifier.

**Why:** user forgot how he deploys (2026-09-26). **How to apply:** hand him these commands; don't redo the discovery.
