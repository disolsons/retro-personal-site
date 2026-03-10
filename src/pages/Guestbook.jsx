import { useState, useEffect } from 'react'
import { db } from '../../firebaseConfig'
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore"


export default function Guestbook() {
  const [entries, setEntries] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const MAX_CHARS = 280; 


    // Listen for real-time updates
    useEffect(() => {
      const q = query(collection(db, "guestbook"), orderBy("date", "asc"))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setEntries(data)
      })
      return () => unsubscribe() // Clean up listener
    }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    await addDoc(collection(db, "guestbook"), {
      name: name.trim(),
      message: message.trim(),
      date: new Date().toISOString().slice(0, 10)
    })

    setName('')
    setMessage('')
  }

  return (
    <>
      <h2>★ GUESTBOOK ★</h2>
      <p>Sign my guestbook! Leave your name and a message below. (280 character limit).</p>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="gb-name" style={{ display: 'block', marginBottom: '0.25rem' }}>
            Name:
          </label>
          <input
            id="gb-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name or handle"
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '0.5rem',
              fontFamily: 'inherit',
              border: '2px solid var(--electric-blue)',
              background: 'var(--bg-dark)',
              color: '#fff',
            }}
          />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="gb-msg" style={{ display: 'block', marginBottom: '0.25rem' }}>
            Message:
          </label>
          <textarea
            id="gb-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say something nice! (Or not :S)"
            rows={3}
            maxLength={MAX_CHARS} 
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '0.5rem',
              fontFamily: 'inherit',
              border: '2px solid var(--electric-blue)',
              background: 'var(--bg-dark)',
              color: '#fff',
              resize: 'vertical',
            }}
          />
        <br></br>  
        <span className={`char-counter ${message.length > MAX_CHARS - 20 ? 'limit-near' : ''} ${message.length === MAX_CHARS ? 'limit-reached' : ''}`}>
          {message.length}/{MAX_CHARS}
        </span>
        </div>
        <button type="submit" className="nav-btn">
          SIGN GUESTBOOK
        </button>
      </form>
      <div className="badge-container">
      <div className="neon-badge">
        Powered by <span>Firebase</span>
      </div>
      </div>
      <hr style={{ border: '1px dashed var(--neon-pink)', margin: '1rem 0' }} />
      <p><strong>Previous entries:</strong></p>
      {entries.map((entry, i) => (
        <div
          key={i}
          style={{
            border: '1px solid var(--purple-rain)',
            padding: '0.75rem',
            marginBottom: '0.5rem',
            background: 'rgba(0,0,0,0.2)',
          }}
        >
          <strong style={{ color: 'var(--lime-green)' }}>{entry.name}</strong>
          <span style={{ color: '#888', marginLeft: '0.5rem', fontSize: '0.9em' }}>
            {entry.date}
          </span>
          <p style={{ margin: '0.5rem 0 0' }}>{entry.message}</p>
        </div>
      ))}
    </>
  )
}
