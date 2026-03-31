import React, { useState, useEffect, useCallback } from 'react'
import {
  TbHeartRateMonitor,
  TbShieldCheck,
  TbDeviceDesktopAnalytics,
  TbLayoutDashboard,
  TbBellRinging2,
  TbFlame,
  TbAtom2,
  TbSparkles,
  TbFingerprint,
  TbAdjustmentsHorizontal,
  TbChevronLeft,
  TbChevronRight,
  TbChevronDown,
  TbBolt,
  TbPointFilled,
  TbSettings,
} from 'react-icons/tb'

const NAV = [
  {
    section: 'Observe',
    items: [
      { id: 'health',  label: 'Operational Health', Icon: TbHeartRateMonitor },
      { id: 'support', label: 'Production Support',  Icon: TbShieldCheck },
      { id: 'itops',   label: 'IT Ops',              Icon: TbDeviceDesktopAnalytics },
    ],
  },
  {
    section: 'Operate',
    items: [
      { id: 'overview',  label: 'Overview',            Icon: TbLayoutDashboard },
      { id: 'alerts',    label: 'Alerts',              Icon: TbBellRinging2,   badge: 15 },
      { id: 'incidents', label: 'Incidents',           Icon: TbFlame,          badge: 11 },
      { id: 'rca',       label: 'Root Cause Analysis', Icon: TbAtom2 },
    ],
  },
  {
    section: 'Platform',
    items: [
      { id: 'aifactory', label: 'AI Factory',            Icon: TbSparkles },
      { id: 'security',  label: 'Security & Governance', Icon: TbFingerprint },
      { id: 'settings',  label: 'Settings',              Icon: TbAdjustmentsHorizontal },
    ],
  },
]

const INTG = [
  { name: 'Datadog',    s: 'ok'   },
  { name: 'Dynatrace',  s: 'ok'   },
  { name: 'New Relic',  s: 'warn' },
  { name: 'Prometheus', s: 'ok'   },
  { name: 'Grafana',    s: 'ok'   },
]
const S_CLR = { ok: '#34D399', warn: '#FBBF24', off: '#6B7280' }

/* ── colours live here, easy to change ── */
const SB = {
  bg:      '#22524D',   /* medium teal — not dark, not light, clearly branded */
  border:  'rgba(255,255,255,.08)',
  t1:      '#EDFAF9',   /* primary text   — crisp near-white          */
  t2:      '#8ECBC6',   /* secondary text — soft teal-white           */
  t3:      '#4A8F89',   /* muted labels                               */
  actBg:   'rgba(255,255,255,.12)', /* active row bg  */
  actBar:  '#5EEAD4',               /* active left bar */
  actIcon: '#5EEAD4',               /* active icon     */
  actText: '#FFFFFF',               /* active text     */
  hovBg:   'rgba(255,255,255,.07)',
  hovIcon: '#C2EDE9',
}

