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
  faWindowMaximize,
  faArrowRightFromBracket,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const NAV = [
  { type: 'item', id: 'observe', label: 'Observe', icon: faEye },
  {
    type: 'group',
    label: 'Operate',
    defaultOpen: true,
    items: [
      { id: 'overview', label: 'Overview', icon: faTableColumns },
      { id: 'alerts', label: 'Alerts', icon: faBell, badge: 12, badgeColor: 'error' },
      { id: 'incidents', label: 'Incidents', icon: faTriangleExclamation, badge: 3, badgeColor: 'warning' },
      { id: 'rca', label: 'Root Cause Analysis', icon: faSitemap },
    ],
  },
  { type: 'item', id: 'insights', label: 'Insights', icon: faChartLine },
  { type: 'item', id: 'agents', label: 'Agents at Work', icon: faBolt },
  { type: 'item', id: 'factory', label: 'AI Factory', icon: faFlask },
  { type: 'item', id: 'security', label: 'Security & Governance', icon: faShieldHalved },
  { type: 'item', id: 'settings', label: 'Settings', icon: faGears },
];

const ACTIVE_IDS = new Set([
  'overview',
  'alerts',
  'incidents',
  'rca',
  'settings',
  'reports',
  'profile',
  'observe',
  'insights',
  'agents',
  'factory',
  'security',
]);

const EASE = [0.25, 0.46, 0.45, 0.94];

const sidebarVariants = {
  open: { width: 264, transition: { type: 'spring', stiffness: 330, damping: 36 } },
  closed: { width: 60, transition: { type: 'spring', stiffness: 330, damping: 36 } },
};

const labelVariants = {
  open: {
    opacity: 1,
    x: 0,
    display: 'flex',
    transition: { duration: 0.16, ease: EASE },
  },
  closed: {
    opacity: 0,
    x: -8,
    transition: { duration: 0.12, ease: EASE },
    transitionEnd: { display: 'none' },
  },
};

const groupBodyVariants = {
  open: { height: 'auto', opacity: 1, transition: { duration: 0.2, ease: EASE } },
  closed: { height: 0, opacity: 0, transition: { duration: 0.14, ease: EASE } },
};

const navListVariants = {
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } },
  hidden: {},
};

const navItemEntryVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: EASE } },
};

function NavBadge({ count, color }) {
  const map = {
    error: {
      bg: 'var(--color-error-muted)',
      text: 'var(--color-error)',
      ring: 'rgba(220, 38, 38, 0.2)',
    },
    warning: {
      bg: 'var(--color-warning-muted)',
      text: 'var(--color-warning)',
      ring: 'rgba(217, 119, 6, 0.22)',
    },
    default: {
      bg: 'var(--accent-primary-subtle)',
      text: 'var(--accent-primary)',
      ring: 'var(--border-brand)',
    },
  };
  const token = map[color] ?? map.default;

  return (
    <span
      className="ml-auto flex-shrink-0 rounded-full min-w-[18px] h-[18px] px-1 text-[10px] font-bold inline-flex items-center justify-center leading-none"
      style={{
        background: token.bg,
        color: token.text,
        boxShadow: `inset 0 0 0 1px ${token.ring}`,
      }}
    >
      {count}
    </span>
  );
}

function SidebarToggle({ collapsed, setCollapsed }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={() => setCollapsed((v) => !v)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.95 }}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      style={{
        width: '42px',
        height: '42px',
        borderRadius: '14px',
        border: 'none',
        background: hovered ? 'var(--bg-elevated)' : 'var(--bg-surface)',
        color: hovered ? 'var(--text-secondary)' : 'var(--text-tertiary)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: hovered
          ? '0 10px 22px rgba(17, 24, 39, 0.12)'
          : '0 8px 20px rgba(17, 24, 39, 0.1)',
        transition: 'background 140ms ease, color 140ms ease, box-shadow 140ms ease',
      }}
      >
      <FontAwesomeIcon
        icon={faWindowMaximize}
        style={{
          width: '16px',
          height: '16px',
          display: 'block',
          opacity: 0.8,
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
          lineHeight: 0,
        }}
        aria-hidden="true"
      />
    </motion.button>
  );
}

function NavItem({ item, isActive, collapsed, onClick }) {
  const [hovered, setHovered] = useState(false);
  const enabled = ACTIVE_IDS.has(item.id);

  return (
    <motion.button
      onClick={() => enabled && onClick(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={enabled ? { scale: 0.98 } : {}}
      className="relative rounded-[10px] h-[38px] text-left"
      style={{
        width: collapsed ? '40px' : '100%',
        margin: collapsed ? '0 auto' : 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: collapsed ? 0 : '10px',
        paddingLeft: collapsed ? 0 : '12px',
        paddingRight: collapsed ? 0 : '10px',
        background: isActive
          ? 'var(--sidebar-active)'
          : hovered && enabled
          ? 'var(--sidebar-hover)'
          : 'transparent',
        cursor: enabled ? 'pointer' : 'default',
        opacity: enabled ? 1 : 0.45,
        border: 'none',
        outline: 'none',
      }}
      title={collapsed ? item.label : undefined}
    >
      <AnimatePresence>
        {isActive && collapsed && (
          <motion.span
            key="dot"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.14, ease: EASE }}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '7px',
              right: '8px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      <span
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          width: '16px',
          height: '16px',
          flexShrink: 0,
          color: isActive
            ? 'var(--sidebar-icon-active)'
            : hovered && enabled
            ? 'var(--text-secondary)'
            : 'var(--sidebar-icon-default)',
          transition: 'color 140ms ease',
        }}
      >
        <FontAwesomeIcon icon={item.icon} style={{ width: '14px', height: '14px' }} />
      </span>

      {!collapsed && (
        <motion.span
          variants={labelVariants}
          animate="open"
          className="flex-1 flex items-center gap-1.5 overflow-hidden"
          style={{
            fontSize: '13px',
            fontWeight: isActive ? 600 : 500,
            color: isActive
              ? 'var(--sidebar-active-text)'
              : hovered && enabled
              ? 'var(--text-primary)'
              : 'var(--sidebar-text-default)',
            letterSpacing: '-0.01em',
            transition: 'color 140ms ease',
          }}
        >
          <span className="truncate">{item.label}</span>
          {item.badge ? <NavBadge count={item.badge} color={item.badgeColor} /> : null}
        </motion.span>
      )}
    </motion.button>
  );
}

