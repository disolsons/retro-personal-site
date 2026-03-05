# 🌈 Retro 90's Personal Website

A personal homepage built with **React.js** and a classic 90's aesthetic: neon colors, marquee, pixel-style fonts, and that nostalgic vibe.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Photography gallery (upload)

The gallery uses a small Node API with SQLite. Run it in a **second terminal**:

```bash
cd server && npm install && npm run dev
```

Then run the frontend with `npm run dev` (from the project root). The app proxies `/api` and `/uploads` to the server (port 3000). You can upload and delete photos on the Photography page; images are stored in `server/uploads/photos/` and metadata in `server/photos.db`.

## Git

To turn this into a git repo (requires [Git](https://git-scm.com/) installed):

```bash
git init
git add .
git commit -m "Initial commit: retro personal site with photography gallery"
```

Remote (e.g. GitHub): add the remote and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/retro-personal-site.git
git branch -M main
git push -u origin main
```

## Build for production

```bash
npm run build
npm run preview
```

## What's inside

- **Home** – Welcome and “under construction” vibe
- **About Me** – Short bio and skills
- **Links** – Cool links section (edit `src/pages/Links.jsx`)
- **Guestbook** – Sign and read messages (state resets on refresh)

Edit `src/App.jsx`, `src/pages/*.jsx`, and `src/index.css` to make it your own. Have fun! ✨
