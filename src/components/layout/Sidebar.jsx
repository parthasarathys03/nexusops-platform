'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGaugeHigh,
  faBell,
  faCircleExclamation,
  faChartLine,
  faShield,
  faGears,
  faUsers,
  faKey,
  faArrowRightFromBracket,
  faChevronLeft,
  faHexagonNodes,
} from '@fortawesome/free-solid-svg-icons';

const NAV_GROUPS = [
  {
    label: 'Monitor',
    items: [
      { id: 'overview', label: 'Dashboard', icon: faGaugeHigh },
      { id: 'alerts', label: 'Alerts', icon: faBell, badge: 12, badgeVariant: 'critical' },
      { id: 'incidents', label: 'Incidents', icon: faCircleExclamation, badge: 3, badgeVariant: 'warning' },
      { id: 'rca', label: 'Analytics', icon: faChartLine },
    ],
  },
  {
    label: 'Security',
    items: [
      { id: 'compliance', label: 'Compliance', icon: faShield },
      { id: 'audit', label: 'Audit Log', icon: faKey },
    ],
  },
  {
    label: 'Configure',
    items: [
      { id: 'settings', label: 'Settings', icon: faGears },
      { id: 'team', label: 'Team', icon: faUsers },
    ],
  },
];

const sidebarVariants = {
  open: { width: 240, transition: { type: 'spring', stiffness: 280, damping: 30 } },
  closed: { width: 64, transition: { type: 'spring', stiffness: 280, damping: 30 } },
};

const labelVariants = {
  open: { opacity: 1, x: 0, display: 'block', transition: { delay: 0.08, duration: 0.18 } },
  closed: { opacity: 0, x: -8, transitionEnd: { display: 'none' }, transition: { duration: 0.12 } },
};

function Badge({ count, variant = 'default' }) {
  const colors = {
    critical: { bg: 'var(--color-error)', color: '#fff' },
    warning: { bg: 'var(--color-warning)', color: '#111' },
    default: { bg: 'var(--accent-primary)', color: '#fff' },
  };
  const token = colors[variant] ?? colors.default;
  return (
    <span className="rounded-full min-w-5 h-5 px-1.5 text-[10px] font-semibold inline-flex items-center justify-center" style={{ background: token.bg, color: token.color }}>
      {count}
    </span>
  );
}

export default function Sidebar({ activePage, setActivePage, collapsed, setCollapsed }) {
  const [mounted] = useState(true);

  const activeIds = useMemo(() => new Set(['overview', 'alerts', 'incidents', 'rca']), []);

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={collapsed ? 'closed' : 'open'}
      initial={false}
      className="relative h-screen flex flex-col flex-shrink-0 sidebar-shimmer"
      style={{
        borderRight: '1px solid var(--sidebar-border)',
        boxShadow: '0 0 0 1px rgba(45,126,255,0.05) inset',
      }}
    >
      <div className="h-14 px-4 flex items-center gap-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-accent-cta)', color: 'white' }}>
          <FontAwesomeIcon icon={faHexagonNodes} className="w-4 h-4" />
        </div>
        <motion.div variants={labelVariants} animate={collapsed ? 'closed' : 'open'}>
          <p className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>AIOps Command</p>
          <p className="text-[10px] tracking-[0.12em] uppercase" style={{ color: 'var(--text-tertiary)' }}>Enterprise Core</p>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-5">
            <motion.p variants={labelVariants} animate={collapsed ? 'closed' : 'open'} className="label-section px-3 mb-2">
              {group.label}
            </motion.p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = activePage === item.id;
                const isEnabled = activeIds.has(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => isEnabled && setActivePage(item.id)}
                    className="w-full relative rounded-xl h-10 px-3 flex items-center gap-3 transition"
                    style={{
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      background: isActive ? 'var(--sidebar-item-active)' : 'transparent',
                      border: isActive ? '1px solid var(--sidebar-item-active-border)' : '1px solid transparent',
                      opacity: isEnabled ? 1 : 0.55,
                      cursor: isEnabled ? 'pointer' : 'not-allowed',
                    }}
                    title={item.label}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="w-4 h-4"
                      style={{ color: isActive ? 'var(--sidebar-icon-active)' : 'var(--sidebar-icon-default)' }}
                    />
                    <motion.span variants={labelVariants} animate={collapsed ? 'closed' : 'open'} className="text-[13px] font-medium truncate" style={{ color: isActive ? 'var(--sidebar-text-active)' : 'var(--sidebar-text-default)' }}>
                      {item.label}
                    </motion.span>
                    {!collapsed && item.badge ? <Badge count={item.badge} variant={item.badgeVariant} /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t" style={{ borderColor: 'var(--border-subtle)', backdropFilter: 'blur(8px)' }}>
        <div className="rounded-xl p-2.5 flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
          <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold" style={{ background: 'var(--gradient-accent-cta)', color: 'white' }}>
            JD
          </div>
          <motion.div variants={labelVariants} animate={collapsed ? 'closed' : 'open'} className="flex-1 overflow-hidden">
            <div className="text-[13px] font-medium truncate leading-tight" style={{ color: 'var(--text-primary)' }}>Jane Doe</div>
            <div className="text-[11px] truncate" style={{ color: 'var(--text-tertiary)' }}>jane@company.com</div>
          </motion.div>
          {!collapsed ? (
            <button className="p-1 rounded" style={{ color: 'var(--text-tertiary)' }} title="Sign out">
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-3.5 h-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      <motion.button
        onClick={() => setCollapsed((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: collapsed ? 180 : 0 }}
        className="absolute -right-3 top-[68px] z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)', color: 'var(--text-secondary)' }}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-2.5 h-2.5" />
      </motion.button>

      {!mounted ? null : null}
    </motion.aside>
  );
}