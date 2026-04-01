import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGauge, faBell, faTriangleExclamation, faDiagramProject,
  faPlug, faRobot, faChartLine, faSitemap, faUsers, faKey,
  faClipboardList, faGear, faArrowRightFromBracket,
  faAnglesLeft, faAnglesRight, faCircleCheck, faAtom,
  faShieldHalved, faDesktop,
} from '@fortawesome/free-solid-svg-icons'

// ─── Navigation Config ────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    title: 'Observe',
    items: [
      { id: 'health',  label: 'Operational Health', icon: faDesktop },
      { id: 'support', label: 'Production Support',  icon: faShieldHalved },
      { id: 'itops',   label: 'IT Ops',              icon: faChartLine },
    ],
  },
  {
    title: 'Operate',
    items: [
      { id: 'overview',  label: 'Overview',            icon: faGauge },
      { id: 'alerts',    label: 'Alerts',              icon: faBell,                badge: 15 },
      { id: 'incidents', label: 'Incidents',           icon: faTriangleExclamation, badge: 11 },
      { id: 'rca',       label: 'Root Cause Analysis', icon: faAtom },
    ],
  },
  {
    title: 'Platform',
    items: [
      { id: 'aifactory', label: 'AI Factory',            icon: faRobot },
      { id: 'security',  label: 'Security & Governance', icon: faSitemap },
      { id: 'settings',  label: 'Settings',              icon: faGear },
    ],
  },
]

const BOTTOM_NAV = [
  { id: 'users',    label: 'Users',     icon: faUsers },
  { id: 'api-keys', label: 'API Keys',  icon: faKey },
  { id: 'logs',     label: 'Audit Log', icon: faClipboardList },
]

const INTG = [
  { name: 'Datadog',    s: 'ok'   },
  { name: 'Dynatrace',  s: 'ok'   },
  { name: 'New Relic',  s: 'warn' },
  { name: 'Prometheus', s: 'ok'   },
  { name: 'Grafana',    s: 'ok'   },
]
const INTG_CLR = { ok: '#10B981', warn: '#F59E0B', off: '#475569' }

// ─── Animation Variants ───────────────────────────────────────────────────────

const sidebarVariants = {
  expanded:  { width: 280, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  collapsed: { width: 72,  transition: { type: 'spring', stiffness: 300, damping: 30 } },
}

const labelVariants = {
  expanded:  { opacity: 1, x: 0, display: 'block', transition: { duration: 0.2, delay: 0.05 } },
  collapsed: { opacity: 0, x: -8, transition: { duration: 0.15 }, transitionEnd: { display: 'none' } },
}

const groupTitleVariants = {
  expanded:  { opacity: 1, height: 'auto', marginBottom: 4, transition: { duration: 0.2 } },
  collapsed: { opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.15 } },
}

const listVariants = {
  expanded:  { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
  collapsed: { transition: { staggerChildren: 0.02 } },
}

const itemVariants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
}

const subMenuVariants = {
  open:   { height: 'auto', opacity: 1, transition: { duration: 0.25 } },
  closed: { height: 0,      opacity: 0, transition: { duration: 0.2  } },
}

// ─── SidebarItem Component ────────────────────────────────────────────────────