/* ── single nav button ── */
function Item({ item, active, onClick, showText, stagger }) {
  const [hov, setHov] = useState(false)
  const { label, Icon, badge } = item

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title={!showText ? label : undefined}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '8px 12px',
        borderRadius: 9,
        border: 'none',
        cursor: 'pointer',
        marginBottom: 1,
        position: 'relative',
        outline: 'none',
        textAlign: 'left',
        background: active ? SB.actBg : hov ? SB.hovBg : 'transparent',
        transition: 'background .18s ease',
        animation: `sbSlide .24s ease ${stagger}ms both`,
        justifyContent: showText ? 'flex-start' : 'center',
      }}
    >
      {/* left accent bar */}
      <span style={{
        position: 'absolute',
        left: 0, top: '20%', bottom: '20%',
        width: 3, borderRadius: '0 3px 3px 0',
        background: SB.actBar,
        opacity: active ? 1 : 0,
        transform: active ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'center',
        transition: 'opacity .2s ease, transform .22s cubic-bezier(.4,0,.2,1)',
      }} />

      {/* icon — no heavy wrapper box */}
      <Icon
        size={17}
        strokeWidth={active ? 2.2 : 1.8}
        color={active ? SB.actIcon : hov ? SB.hovIcon : SB.t2}
        style={{
          flexShrink: 0,
          transition: 'color .18s ease, transform .2s cubic-bezier(.34,1.56,.64,1)',
          transform: hov && !active ? 'scale(1.15)' : 'scale(1)',
        }}
      />

      {/* label + badge — controlled by showText */}
      {showText && (
        <>
          <span style={{
            flex: 1,
            fontSize: 13.5,
            fontWeight: active ? 700 : 400,
            color: active ? SB.actText : hov ? '#EDFAF9' : SB.t2,
            letterSpacing: '-.01em',
            lineHeight: 1,
            transition: 'color .18s ease',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {label}
          </span>

          {badge && (
            <span style={{
              minWidth: 22, height: 18, borderRadius: 6, padding: '0 6px',
              fontSize: 10.5, fontWeight: 700,
              background: active ? 'rgba(94,234,212,.22)' : 'rgba(255,255,255,.1)',
              color: active ? SB.actIcon : SB.t2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              transition: 'all .18s ease',
            }}>
              {badge}
            </span>
          )}
        </>
      )}

      {/* collapsed badge dot */}
      {!showText && badge && (
        <span style={{
          position: 'absolute', top: 6, right: 6,
          width: 7, height: 7, borderRadius: '50%',
          background: SB.actBar,
          boxShadow: `0 0 0 2px ${SB.bg}`,
        }} />
      )}
    </button>
  )
}

