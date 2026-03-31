import React, { useState, useRef, useEffect } from 'react'
import {
  TbSearch, TbBell, TbChevronDown, TbRefresh,
  TbX, TbClock, TbSettings,
} from 'react-icons/tb'

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
const N_C = { critical:'#EF4444', high:'#F59E0B', medium:'#D97706', low:'#10B981', info:'var(--accent)' }

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
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 26px', gap: 16,
      position: 'sticky', top: 0, zIndex: 30,
      boxShadow: '0 1px 0 var(--border)',
    }}>

      {/* Breadcrumb + title */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
          {meta.crumb.map((c, i) => (
            <React.Fragment key={c}>
              {i > 0 && <span style={{ fontSize: 11, color: 'var(--border2)' }}>/</span>}
              <span style={{
                fontSize: 11, fontWeight: 500,
                color: i === meta.crumb.length - 1 ? 'var(--accent)' : 'var(--text-3)',
              }}>{c}</span>
            </React.Fragment>
          ))}
        </div>
        <h1 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-.3px', lineHeight: 1 }}>
          {meta.title}
        </h1>
      </div>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 380, position: 'relative', margin: '0 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, height: 36,
          padding: '0 13px', borderRadius: 10,
          background: focused ? 'var(--surface)' : 'var(--raised)',
          border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
          boxShadow: focused ? '0 0 0 3px var(--ring)' : 'none',
          transition: 'all .18s ease',
        }}>
          <TbSearch size={14} strokeWidth={2} color={focused ? 'var(--accent)' : 'var(--text-3)'} style={{ transition:'color .18s', flexShrink:0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 180)}
            placeholder="Search alerts, services, hosts..."
            style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:13.5, color:'var(--text-1)', fontFamily:'inherit', letterSpacing:'-.01em' }}
          />
          {query ? (
            <button onClick={() => setQuery('')} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', padding:0 }}>
              <TbX size={13} strokeWidth={2} color="var(--text-3)" />
            </button>
          ) : (
            <kbd style={{
              fontSize: 10, color: 'var(--text-3)', fontFamily: 'monospace',
              background: 'var(--raised)', border: '1px solid var(--border)',
              borderRadius: 5, padding: '1px 6px', letterSpacing: 0,
            }}>⌘K</kbd>
          )}
        </div>

        {focused && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(26,20,12,.12)', zIndex: 50,
          }} className="anim-fade-up">
            <div style={{ padding: '9px 14px 4px' }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Recent</span>
            </div>
            {['payment-service latency', 'prod-api-07 CPU alert', 'INC-2048'].map(item => (
              <button key={item} onMouseDown={e => e.preventDefault()} style={{
                display: 'flex', alignItems: 'center', gap: 9, width: '100%',
                padding: '9px 14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                transition: 'background .14s',
              }}
                onMouseEnter={e => e.currentTarget.style.background='var(--raised)'}
                onMouseLeave={e => e.currentTarget.style.background='none'}
              >
                <TbClock size={13} strokeWidth={1.8} color="var(--text-3)" />
                <span style={{ fontSize: 13.5, color: 'var(--text-2)' }}>{item}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>

        {/* Live pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 99,
          background: 'var(--ok-s)', border: '1px solid var(--ok-b)',
        }}>
          <div className="dot dot-ok breathe" style={{ width: 6, height: 6 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ok)', letterSpacing: '.05em' }}>LIVE</span>
        </div>

        {/* Time range */}
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          height: 34, padding: '0 12px', borderRadius: 9,
          border: '1px solid var(--border)', background: 'var(--surface)',
          fontSize: 12.5, color: 'var(--text-2)', cursor: 'pointer',
          fontFamily: 'inherit', fontWeight: 500,
          transition: 'all .18s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.background='var(--raised)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)';  e.currentTarget.style.background='var(--surface)' }}
        >
          <TbClock size={13} strokeWidth={1.8} color="var(--text-3)" />
          Last 3h
          <TbChevronDown size={12} strokeWidth={2} color="var(--text-3)" />
        </button>

        {/* Refresh */}
        <button onClick={doRefresh} style={{
          width: 34, height: 34, borderRadius: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--border)', background: 'var(--surface)',
          cursor: 'pointer', transition: 'all .18s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.background='var(--raised)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)';  e.currentTarget.style.background='var(--surface)' }}
        >
          <TbRefresh size={15} strokeWidth={2}
            color="var(--text-2)"
            style={spinning ? { animation: 'spin .85s linear infinite' } : {}}
          />
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setNotifOpen(v => !v)} style={{
            width: 34, height: 34, borderRadius: 9,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${notifOpen ? 'var(--border2)' : 'var(--border)'}`,
            background: notifOpen ? 'var(--raised)' : 'var(--surface)',
            cursor: 'pointer', position: 'relative', transition: 'all .18s ease',
          }}>
            <TbBell size={15} strokeWidth={2} color="var(--text-2)" />
            <span style={{
              position: 'absolute', top: -4, right: -4,
              width: 17, height: 17, borderRadius: 6,
              background: 'var(--danger)', color: '#fff',
              fontSize: 9.5, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>5</span>
          </button>

          {notifOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 320,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(26,20,12,.14)', zIndex: 50,
            }} className="anim-fade-up">
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 18px', borderBottom: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>Notifications</span>
                <button style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Mark all read
                </button>
              </div>
              {NOTIFS.map(n => (
                <div key={n.id} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 11,
                  padding: '11px 18px', cursor: 'pointer',
                  borderBottom: '1px solid var(--border)', transition: 'background .14s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--raised)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  <div style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, background: N_C[n.sev], marginTop: 6 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.45 }}>{n.text}</p>
                    <p style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>{n.t} ago</p>
                  </div>
                </div>
              ))}
              <div style={{ padding: '10px 18px', textAlign: 'center' }}>
                <button style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div style={{
          width: 34, height: 34, borderRadius: 10, flexShrink: 0,
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11.5, fontWeight: 800, color: '#fff', cursor: 'pointer',
          transition: 'background .18s ease, transform .2s cubic-bezier(.34,1.56,.64,1)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background='var(--accent2)'; e.currentTarget.style.transform='scale(1.08)' }}
          onMouseLeave={e => { e.currentTarget.style.background='var(--accent)';  e.currentTarget.style.transform='scale(1)' }}
        >
          JR
        </div>
      </div>
    </header>
  )
}
