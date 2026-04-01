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
  overview: { label: 'Dashboard', section: 'Operate' },
  alerts: { label: 'Alerts', section: 'Operate' },
  incidents: { label: 'Incidents', section: 'Operate' },
  rca: { label: 'Root Cause Analysis', section: 'Operate' },
  reports: { label: 'Reports', section: 'Insights' },
  settings: { label: 'Settings', section: 'Configure' },
  profile: { label: 'Profile', section: 'Account' },
  observe: { label: 'Observe', section: 'Monitor' },
  insights: { label: 'Insights', section: 'Analytics' },
  agents: { label: 'Agents at Work', section: 'AI' },
  factory: { label: 'AI Factory', section: 'AI' },
  security: { label: 'Security & Governance', section: 'Compliance' },
};

const controlBase = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '36px',
  borderRadius: '10px',
  border: '1px solid var(--border-default)',
  background: 'var(--bg-surface)',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  transition: 'border-color 140ms ease, background 140ms ease, color 140ms ease',
  flexShrink: 0,
};

function hoverIn(e) {
  e.currentTarget.style.borderColor = 'var(--border-strong)';
  e.currentTarget.style.background = 'var(--bg-elevated)';
  e.currentTarget.style.color = 'var(--text-primary)';
}

function hoverOut(e) {
  e.currentTarget.style.borderColor = 'var(--border-default)';
  e.currentTarget.style.background = 'var(--bg-surface)';
  e.currentTarget.style.color = 'var(--text-secondary)';
}

export default function Header({ activePage, isDark, toggleTheme }) {
  const [notifCount] = useState(4);
  const [searchFocused, setSearchFocused] = useState(false);
  const meta = PAGE_META[activePage] ?? { label: activePage, section: 'Module' };

  return (
    <header
      style={{
        height: 'var(--header-h)',
        background: 'var(--bg-header)',
        borderBottom: '1px solid var(--border-default)',
        boxShadow: 'var(--shadow-header)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '0 20px 0 22px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        flexShrink: 0,
      }}
    >
      <div style={{ minWidth: '170px' }}>
        <p
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            lineHeight: 1,
            marginBottom: '4px',
          }}
        >
          {meta.section}
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: 1,
          }}
        >
          {meta.label}
        </h1>
      </div>

      <div style={{ flex: 1 }} />

      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          height: '34px',
          width: '260px',
          padding: '0 10px',
          borderRadius: '6px',
          background: 'var(--bg-surface)',
          border: `1px solid ${searchFocused ? 'var(--border-strong)' : 'var(--border-default)'}`,
          cursor: 'text',
          transition: 'border-color 150ms ease',
          flexShrink: 0,
        }}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{
            width: '11px',
            height: '11px',
            color: 'var(--text-placeholder)',
            flexShrink: 0,
          }}
        />
        <input
          placeholder="Search"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            flex: 1,
            minWidth: 0,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '13px',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
          }}
        />
        <kbd
          style={{
            fontSize: '11px',
            color: 'var(--text-placeholder)',
            background: 'transparent',
            border: 'none',
            padding: 0,
            flexShrink: 0,
            fontFamily: 'inherit',
          }}
        >
          ⌘K
        </kbd>
      </label>

      <button
        style={{
          ...controlBase,
          width: 'auto',
          padding: '0 10px',
          gap: '6px',
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: 'inherit',
          letterSpacing: '-0.01em',
        }}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        <FontAwesomeIcon icon={faClockRotateLeft} style={{ width: '11px', height: '11px' }} />
        Last 3h
        <FontAwesomeIcon icon={faChevronDown} style={{ width: '8px', height: '8px', opacity: 0.6 }} />
      </button>

      <div
        style={{
          width: '1px',
          height: '22px',
          background: 'var(--border-default)',
          flexShrink: 0,
        }}
      />

      <button
        onClick={toggleTheme}
        style={{
          ...controlBase,
          width: '36px',
          color: 'var(--accent-primary)',
          background: 'var(--accent-primary-subtle)',
          borderColor: 'var(--border-brand)',
        }}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-primary)';
          e.currentTarget.style.background = 'var(--accent-primary-muted)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-brand)';
          e.currentTarget.style.background = 'var(--accent-primary-subtle)';
        }}
      >
        <FontAwesomeIcon icon={isDark ? faSun : faMoon} style={{ width: '14px', height: '14px' }} />
      </button>

      <button
        style={{ ...controlBase, width: '36px', position: 'relative' }}
        title="Notifications"
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        <FontAwesomeIcon icon={faBell} style={{ width: '13px', height: '13px' }} />
        {notifCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--color-error)',
              boxShadow: '0 0 0 2px var(--bg-surface)',
            }}
          />
        )}
      </button>

      <button
        style={{
          ...controlBase,
          gap: '8px',
          paddingLeft: '4px',
          paddingRight: '10px',
        }}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '8px',
            background: 'var(--gradient-brand)',
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
            color: 'inherit',
            letterSpacing: '-0.01em',
          }}
        >
          Jane D.
        </span>
        <FontAwesomeIcon icon={faChevronDown} style={{ width: '8px', height: '8px', opacity: 0.65 }} />
      </button>
    </header>
  );
}
