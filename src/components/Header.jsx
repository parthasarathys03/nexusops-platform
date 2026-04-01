import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faMagnifyingGlass,
  faClockRotateLeft,
  faMoon,
  faSun,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const PAGE_META = {
  overview:  { label: 'Dashboard',             section: 'Operate' },
  alerts:    { label: 'Alerts',                section: 'Operate' },
  incidents: { label: 'Incidents',             section: 'Operate' },
  rca:       { label: 'Root Cause Analysis',   section: 'Operate' },
  reports:   { label: 'Reports',               section: 'Insights' },
  settings:  { label: 'Settings',              section: 'Configure' },
  profile:   { label: 'Profile',               section: 'Account' },
  observe:   { label: 'Observe',               section: 'Monitor' },
  insights:  { label: 'Insights',              section: 'Analytics' },
  agents:    { label: 'Agents at Work',        section: 'AI' },
  factory:   { label: 'AI Factory',            section: 'AI' },
  security:  { label: 'Security & Governance', section: 'Compliance' },
};

/* Shared style for all header icon-buttons */
const iconBtn = {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    background: 'transparent',
    border: '1px solid var(--border-default)',
    color: 'var(--text-tertiary)',
    cursor: 'pointer',
    transition: 'border-color 150ms cubic-bezier(0.25,0.46,0.45,0.94), color 150ms cubic-bezier(0.25,0.46,0.45,0.94), background 150ms cubic-bezier(0.25,0.46,0.45,0.94)',
    flexShrink: 0,
  },
};

export default function Header({ activePage, isDark, toggleTheme }) {
  const [notifCount] = useState(4);
  const [searchFocused, setSearchFocused] = useState(false);
  const meta = PAGE_META[activePage] ?? { label: activePage, section: 'Module' };

  return (
    <header
      style={{
        height: 'var(--header-h)',
        background: 'var(--bg-header)',
        /* Premium separation — shadow reads as depth, not just a line */
        boxShadow: 'var(--shadow-header)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 20px 0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        flexShrink: 0,
      }}
    >
      {/* ── Page title ───────────────────────────────── */}
      <div style={{ marginRight: '4px' }}>
        <p
          style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            lineHeight: 1,
            marginBottom: '3px',
          }}
        >
          {meta.section}
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            fontWeight: 700,
            letterSpacing: '-0.024em',
            color: 'var(--text-primary)',
            lineHeight: 1,
          }}
        >
          {meta.label}
        </h1>
      </div>

      {/* ── Spacer ───────────────────────────────────── */}
      <div style={{ flex: 1 }} />

      {/* ── Search bar ───────────────────────────────── */}
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          height: '34px',
          width: '244px',
          padding: '0 12px',
          borderRadius: '8px',
          background: 'var(--bg-elevated)',
          border: `1px solid ${searchFocused ? 'var(--border-focus)' : 'var(--border-default)'}`,
          boxShadow: searchFocused ? '0 0 0 3px var(--brand-violet-dim)' : 'none',
          cursor: 'text',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
          flexShrink: 0,
        }}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{
            width: '12px',
            height: '12px',
            color: searchFocused ? 'var(--brand-violet)' : 'var(--text-placeholder)',
            flexShrink: 0,
            transition: 'color 150ms ease',
          }}
        />
        <input
          placeholder="Search…"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '12.5px',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            letterSpacing: '-0.01em',
          }}
        />
        <kbd
          style={{
            fontSize: '10px',
            fontWeight: 600,
            color: 'var(--text-tertiary)',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-default)',
            borderRadius: '4px',
            padding: '1px 5px',
            lineHeight: 1.6,
            flexShrink: 0,
          }}
        >
          ⌘K
        </kbd>
      </label>

      {/* ── Time range ───────────────────────────────── */}
      <button
        style={{
          ...iconBtn.base,
          width: 'auto',
          padding: '0 10px',
          gap: '6px',
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: 'inherit',
          letterSpacing: '-0.01em',
          color: 'var(--text-secondary)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-strong)';
          e.currentTarget.style.background = 'var(--bg-elevated)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-default)';
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        <FontAwesomeIcon icon={faClockRotateLeft} style={{ width: '11px', height: '11px' }} />
        Last 3h
        <FontAwesomeIcon icon={faChevronDown} style={{ width: '8px', height: '8px', opacity: 0.55 }} />
      </button>

      {/* ── Separator ────────────────────────────────── */}
      <div
        style={{
          width: '1px',
          height: '20px',
          background: 'var(--border-default)',
          flexShrink: 0,
        }}
      />

      {/* ── Theme toggle ─────────────────────────────── */}
      <button
        onClick={toggleTheme}
        style={iconBtn.base}
        title={isDark ? 'Light mode' : 'Dark mode'}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-brand)';
          e.currentTarget.style.background = 'var(--accent-primary-subtle)';
          e.currentTarget.style.color = 'var(--brand-violet)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-default)';
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--text-tertiary)';
        }}
      >
        <FontAwesomeIcon
          icon={isDark ? faSun : faMoon}
          style={{ width: '13px', height: '13px' }}
        />
      </button>

      {/* ── Notifications ────────────────────────────── */}
      <button
        style={{ ...iconBtn.base, position: 'relative' }}
        title="Notifications"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-strong)';
          e.currentTarget.style.background = 'var(--bg-elevated)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-default)';
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--text-tertiary)';
        }}
      >
        <FontAwesomeIcon icon={faBell} style={{ width: '13px', height: '13px' }} />
        {notifCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#DC2626',
              boxShadow: '0 0 0 2px var(--bg-header)',
            }}
          />
        )}
      </button>

      {/* ── Profile button ───────────────────────────── */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          height: '34px',
          paddingLeft: '3px',
          paddingRight: '10px',
          borderRadius: '8px',
          background: 'transparent',
          border: '1px solid var(--border-default)',
          cursor: 'pointer',
          transition: 'border-color 150ms ease, background 150ms ease',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-strong)';
          e.currentTarget.style.background = 'var(--bg-elevated)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-default)';
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '7px',
            background: 'linear-gradient(135deg, #411B7F, #FE6F5E)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 700,
            color: '#FFFFFF',
            flexShrink: 0,
          }}
        >
          JD
        </div>
        <span
          style={{
            fontSize: '12.5px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            letterSpacing: '-0.01em',
          }}
        >
          Jane D.
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{ width: '8px', height: '8px', color: 'var(--text-tertiary)' }}
        />
      </button>
    </header>
  );
}
