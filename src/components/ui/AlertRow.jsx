import { motion } from 'framer-motion';
import { SeverityBadge } from './SeverityBadge';

const EASE = [0.25, 0.46, 0.45, 0.94];

export function AlertRow({ alert, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.03, duration: 0.18, ease: EASE }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '11px 16px',
        borderBottom: '1px solid var(--border-subtle)',
        cursor: 'pointer',
        transition: 'background-color 120ms ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <span style={{ width: '76px', flexShrink: 0, display: 'flex' }}>
        <SeverityBadge severity={alert.severity} />
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          lineHeight: 1.4,
        }}>
          {alert.title}
        </p>
        <p style={{
          fontSize: '11.5px',
          color: 'var(--text-tertiary)',
          marginTop: '2px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {alert.source} · {alert.service}
        </p>
      </div>

      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--text-tertiary)',
        flexShrink: 0,
        letterSpacing: '-0.01em',
      }}>
        {alert.timestamp}
      </span>
    </motion.div>
  );
}