function SidebarItem({ item, isCollapsed, isActive, onClick }) {
  const [subOpen, setSubOpen] = useState(false)
  const hasSubItems = Boolean(item.subItems?.length)

  return (
    <motion.div variants={itemVariants} initial="hidden" animate="visible">
      <button
        onClick={hasSubItems ? () => setSubOpen(v => !v) : onClick}
        className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg group cursor-pointer select-none w-full text-left"
        style={{ background: 'transparent', border: 'none', fontFamily: 'inherit',
                 justifyContent: isCollapsed ? 'center' : 'flex-start' }}
      >
        {/* Active pill */}
        {isActive && (
          <motion.span
            layoutId="active-nav-pill"
            className="absolute inset-0 rounded-lg"
            style={{
              background: 'rgba(0,212,170,0.1)',
              border: '1px solid rgba(0,212,170,0.25)',
              boxShadow: '0 0 12px rgba(0,212,170,0.1)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          />
        )}

        {/* Hover background */}
        <motion.span
          className="absolute inset-0 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.04)', opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        />

        {/* Icon */}
        <motion.span
          className="relative z-10 flex-shrink-0 w-5 h-5 flex items-center justify-center"
          whileHover={{ scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className={isActive ? 'text-base text-[#00D4AA] group-hover:scale-[1.12]' : 'text-base text-[#475569] group-hover:text-[#94A3B8] group-hover:scale-[1.12]'}
            style={{ transition: 'color 200ms, transform 200ms' }}
          />
        </motion.span>

        {/* Label */}
        <motion.span
          variants={labelVariants}
          style={{
            position: 'relative', zIndex: 10,
            fontSize: '0.875rem', fontWeight: 500,
            color: isActive ? '#E2E8F0' : '#94A3B8',
            flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            transition: 'color 200ms',
          }}
        >
          {item.label}
        </motion.span>

        {/* Badge */}
        {item.badge && !isCollapsed && (
          <motion.span
            variants={labelVariants}
            style={{
              position: 'relative', zIndex: 10, flexShrink: 0,
              minWidth: 20, height: 20, padding: '0 6px', borderRadius: 9999,
              background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.3)',
              fontSize: 10, fontWeight: 700, color: '#F43F5E',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              {item.badge}
            </motion.span>
          </motion.span>
        )}

        {/* Collapsed badge dot */}
        {item.badge && isCollapsed && (
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 7, height: 7, borderRadius: '50%',
            background: '#F43F5E',
            boxShadow: '0 0 0 2px rgba(11,18,34,0.92)',
          }} />
        )}

        {/* Collapsed tooltip */}
        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
            position: 'absolute', left: 'calc(100% + 12px)', top: '50%', transform: 'translateY(-50%)',
            padding: '6px 10px', borderRadius: 8,
            background: '#1A2540', border: '1px solid #1E293B',
            fontSize: 12, fontWeight: 500, color: '#E2E8F0',
            whiteSpace: 'nowrap', pointerEvents: 'none',
            opacity: 0, zIndex: 50,
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            transition: 'opacity 150ms',
          }}
            className="group-hover:opacity-100"
          >
            {item.label}
            {item.badge && <span style={{ marginLeft: 8, color: '#F43F5E' }}>({item.badge})</span>}
          </motion.div>
        )}
      </button>

      {/* Sub-menu */}
      {hasSubItems && !isCollapsed && (
        <AnimatePresence>
          {subOpen && (
            <motion.div
              variants={subMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ overflow: 'hidden', paddingLeft: 40, display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}
            >
              {item.subItems.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => onClick && onClick(sub.id)}
                  style={{
                    fontSize: 12, fontWeight: 500, color: '#475569',
                    padding: '8px 12px', borderRadius: 6,
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                    transition: 'color 150ms, background 150ms',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = 'transparent' }}
                >
                  {sub.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

export default function Sidebar({ activePage, setActivePage, collapsed, setCollapsed }) {
  const [intgOpen, setIntgOpen] = useState(true)

  const toggle = () => setCollapsed(v => !v)

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={collapsed ? 'collapsed' : 'expanded'}
      initial={false}
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
        background: 'rgba(11,18,34,0.92)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRight: '1px solid rgba(30,41,59,0.8)',
        boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
        zIndex: 20,
      }}
    >
      {/* Gradient accent line at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 10,
        background: 'linear-gradient(90deg, #00D4AA 0%, rgba(0,212,170,0) 100%)',
      }} />

      {/* ── Logo ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '0 16px', height: 'var(--header-h)', flexShrink: 0,
        borderBottom: '1px solid #1E293B',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9, flexShrink: 0,
          background: 'linear-gradient(135deg, #00D4AA 0%, #0891B2 100%)',
          boxShadow: '0 0 12px rgba(0,212,170,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#fff', fontSize: '0.875rem' }} />
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 } }}
              exit={{ opacity: 0, x: -8 }}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              <p style={{ fontSize: 14.5, fontWeight: 800, color: '#E2E8F0', letterSpacing: '-0.4px', lineHeight: 1, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Nexus Command
              </p>
              <p style={{ fontSize: 9.5, fontWeight: 600, color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>
                AI Operations
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Navigation ── */}
      <div
        className="sidebar-scroll"
        style={{
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          padding: '16px 8px 0',
        }}
      >
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} style={{ marginBottom: 24 }}>
            {/* Group title */}
            <AnimatePresence>
              {group.title && !collapsed && (
                <motion.p
                  variants={groupTitleVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  style={{
                    padding: '0 12px', fontSize: 10, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    color: '#475569', overflow: 'hidden',
                  }}
                >
                  {group.title}
                </motion.p>
              )}
              {collapsed && gi > 0 && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ height: 1, margin: '0 8px 8px', background: '#1E293B' }}
                />
              )}
            </AnimatePresence>

            {/* Items */}
            <motion.div
              variants={listVariants}
              animate={collapsed ? 'collapsed' : 'expanded'}
              style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              {group.items.map(item => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  isCollapsed={collapsed}
                  isActive={activePage === item.id}
                  onClick={() => setActivePage(item.id)}
                />
              ))}
            </motion.div>
          </div>
        ))}

        {/* Integrations section */}
        {!collapsed && (
          <div style={{ marginTop: 8, paddingTop: 10, borderTop: '1px solid #1E293B' }}>
            <button
              onClick={() => setIntgOpen(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', width: '100%',
                padding: '4px 12px', background: 'none', border: 'none',
                cursor: 'pointer', marginBottom: 4, fontFamily: 'inherit',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <span style={{
                flex: 1, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#475569', whiteSpace: 'nowrap',
              }}>
                Integrations
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981', marginRight: 8 }}>14/15</span>
              <FontAwesomeIcon
                icon={faAnglesRight}
                style={{
                  fontSize: 10, color: '#475569', flexShrink: 0,
                  transform: intgOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 220ms ease',
                }}
              />
            </button>

            <AnimatePresence>
              {intgOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  {INTG.map((ig, i) => (
                    <div
                      key={ig.name}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 9,
                        padding: '5px 12px', borderRadius: 8, cursor: 'pointer',
                        transition: 'background 150ms ease',
                        animation: `sbSlide .18s ease ${i * 36}ms both`,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{
                        width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                        background: INTG_CLR[ig.s] || INTG_CLR.off,
                      }} />
                      <span style={{ flex: 1, fontSize: 12.5, color: '#94A3B8' }}>{ig.name}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div style={{ margin: '0 16px', height: 1, background: '#1E293B', flexShrink: 0 }} />

      {/* ── Bottom Nav ── */}
      <div style={{ padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {BOTTOM_NAV.map(item => (
          <SidebarItem
            key={item.id}
            item={item}
            isCollapsed={collapsed}
            isActive={activePage === item.id}
            onClick={() => setActivePage(item.id)}
          />
        ))}
      </div>

      {/* ── User Avatar ── */}
      <div style={{ flexShrink: 0, padding: '8px 8px', borderTop: '1px solid #1E293B' }}>
        <motion.div
          className="group"
          style={{
            display: 'flex', alignItems: 'center', gap: 9,
            padding: '8px 8px', borderRadius: 9, cursor: 'pointer',
            transition: 'background 150ms',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
          whileHover={{ scale: 1.01 }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #00D4AA, #0891B2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 800, color: '#0B1222', userSelect: 'none',
          }}>
            JR
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                style={{ flex: 1, minWidth: 0 }}
              >
                <p style={{ fontSize: 13, fontWeight: 700, color: '#CBD5E1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Jordan Rivera
                </p>
                <p style={{ fontSize: 10, color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Sr. SRE Engineer
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!collapsed && (
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              style={{ color: '#475569', fontSize: '0.75rem', flexShrink: 0, transition: 'color 150ms' }}
              onMouseEnter={e => e.currentTarget.style.color = '#F43F5E'}
              onMouseLeave={e => e.currentTarget.style.color = '#475569'}
            />
          )}
        </motion.div>
      </div>

      {/* ── Collapse Toggle ── */}
      <motion.button
        onClick={toggle}
        style={{
          position: 'absolute', right: -14, top: 72,
          width: 28, height: 28, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 30, background: '#131D2E',
          border: '1px solid #1E293B', color: '#475569',
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          transition: 'color 200ms, border-color 200ms',
        }}
        whileHover={{ scale: 1.1, color: '#00D4AA' }}
        whileTap={{ scale: 0.9 }}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onMouseEnter={e => { e.currentTarget.style.color = '#00D4AA'; e.currentTarget.style.borderColor = 'rgba(0,212,170,0.4)' }}
        onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#1E293B' }}
      >
        <FontAwesomeIcon
          icon={collapsed ? faAnglesRight : faAnglesLeft}
          style={{ fontSize: 10, pointerEvents: 'none' }}
        />
      </motion.button>
    </motion.aside>
  )
}
