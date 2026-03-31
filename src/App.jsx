import React, { useState } from 'react'
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
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
          <Page />
        </main>
      </div>
    </div>
  )
}
