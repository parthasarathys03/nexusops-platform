import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass, faBell, faChevronDown, faRotateRight,
  faXmark, faClock, faGear, faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons'

const PAGE_META = {
  overview:  { title: 'Overview',             crumb: ['Operate', 'Overview']    },
  alerts:    { title: 'Alerts',               crumb: ['Operate', 'Alerts']      },
  incidents: { title: 'Incidents',            crumb: ['Operate', 'Incidents']   },
  rca:       { title: 'Root Cause Analysis',  crumb: ['Operate', 'RCA']         },
  health:    { title: 'Operational Health',   crumb: ['Observe',  'Health']     },
  support:   { title: 'Production Support',   crumb: ['Observe',  'Support']    },
  itops:     { title: 'IT Ops',               crumb: ['Observe',  'IT Ops']     },
  aifactory: { title: 'AI Factory',           crumb: ['Platform', 'AI Factory'] },
  security:  { title: 'Security & Governance',crumb: ['Platform', 'Security']   },
  settings:  { title: 'Settings',             crumb: ['Platform', 'Settings']   },
}

const NOTIFS = [
  { id:1, sev:'critical', text:'P1: Payment gateway connection pool exhausted', t:'2m'  },
  { id:2, sev:'high',     text:'CPU spike detected on prod-api-07 (94%)',       t:'9m'  },
  { id:3, sev:'medium',   text:'New Relic — elevated latency 340ms',            t:'16m' },
  { id:4, sev:'info',     text:'Deploy complete: checkout-service v2.4.1',      t:'23m' },
  { id:5, sev:'low',      text:'SSL certificate renewal in 14 days',            t:'1h'  },
]
const N_C = { critical:'#F43F5E', high:'#F59E0B', medium:'#F59E0B', low:'#10B981', info:'#00D4AA' }

