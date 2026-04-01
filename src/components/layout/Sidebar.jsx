'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faTableColumns,
  faBell,
  faTriangleExclamation,
  faSitemap,
  faChartLine,
  faBolt,
  faFlask,
  faShieldHalved,
  faGears,
  faChevronLeft,
  faArrowRightFromBracket,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

/* ─────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────── */
const NAV = [
  { type: 'item', id: 'observe',  label: 'Observe',              icon: faEye },
  {
    type: 'group',
    label: 'Operate',
    defaultOpen: true,
    items: [
      { id: 'overview',  label: 'Overview',           icon: faTableColumns },
      { id: 'alerts',    label: 'Alerts',              icon: faBell,               badge: 12, badgeColor: 'error' },
      { id: 'incidents', label: 'Incidents',           icon: faTriangleExclamation, badge: 3,  badgeColor: 'warning' },
      { id: 'rca',       label: 'Root Cause Analysis', icon: faSitemap },
    ],
  },
  { type: 'item', id: 'insights', label: 'Insights',             icon: faChartLine },
  { type: 'item', id: 'agents',   label: 'Agents at Work',       icon: faBolt },
  { type: 'item', id: 'factory',  label: 'AI Factory',           icon: faFlask },
  { type: 'item', id: 'security', label: 'Security & Governance', icon: faShieldHalved },
  { type: 'item', id: 'settings', label: 'Settings',             icon: faGears },
];

const ACTIVE_IDS = new Set(['overview', 'alerts', 'incidents', 'rca', 'settings', 'reports', 'profile']);

/* ─────────────────────────────────────────────────────────
   MOTION VARIANTS
   ───────────────────────────────────────────────────────── */
const EASE = [0.25, 0.46, 0.45, 0.94];

const sidebarVariants = {
  open:   { width: 248, transition: { type: 'spring', stiffness: 340, damping: 36 } },
  closed: { width: 64,  transition: { type: 'spring', stiffness: 340, damping: 36 } },
};

// Label slides in from left, fades out going left
const labelVariants = {
  open: {
    opacity: 1,
    x: 0,
    display: 'flex',
    transition: { delay: 0.07, duration: 0.18, ease: EASE },
  },
  closed: {
    opacity: 0,
    x: -8,
    transition: { duration: 0.13, ease: EASE },
    transitionEnd: { display: 'none' },
  },
};

const groupBodyVariants = {
  open:   { height: 'auto', opacity: 1, transition: { duration: 0.2, ease: EASE } },
  closed: { height: 0,      opacity: 0, transition: { duration: 0.16, ease: EASE } },
};

/* ─────────────────────────────────────────────────────────
   BADGE
   ───────────────────────────────────────────────────────── */
