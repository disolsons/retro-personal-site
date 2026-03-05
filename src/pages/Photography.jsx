import { useState, useEffect } from 'react'

const API = '/api'

export default function Photography() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [alt, setAlt] = useState('')

  const loadPhotos = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API}/photos`)
      if (!res.ok) throw new Error('Failed to load photos')
      const data = await res.json()
      setPhotos(data)
    } catch (err) {
      setError(err.message)
      setPhotos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    const input = e.target.querySelector('input[type="file"]')
    const file = input?.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('photo', file)
      formData.append('alt', alt)
      const res = await fetch(`${API}/photos`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Upload failed')
      }
      const added = await res.json()
      setPhotos((prev) => [added, ...prev])
      setAlt('')
      input.value = ''
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this photo?')) return
    try {
      const res = await fetch(`${API}/photos/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setPhotos((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <h2>★ PHOTOGRAPHY ★</h2>
      <p>Some of my favorite shots. Add your own below!</p>

      <form onSubmit={handleUpload} className="gallery-upload">
        <div className="gallery-upload-row">
          <label className="gallery-upload-label">
            <span>Choose image:</span>
            <input type="file" accept="image/jpeg,image/png,image/gif,image/webp" required />
          </label>
          <input
            type="text"
            placeholder="Alt text (optional)"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="gallery-upload-alt"
          />
          <button type="submit" className="nav-btn" disabled={uploading}>
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
        </div>
      </form>

      {error && <p className="gallery-error">{error}</p>}
      {loading && <p className="gallery-loading">Loading gallery…</p>}

      {!loading && photos.length === 0 && !error && (
        <p className="gallery-empty">No photos yet. Upload one above!</p>
      )}

      <div className="gallery-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="gallery-item">
            <img
              src={photo.url}
              alt={photo.alt || 'Gallery photo'}
              width={200}
              height={200}
              className="gallery-img"
            />
            <button
              type="button"
              className="gallery-delete"
              onClick={() => handleDelete(photo.id)}
              title="Delete photo"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
