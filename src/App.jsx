import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableCells } from '@fortawesome/free-solid-svg-icons'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Overview from './pages/Overview'
import Alerts from './pages/Alerts'
import Incidents from './pages/Incidents'
import RootCauseAnalysis from './pages/RootCauseAnalysis'

const PAGES = {
  overview:  Overview,
  alerts:    Alerts,
  incidents: Incidents,
  rca:       RootCauseAnalysis,
}

/* Pages not yet built — placeholder */
function ComingSoon({ label }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '60vh', gap: 12,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: 'var(--accent-s)', border: '1px solid var(--accent-b)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <FontAwesomeIcon icon={faTableCells} style={{ fontSize: 18, color: 'var(--accent)' }} />
      </div>
      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)' }}>{label}</p>
      <p style={{ fontSize: 13, color: 'var(--text-3)' }}>Coming soon — in development</p>
    </div>
  )
}

export default function App() {
  const [page, setPage]           = useState('overview')
  const [collapsed, setCollapsed] = useState(false)

  const Page = PAGES[page] || (() => (
    <ComingSoon label={page.charAt(0).toUpperCase() + page.slice(1)} />
  ))

  /* Full-height flex: sidebar left, header+content right */
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>

      <Sidebar
        activePage={page}
        setActivePage={setPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <Header activePage={page} />

        <main style={{
          flex: 1,
          overflow: 'auto',
          padding: page === 'incidents' ? 0 : '28px 32px 52px',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Page />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
