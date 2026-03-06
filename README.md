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


## Build for production

```bash
npm run build
npm run preview
```


## Upload to photography page

```
curl -X POST http://{url-base}:3000/api/photos \
  -F "photo=@/absolute/path/to/your-image.jpg" \
  -F "alt=alt-text"
```