export default function Links() {
  const links = [
    { url: 'https://react.dev', label: 'React' },
    { url: 'https://vitejs.dev', label: 'Vite' },
    { url: 'https://developer.mozilla.org', label: 'MDN' },
  ]
  return (
    <>
      <h2>★ COOL LINKS ★</h2>
      <p>Here are some places I like on the web. Check them out!</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {links.map(({ url, label }) => (
          <li key={url} style={{ marginBottom: '0.75rem' }}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              ▶ {label}
            </a>
          </li>
        ))}
      </ul>
      <p>
        <small>Add your own favorite links here and keep that 90s web spirit alive!</small>
      </p>
    </>
  )
}
