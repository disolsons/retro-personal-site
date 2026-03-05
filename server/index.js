const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { getAll, add, remove } = require('./db.js')

const PORT = process.env.PORT || 3000
const UPLOADS_DIR = path.join(__dirname, 'uploads', 'photos')

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg'
    const safe = /^\.(jpe?g|png|gif|webp)$/i.test(ext) ? ext : '.jpg'
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${safe}`
    cb(null, name)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /^image\/(jpe?g|png|gif|webp)$/i.test(file.mimetype)
    cb(null, ok)
  },
})

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())
app.use('/uploads/photos', express.static(UPLOADS_DIR))

app.get('/api/photos', (req, res) => {
  try {
    const rows = getAll()
    const base = req.protocol + '://' + req.get('host')
    const photos = rows.map((p) => ({
      id: p.id,
      url: `${base}/uploads/photos/${p.filename}`,
      filename: p.filename,
      alt: p.alt || '',
      sort_order: p.sort_order,
      created_at: p.created_at,
    }))
    res.json(photos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load photos' })
  }
})

app.post('/api/photos', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  try {
    const alt = (req.body.alt || '').trim()
    const id = add(req.file.filename, alt)
    const base = req.protocol + '://' + req.get('host')
    res.status(201).json({
      id,
      url: `${base}/uploads/photos/${req.file.filename}`,
      filename: req.file.filename,
      alt,
      created_at: new Date().toISOString(),
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save photo' })
  }
})

app.delete('/api/photos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }
  try {
    const filename = remove(id)
    if (!filename) {
      return res.status(404).json({ error: 'Photo not found' })
    }
    const filePath = path.join(UPLOADS_DIR, filename)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete photo' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
