export default function Nav({ currentPage, onNavigate, pages }) {
  const items = [
    { key: pages.home, label: 'HOME' },
    { key: pages.about, label: 'ABOUT ME' },
    { key: pages.links, label: 'LINKS' },
    { key: pages.photography, label: 'PHOTOGRAPHY' },
    { key: pages.guestbook, label: 'GUESTBOOK' },
  ]
  return (
    <nav className="nav">
      {items.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={`nav-btn ${currentPage === key ? 'active' : ''}`}
          onClick={() => onNavigate(key)}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
