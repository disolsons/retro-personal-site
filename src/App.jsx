import { useState } from 'react'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Links from './pages/Links'
import Guestbook from './pages/Guestbook'
import Photography from './pages/Photography'

const PAGES = {
  home: 'home',
  about: 'about',
  links: 'links',
  photography: 'photography',
  guestbook: 'guestbook',
}

export default function App() {
  const [page, setPage] = useState(PAGES.home)

  const renderPage = () => {
    switch (page) {
      case PAGES.about:
        return <About />
      case PAGES.links:
        return <Links />
      case PAGES.photography:
        return <Photography />
      case PAGES.guestbook:
        return <Guestbook />
      default:
        return <Home />
    }
  }

  return (
    <>
      <Marquee text="★ WELCOME TO MY HOMEPAGE ★ COME BACK SOON ★ YOU ARE VISITOR # ??? ★ BEST VIEWED WITH NETSCAPE ★" />
      <div className="main-frame">
        <header className="header">
          <p className="blink">► HI! WELCOME ◄</p>
          <h1 className="title">MY COOL HOMEPAGE</h1>
          <p className="subtitle">~ Est. 2025 ~</p>
        </header>
        <Nav currentPage={page} onNavigate={setPage} pages={PAGES} />
        <main className="content">
          {renderPage()}
        </main>
        <footer className="footer">
          <span className="visitor-count">VISITORS: 001337</span>
          <span className="copyright">© 2025 • Made with 💜 and React</span>
        </footer>
      </div>
    </>
  )
}
