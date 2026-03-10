import { useEffect, useState } from 'react'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Links from './pages/Links'
import Guestbook from './pages/Guestbook'
import VisitorCounter from './components/VisitorCounter';

const PAGES = {
  home: 'home',
  about: 'about',
  links: 'links',
  guestbook: 'guestbook',
}

export default function App() {
  const [page, setPage] = useState(PAGES.home)

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && Object.values(PAGES).includes(hash)) {
        setPage(hash)
      }
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  const handleNavigate = (nextPage) => {
    setPage(nextPage)
    window.location.hash = nextPage
  }

  const renderPage = () => {
    switch (page) {
      case PAGES.about:
        return <About />
      case PAGES.links:
        return <Links />
      case PAGES.guestbook:
        return <Guestbook />
      default:
        return <Home />
    }
  }

  const count = VisitorCounter();

  return (
    <>
      <Marquee text="★ WELCOME TO SOWNY'S AFTERHOURS! -- FEEL FREE TO WRITE SOMETHING ON THE GUESTBOOK! ★"/>
      <div className="main-frame">
        <header className="header">
          <p className="blink">► WELCOME TO ◄</p>
          <h1 className="title">SOWNY'S AFTER HOURS</h1>
          {/* <p className="subtitle">~ Est. 2025 ~</p> */}
        </header>
        <Nav currentPage={page} onNavigate={handleNavigate} pages={PAGES} />
        <main className="content">
          {renderPage()}
        </main>
        <footer className="footer">
          <span className="visitor-count">TOTAL VISITORS: {count ?? '...'}</span>
          <span className="copyright">Made with 💜 and React</span>
        </footer>
      </div>
    </>
  )
}