function NavGroup({ group, activePage, collapsed, setActivePage }) {
  const [open, setOpen] = useState(group.defaultOpen ?? true);

  if (collapsed) {
    return (
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
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-1.5"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '10px 10px 4px',
        }}
      >
        <span
          style={{
            fontSize: '10.5px',
            fontWeight: 600,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: 'var(--sidebar-section-label)',
            lineHeight: 1,
          }}
        >
          {group.label}
        </span>
        <motion.span
          animate={{ rotate: open ? 0 : -90 }}
          transition={{ duration: 0.16, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              width: '8px',
              height: '8px',
              color: 'var(--sidebar-section-label)',
              opacity: 0.6,
            }}
          />
        </motion.span>
      </button>

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
            <div style={{ position: 'relative', paddingBottom: '2px' }}>
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '6px',
                  bottom: '9px',
                  width: '1px',
                  background: 'var(--border-subtle)',
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
    </div>
  );
}

export default function Sidebar({ activePage, setActivePage, collapsed, setCollapsed }) {
  return (
    <motion.aside
      variants={sidebarVariants}
      animate={collapsed ? 'closed' : 'open'}
      initial={false}
      className="relative h-screen flex flex-col flex-shrink-0 overflow-hidden"
      style={{
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--sidebar-border)',
        zIndex: 40,
      }}
    >
      <div
        className="flex-shrink-0 flex items-center"
        style={{
          height: 'var(--header-h)',
          borderBottom: '1px solid var(--sidebar-border)',
          padding: collapsed ? '0' : '0 12px',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: '10px',
        }}
      >
        {!collapsed && (
          <div
            className="flex items-center min-w-0"
            style={{
              gap: '12px',
              justifyContent: 'flex-start',
              flex: 1,
              minWidth: 0,
            }}
          >
            <img
              src="/sentra 1.png"
              alt="Sentra"
              style={{
                width: 104,
                height: 36,
                objectFit: 'contain',
                objectPosition: 'left center',
                display: 'block',
                flexShrink: 0,
              }}
            />

            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.16, ease: EASE } }}
                exit={{ opacity: 0, x: -8, transition: { duration: 0.12, ease: EASE } }}
                style={{ overflow: 'hidden', whiteSpace: 'nowrap', lineHeight: 1.05, minWidth: 0 }}
              >
                <p
                  style={{
                    fontSize: '6.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--sidebar-section-label)',
                    marginBottom: '2px',
                  }}
                >
                  Powered by
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'var(--sidebar-active-text)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  adalma.ai
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <SidebarToggle collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <div
        className="flex-1 overflow-y-auto py-3"
        style={{
          paddingLeft: collapsed ? '8px' : '8px',
          paddingRight: collapsed ? '8px' : '8px',
          overflowX: 'hidden',
        }}
      >
        <motion.div
          className="space-y-0.5"
          variants={navListVariants}
          initial="hidden"
          animate="visible"
        >
          {NAV.map((entry, index) =>
            entry.type === 'group' ? (
              <motion.div key={index} variants={navItemEntryVariants}>
                <NavGroup
                  group={entry}
                  activePage={activePage}
                  collapsed={collapsed}
                  setActivePage={setActivePage}
                />
              </motion.div>
            ) : (
              <motion.div key={entry.id} variants={navItemEntryVariants}>
                <NavItem
                  item={entry}
                  isActive={activePage === entry.id}
                  collapsed={collapsed}
                  onClick={setActivePage}
                />
              </motion.div>
            )
          )}
        </motion.div>
      </div>

      <div className="flex-shrink-0 p-3" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
        <div
          className="rounded-[10px] flex items-center gap-2.5"
          style={{
            padding: collapsed ? '8px' : '8px 10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{
              background: 'var(--gradient-brand)',
              boxShadow: 'var(--shadow-xs)',
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
              style={{
                fontSize: '12.5px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
              }}
            >
              Jane Doe
            </span>
            <span
              className="truncate"
              style={{
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                lineHeight: 1.3,
                marginTop: '1px',
              }}
            >
              jane@company.com
            </span>
          </motion.div>

          {!collapsed && (
            <button
              className="flex-shrink-0 p-1.5 rounded-lg"
              style={{
                color: 'var(--text-tertiary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              title="Sign out"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ width: '12px', height: '12px' }} />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
