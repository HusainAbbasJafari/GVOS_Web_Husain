# GVOS_Website

## Getting Started
First, run the development server:

```bash
npm install --legacy-peer-deps
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

npm install -g env-cmd

"build:test": "env-cmd -f .env.staging next build",
"build:live": "env-cmd -f .env.production next build",

## Code deployment // stop server before uploding code.
- pm2 stop gvos (Stop server )
- git pull (from main branch)
- npm install --legacy-peer-deps
- npm run clean
- npm run build
- pm2 start gvos