export default function Header({ activePage }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [focused,   setFocused]   = useState(false)
  const [query,     setQuery]     = useState('')
  const [spinning,  setSpinning]  = useState(false)
  const inputRef = useRef(null)
  const meta = PAGE_META[activePage] || PAGE_META.overview

  const doRefresh = () => { setSpinning(true); setTimeout(() => setSpinning(false), 850) }

  useEffect(() => {
    const h = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); inputRef.current?.focus() }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  return (
    <header style={{
      height: 'var(--header-h)', flexShrink: 0,
      background: 'rgba(11,18,34,0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--nc-border)',
      display: 'flex', alignItems: 'center',
      padding: '0 26px', gap: 16,
      position: 'sticky', top: 0, zIndex: 30,
      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
    }}>

      {/* Breadcrumb + title */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
          {meta.crumb.map((c, i) => (
            <React.Fragment key={c}>
              {i > 0 && <span style={{ fontSize: 11, color: 'var(--nc-border)' }}>/</span>}
              <span style={{
                fontSize: 11, fontWeight: 500,
                color: i === meta.crumb.length - 1 ? 'var(--nc-accent)' : 'var(--nc-text-faint)',
              }}>{c}</span>
            </React.Fragment>
          ))}
        </div>
        <h1 className="page-title" style={{ letterSpacing: '-0.3px', lineHeight: 1 }}>
          {meta.title}
        </h1>
      </div>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 380, position: 'relative', margin: '0 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, height: 36,
          padding: '0 13px', borderRadius: 10,
          background: '#131D2E',
          border: `1.5px solid ${focused ? 'var(--nc-accent)' : 'var(--nc-border)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(0,212,170,0.15)' : 'none',
          transition: 'all 180ms ease',
        }}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ fontSize: 13, color: focused ? 'var(--nc-accent)' : 'var(--nc-text-faint)', transition: 'color 180ms', flexShrink: 0 }}
          />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 180)}
            placeholder="Search alerts, services, hosts..."
            style={{
              flex:1, background:'none', border:'none', outline:'none',
              fontSize:13.5, color:'var(--nc-text-primary)',
              fontFamily:'inherit', letterSpacing:'-0.01em',
            }}
          />
          {query ? (
            <button onClick={() => setQuery('')} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', padding:0 }}>
              <FontAwesomeIcon icon={faXmark} style={{ fontSize: 12, color: 'var(--nc-text-faint)' }} />
            </button>
          ) : (
            <kbd style={{
              fontSize: 10, color: 'var(--nc-text-faint)', fontFamily: 'monospace',
              background: 'var(--nc-bg-elevated)', border: '1px solid var(--nc-border)',
              borderRadius: 5, padding: '1px 6px', letterSpacing: 0,
            }}>⌘K</kbd>
          )}
        </div>

        {focused && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
            background: 'var(--nc-bg-elevated)', border: '1px solid var(--nc-border)',
            borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)', zIndex: 50,
          }} className="anim-fade-up">
            <div style={{ padding: '9px 14px 4px' }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--nc-text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Recent</span>
            </div>
            {['payment-service latency', 'prod-api-07 CPU alert', 'INC-2048'].map(item => (
              <button key={item} onMouseDown={e => e.preventDefault()} style={{
                display: 'flex', alignItems: 'center', gap: 9, width: '100%',
                padding: '9px 14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                transition: 'background 140ms',
              }}
                onMouseEnter={e => e.currentTarget.style.background='var(--nc-bg-overlay)'}
                onMouseLeave={e => e.currentTarget.style.background='none'}
              >
                <FontAwesomeIcon icon={faClock} style={{ fontSize: 12, color: 'var(--nc-text-faint)' }} />
                <span style={{ fontSize: 13.5, color: 'var(--nc-text-muted)' }}>{item}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>

        {/* Live pill */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 99,
          background: 'var(--ok-s)', border: '1px solid var(--ok-b)',
          boxShadow: '0 0 12px rgba(16,185,129,0.2)',
        }}>
          <div className="dot dot-ok" style={{ width: 6, height: 6 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ok)', letterSpacing: '0.05em' }}>LIVE</span>
        </motion.div>

        {/* Time range */}
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          height: 34, padding: '0 12px', borderRadius: 9,
          border: '1px solid var(--nc-border)', background: 'var(--nc-bg-elevated)',
          fontSize: 12.5, color: 'var(--nc-text-muted)', cursor: 'pointer',
          fontFamily: 'inherit', fontWeight: 500, transition: 'all 180ms ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='#2D3F55'; e.currentTarget.style.background='var(--nc-bg-overlay)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--nc-border)'; e.currentTarget.style.background='var(--nc-bg-elevated)' }}
        >
          <FontAwesomeIcon icon={faClock} style={{ fontSize: 12, color: 'var(--nc-text-faint)' }} />
          Last 3h
          <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 11, color: 'var(--nc-text-faint)' }} />
        </button>

        {/* Refresh */}
        <button onClick={doRefresh} style={{
          width: 34, height: 34, borderRadius: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--nc-border)', background: 'var(--nc-bg-elevated)',
          cursor: 'pointer', transition: 'all 180ms ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='#2D3F55'; e.currentTarget.style.background='var(--nc-bg-overlay)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--nc-border)'; e.currentTarget.style.background='var(--nc-bg-elevated)' }}
        >
          <FontAwesomeIcon
            icon={faRotateRight}
            style={{ fontSize: 14, color: 'var(--nc-text-muted)', ...(spinning ? { animation: 'spin .85s linear infinite' } : {}) }}
          />
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setNotifOpen(v => !v)} style={{
            width: 34, height: 34, borderRadius: 9,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${notifOpen ? '#2D3F55' : 'var(--nc-border)'}`,
            background: notifOpen ? 'var(--nc-bg-overlay)' : 'var(--nc-bg-elevated)',
            cursor: 'pointer', position: 'relative', transition: 'all 180ms ease',
          }}>
            <FontAwesomeIcon icon={faBell} style={{ fontSize: 14, color: 'var(--nc-text-muted)' }} />
            <span style={{
              position: 'absolute', top: -4, right: -4,
              width: 17, height: 17, borderRadius: 6,
              background: 'var(--nc-rose)', color: '#fff',
              fontSize: 9.5, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>5</span>
          </button>

          {notifOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 320,
              background: 'var(--nc-bg-elevated)', border: '1px solid var(--nc-border)',
              borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 50,
            }} className="anim-fade-up">
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 18px', borderBottom: '1px solid var(--nc-border)',
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--nc-text-primary)' }}>Notifications</span>
                <button style={{ fontSize: 12, fontWeight: 600, color: 'var(--nc-accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Mark all read
                </button>
              </div>
              {NOTIFS.map(n => (
                <div key={n.id} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 11,
                  padding: '11px 18px', cursor: 'pointer',
                  borderBottom: '1px solid var(--nc-border)', transition: 'background 140ms',
                }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--nc-bg-overlay)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  <div style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, background: N_C[n.sev], marginTop: 6 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: 'var(--nc-text-primary)', lineHeight: 1.45 }}>{n.text}</p>
                    <p style={{ fontSize: 11.5, color: 'var(--nc-text-faint)', marginTop: 2 }}>{n.t} ago</p>
                  </div>
                </div>
              ))}
              <div style={{ padding: '10px 18px', textAlign: 'center' }}>
                <button style={{ fontSize: 13, fontWeight: 600, color: 'var(--nc-accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div style={{
          width: 34, height: 34, borderRadius: 10, flexShrink: 0,
          background: 'linear-gradient(135deg, #00D4AA, #0891B2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11.5, fontWeight: 800, color: '#0B1222', cursor: 'pointer',
          transition: 'transform 200ms cubic-bezier(.34,1.56,.64,1)',
        }}
          onMouseEnter={e => e.currentTarget.style.transform='scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
        >
          JR
        </div>
      </div>
    </header>
  )
}