function NavBadge({ count, color }) {
  const map = {
    error:   { bg: 'rgba(220,38,38,0.10)',  text: '#DC2626', ring: 'rgba(220,38,38,0.18)' },
    warning: { bg: 'rgba(234,88,12,0.10)',  text: '#EA580C', ring: 'rgba(234,88,12,0.18)' },
    default: { bg: 'var(--accent-primary-subtle)', text: 'var(--accent-primary)', ring: 'var(--border-brand)' },
  };
  const s = map[color] ?? map.default;
  return (
    <span
      className="ml-auto flex-shrink-0 rounded-full min-w-[18px] h-[18px] px-1 text-[10px] font-bold inline-flex items-center justify-center leading-none"
      style={{ background: s.bg, color: s.text, boxShadow: `inset 0 0 0 1px ${s.ring}` }}
    >
      {count}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   NAV ITEM  (with x-axis micro-interaction on hover)
   ───────────────────────────────────────────────────────── */
function NavItem({ item, isActive, collapsed, onClick }) {
  const [hovered, setHovered] = useState(false);
  const enabled = ACTIVE_IDS.has(item.id);

  return (
    <motion.button
      onClick={() => enabled && onClick(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // x-axis nudge on hover — softer entry (slight overshoot), crisp exit
      animate={{ x: hovered && enabled && !isActive ? 2 : 0 }}
      whileTap={enabled ? { scale: 0.97, x: 0 } : {}}
      transition={{
        duration: hovered ? 0.22 : 0.14,
        ease: hovered ? [0.34, 1.3, 0.64, 1] : EASE,
      }}
      className="w-full relative flex items-center gap-3 rounded-[10px] h-[38px] text-left"
      style={{
        paddingLeft: collapsed ? 0 : '10px',
        paddingRight: collapsed ? 0 : '10px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        background: isActive
          ? 'var(--sidebar-active)'
          : hovered && enabled
          ? 'var(--sidebar-hover)'
          : 'transparent',
        cursor: enabled ? 'pointer' : 'default',
        opacity: enabled ? 1 : 0.38,
        border: 'none',
        outline: 'none',
      }}
      title={collapsed ? item.label : undefined}
    >
      {/* Active state — inset left accent using box-shadow (no extra DOM node) */}
      {isActive && !collapsed && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '2px',
            height: '18px',
            borderRadius: '0 2px 2px 0',
            background: 'var(--brand-violet)',
            opacity: 0.9,
          }}
        />
      )}

      {/* Icon */}
      <span
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          width: '16px',
          height: '16px',
          color: isActive
            ? 'var(--sidebar-icon-active)'
            : hovered && enabled
            ? 'var(--text-secondary)'
            : 'var(--sidebar-icon-default)',
          transition: `color ${180}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        }}
      >
        <FontAwesomeIcon icon={item.icon} style={{ width: '14px', height: '14px' }} />
      </span>

      {/* Label + badge — active items get a font-weight nudge for "anchored" feel */}
      <motion.span
        variants={labelVariants}
        animate={collapsed ? 'closed' : 'open'}
        className="flex-1 items-center gap-1.5 overflow-hidden"
        style={{
          fontSize: '13px',
          fontWeight: isActive ? 600 : 500,
          color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text-default)',
          letterSpacing: isActive ? '-0.012em' : '-0.008em',
          transition: `color 180ms cubic-bezier(0.25, 0.46, 0.45, 0.94), font-weight 180ms, letter-spacing 180ms`,
        }}
      >
        <span className="truncate">{item.label}</span>
        {item.badge ? <NavBadge count={item.badge} color={item.badgeColor} /> : null}
      </motion.span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────
   GROUP (collapsible section with OPERATE-style label)
   ───────────────────────────────────────────────────────── */
function NavGroup({ group, activePage, collapsed, setActivePage }) {
  const [open, setOpen] = useState(group.defaultOpen ?? true);

  return (
    <div>
      {/* Section label row — only visible when expanded */}
      {!collapsed && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-3 py-[7px] rounded-lg"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <span className="label-section">{group.label}</span>
          <motion.span
            animate={{ rotate: open ? 0 : -90 }}
            transition={{ duration: 0.18, ease: EASE }}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ width: '9px', height: '9px', color: 'var(--sidebar-section-label)' }}
            />
          </motion.span>
        </button>
      )}

      {/* Items */}
      {collapsed ? (
        // In collapsed mode, show items directly without animation
        <div className="space-y-px">
          {group.items.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activePage === item.id}
              collapsed={collapsed}
              onClick={setActivePage}
            />
          ))}
        </div>
      ) : (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              variants={groupBodyVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden"
            >
              {/* Tree guide line — subtle vertical connector for group children */}
              <div style={{ position: 'relative', paddingBottom: '2px' }}>
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '18px',
                    top: '4px',
                    bottom: '8px',
                    width: '1px',
                    background: 'var(--border-default)',
                    opacity: 0.6,
                    pointerEvents: 'none',
                  }}
                />
                <div className="space-y-px">
                  {group.items.map((item) => (
                    <NavItem
                      key={item.id}
                      item={item}
                      isActive={activePage === item.id}
                      collapsed={collapsed}
                      onClick={setActivePage}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SIDEBAR ROOT
   ───────────────────────────────────────────────────────── */
export default function Sidebar({ activePage, setActivePage, collapsed, setCollapsed }) {
  return (
    <motion.aside
      variants={sidebarVariants}
      animate={collapsed ? 'closed' : 'open'}
      initial={false}
      className="relative h-screen flex flex-col flex-shrink-0 overflow-hidden"
      style={{
        background: 'var(--sidebar-bg)',
        boxShadow: 'var(--shadow-sidebar)',
        zIndex: 40,
      }}
    >
      {/* ── Left gradient accent strip ─────────────── */}
      {/* Feathered at top and bottom — feels placed, not generated */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(180deg, transparent 0%, #411B7F 12%, #FE6F5E 88%, transparent 100%)',
          opacity: 0.65,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* ── Logo ──────────────────────────────────── */}
      <div
        className="flex-shrink-0 flex items-center gap-3 px-4"
        style={{
          height: 'var(--header-h)',
          borderBottom: '1px solid var(--sidebar-border)',
        }}
      >
        <div
          className="flex-shrink-0 w-8 h-8 rounded-[9px] overflow-hidden"
          style={{ boxShadow: '0 1px 4px rgba(65,27,127,0.2)' }}
        >
          <img
            src="/sentra 1.png"
            alt="Sentra"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </div>

        <motion.div
          variants={labelVariants}
          animate={collapsed ? 'closed' : 'open'}
          className="flex-col overflow-hidden"
          style={{ display: 'flex' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}
          >
            Sentra
          </span>
          <span
            style={{
              fontSize: '9.5px',
              fontWeight: 700,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: 'var(--sidebar-section-label)',
              lineHeight: 1.2,
              marginTop: '2px',
            }}
          >
            AIOps Platform
          </span>
        </motion.div>
      </div>

      {/* ── Navigation ─────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-2 py-3"
        style={{ scrollbarWidth: 'none', overflowX: 'hidden' }}
      >
        <div className="space-y-0.5">
          {NAV.map((entry, i) =>
            entry.type === 'group' ? (
              <NavGroup
                key={i}
                group={entry}
                activePage={activePage}
                collapsed={collapsed}
                setActivePage={setActivePage}
              />
            ) : (
              <NavItem
                key={entry.id}
                item={entry}
                isActive={activePage === entry.id}
                collapsed={collapsed}
                onClick={setActivePage}
              />
            )
          )}
        </div>
      </div>

      {/* ── User section ───────────────────────────── */}
      <div
        className="flex-shrink-0 p-3"
        style={{ borderTop: '1px solid var(--sidebar-border)' }}
      >
        <div
          className="rounded-[10px] flex items-center gap-2.5"
          style={{
            padding: collapsed ? '8px' : '8px 10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            transition: 'padding 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {/* Gradient avatar */}
          <div
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #411B7F, #FE6F5E)',
              boxShadow: '0 1px 4px rgba(65,27,127,0.25)',
            }}
          >
            JD
          </div>

          <motion.div
            variants={labelVariants}
            animate={collapsed ? 'closed' : 'open'}
            className="flex-col overflow-hidden flex-1"
          >
            <span
              className="truncate"
              style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}
            >
              Jane Doe
            </span>
            <span
              className="truncate"
              style={{ fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: 1.3, marginTop: '1px' }}
            >
              jane@company.com
            </span>
          </motion.div>

          {!collapsed && (
            <button
              className="flex-shrink-0 p-1.5 rounded-lg"
              style={{ color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer' }}
              title="Sign out"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ width: '12px', height: '12px' }} />
            </button>
          )}
        </div>
      </div>

      {/* ── Collapse toggle ────────────────────────── */}
      <motion.button
        onClick={() => setCollapsed((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: collapsed ? 180 : 0 }}
        transition={{ duration: 0.22, ease: EASE }}
        className="absolute z-20 flex items-center justify-center"
        style={{
          right: '-12px',
          top: '72px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          color: 'var(--text-tertiary)',
          boxShadow: 'var(--shadow-sm)',
          cursor: 'pointer',
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} style={{ width: '9px', height: '9px' }} />
      </motion.button>
    </motion.aside>
  );
}