/* ── sidebar ── */
export default function Sidebar({ activePage, setActivePage, collapsed, setCollapsed }) {
  const [intgOpen, setIntgOpen] = useState(true)
  const [showText, setShowText] = useState(true)

  /* two-phase: fade text → shrink | grow → show text */
  const toggle = useCallback(() => {
    if (!collapsed) {
      setShowText(false)
      setTimeout(() => setCollapsed(true), 170)
    } else {
      setCollapsed(false)
      setTimeout(() => setShowText(true), 200)
    }
  }, [collapsed, setCollapsed])

  useEffect(() => { setShowText(!collapsed) }, [])

  let stagger = 0

  return (
    <aside style={{
      width: collapsed ? 62 : '258px',
      flexShrink: 0,
      background: SB.bg,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 20,
      transition: 'width .28s cubic-bezier(.4,0,.2,1)',
      overflow: 'hidden',
      borderRight: '1px solid rgba(0,0,0,.18)',
    }}>

      {/* ── header row: logo + collapse btn ── */}
      <div style={{
        height: 'var(--header-h)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px 0 14px',
        borderBottom: `1px solid ${SB.border}`,
        flexShrink: 0,
      }}>
        {/* logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden', flex: 1 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9, flexShrink: 0,
            background: '#0D9488',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform .22s cubic-bezier(.34,1.56,.64,1)',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <TbBolt size={16} color="#fff" strokeWidth={2.5} />
          </div>

          <div style={{
            overflow: 'hidden',
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateX(0)' : 'translateX(-6px)',
            transition: 'opacity .15s ease, transform .15s ease',
            whiteSpace: 'nowrap',
          }}>
            <p style={{ fontSize: 14.5, fontWeight: 800, color: SB.t1, letterSpacing: '-.4px', lineHeight: 1 }}>
              NexusOps
            </p>
            <p style={{ fontSize: 9.5, fontWeight: 600, color: SB.t3, letterSpacing: '.12em', textTransform: 'uppercase', marginTop: 3 }}>
              AI Operations
            </p>
          </div>
        </div>

        {/* collapse button — inside header, clean */}
        <button
          onClick={toggle}
          style={{
            width: 26, height: 26, borderRadius: 7, flexShrink: 0,
            background: 'rgba(255,255,255,.1)',
            border: '1px solid rgba(255,255,255,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background .18s ease, transform .2s cubic-bezier(.34,1.56,.64,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.2)'; e.currentTarget.style.transform = 'scale(1.1)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          {collapsed
            ? <TbChevronRight size={13} strokeWidth={2.2} color={SB.t2} />
            : <TbChevronLeft  size={13} strokeWidth={2.2} color={SB.t2} />
          }
        </button>
      </div>

      {/* ── nav ── */}
      <nav style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '12px 8px 0',
        scrollbarWidth: 'none',
      }}>
        {NAV.map(({ section, items }, gi) => (
          <div key={section} style={{ marginBottom: 6 }}>
            {/* section label */}
            {showText ? (
              <p style={{
                fontSize: 9.5, fontWeight: 700, letterSpacing: '.13em',
                textTransform: 'uppercase', color: SB.t3,
                padding: '8px 12px 4px',
                opacity: showText ? 1 : 0,
                transition: 'opacity .15s ease',
                whiteSpace: 'nowrap',
              }}>
                {section}
              </p>
            ) : gi > 0 ? (
              <div style={{ height: 1, margin: '8px 10px', background: SB.border }} />
            ) : (
              <div style={{ height: 4 }} />
            )}

            {items.map(item => (
              <Item
                key={item.id}
                item={item}
                active={activePage === item.id}
                onClick={() => setActivePage(item.id)}
                showText={showText}
                stagger={stagger++ * 32}
              />
            ))}
          </div>
        ))}

        {/* integrations */}
        {showText && (
          <div style={{
            marginTop: 8, paddingTop: 10,
            borderTop: `1px solid ${SB.border}`,
            opacity: showText ? 1 : 0,
            transition: 'opacity .15s ease',
          }}>
            <button
              onClick={() => setIntgOpen(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', width: '100%',
                padding: '4px 12px', background: 'none', border: 'none',
                cursor: 'pointer', marginBottom: 2,
                transition: 'opacity .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.65'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <span style={{
                flex: 1, fontSize: 9.5, fontWeight: 700, letterSpacing: '.13em',
                textTransform: 'uppercase', color: SB.t3, whiteSpace: 'nowrap',
              }}>
                Integrations
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#34D399', marginRight: 8 }}>14/15</span>
              <TbChevronDown
                size={12} strokeWidth={2} color={SB.t3}
                style={{
                  flexShrink: 0,
                  transition: 'transform .22s ease',
                  transform: intgOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                }}
              />
            </button>

            {intgOpen && INTG.map((ig, i) => (
              <div key={ig.name}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '5px 12px', borderRadius: 8, cursor: 'pointer',
                  transition: 'background .15s ease',
                  animation: `sbSlide .18s ease ${i * 36}ms both`,
                }}
                onMouseEnter={e => e.currentTarget.style.background = SB.hovBg}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <TbPointFilled size={8} color={S_CLR[ig.s] || S_CLR.off} />
                <span style={{ flex: 1, fontSize: 12.5, color: SB.t2 }}>{ig.name}</span>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* ── user ── */}
      <div style={{ borderTop: `1px solid ${SB.border}`, padding: '8px 8px', flexShrink: 0 }}>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 9,
            padding: '8px 8px', borderRadius: 9, cursor: 'pointer',
            transition: 'background .18s ease',
            justifyContent: showText ? 'flex-start' : 'center',
          }}
          onMouseEnter={e => e.currentTarget.style.background = SB.hovBg}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 9, flexShrink: 0,
            background: 'rgba(255,255,255,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 800, color: '#EDFAF9',
            transition: 'background .18s ease, transform .2s cubic-bezier(.34,1.56,.64,1)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.25)'; e.currentTarget.style.transform = 'scale(1.07)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.15)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            JR
          </div>

          <div style={{
            flex: 1, minWidth: 0,
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateX(0)' : 'translateX(-6px)',
            transition: 'opacity .15s ease, transform .15s ease',
            overflow: 'hidden', whiteSpace: 'nowrap',
          }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: SB.t1, letterSpacing: '-.02em', lineHeight: 1, marginBottom: 3 }}>
              Jordan Rivera
            </p>
            <p style={{ fontSize: 11, color: SB.t3, lineHeight: 1 }}>
              Sr. SRE Engineer
            </p>
          </div>

          {showText && (
            <TbSettings
              size={14} strokeWidth={1.8} color={SB.t3}
              style={{
                flexShrink: 0,
                opacity: showText ? 1 : 0,
                transition: 'opacity .15s ease, transform .22s cubic-bezier(.34,1.56,.64,1)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'rotate(45deg)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg)'}
            />
          )}
        </div>
      </div>
    </aside>
  )
}
