import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// UI update: MetricCard component for displaying key metrics with change indicators

const EASE = [0.25, 0.46, 0.45, 0.94];

/**
 * MetricCard — pure typography hierarchy, no decorative elements.
 * The value does the work. Labels and deltas are supporting cast.
 */
export function MetricCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  staggerIndex = 0,
}) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.17, ease: EASE, delay: staggerIndex * 0.04 }}
      className="app-card"
      style={{ padding: '20px 22px 18px' }}
    >
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{
          fontSize: '10.5px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-tertiary)',
          lineHeight: 1.4,
          paddingRight: 8,
        }}>
          {title}
        </span>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            style={{ width: '12px', height: '12px', color: 'var(--text-tertiary)', flexShrink: 0, marginTop: 1 }}
          />
        )}
      </div>

      {/* Value — dominant */}
      <div
        data-metric
        style={{
          fontFamily: 'var(--font-mono)',
          fontFeatureSettings: "'tnum'",
          fontSize: '1.85rem',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'var(--text-primary)',
          marginBottom: 8,
        }}
      >
        {value}
      </div>

      {/* Delta */}
      {change !== undefined ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: '11.5px', fontWeight: 600, color: isPositive ? 'var(--color-success)' : 'var(--color-error)' }}>
            {isPositive ? '↑' : '↓'} {Math.abs(change)}%
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{changeLabel}</span>
        </div>
      ) : (
        <div style={{ height: '16px' }} />
      )}
    </motion.article>
  );
}
