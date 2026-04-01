import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EASE = [0.25, 0.46, 0.45, 0.94];

/**
 * MetricCard
 *
 * @param {number}  staggerIndex  – controls entrance delay (0, 1, 2, 3 …)
 * @param {boolean} featured      – slightly more visual weight (e.g. Active Alerts)
 * @param {number}  accentOpacity – controls top-accent line strength (0.2–0.45)
 */
export function MetricCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  accentColor = 'var(--accent-primary)',
  staggerIndex = 0,
  featured = false,
  accentOpacity = 0.28,
}) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 9 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: EASE, delay: staggerIndex * 0.045 }}
      whileHover={{ y: -2 }}
      style={{
        position: 'relative',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'var(--bg-surface)',
        border: featured
          ? `1px solid var(--border-brand)`
          : '1px solid var(--border-default)',
        boxShadow: featured
          ? 'var(--shadow-card-prominent)'
          : 'var(--shadow-card)',
        padding: featured ? '22px 20px 18px' : '20px 20px 18px',
        cursor: 'default',
        transition: 'box-shadow 200ms cubic-bezier(0.25,0.46,0.45,0.94), border-color 200ms cubic-bezier(0.25,0.46,0.45,0.94), transform 200ms cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
        e.currentTarget.style.borderColor = 'var(--border-brand)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = featured
          ? 'var(--shadow-card-prominent)'
          : 'var(--shadow-card)';
        e.currentTarget.style.borderColor = featured
          ? 'var(--border-brand)'
          : 'var(--border-default)';
      }}
    >
      {/* Top accent line — varies opacity by semantic importance */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: featured ? '2px' : '1px',
          background: accentColor,
          opacity: accentOpacity,
          borderRadius: '14px 14px 0 0',
        }}
      />

      {/* Title + icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '14px',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-tertiary)',
            lineHeight: 1.4,
            paddingRight: '8px',
          }}
        >
          {title}
        </span>
        <div
          style={{
            flexShrink: 0,
            width: featured ? '32px' : '28px',
            height: featured ? '32px' : '28px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--accent-primary-subtle)',
            color: accentColor,
          }}
        >
          <FontAwesomeIcon
            icon={icon}
            style={{ width: featured ? '14px' : '13px', height: featured ? '14px' : '13px' }}
          />
        </div>
      </div>

      {/* Metric value */}
      <div
        data-metric
        style={{
          fontFamily: 'var(--font-mono)',
          fontFeatureSettings: "'tnum'",
          fontSize: featured ? '2.1rem' : '1.9rem',
          fontWeight: 700,
          letterSpacing: '-0.035em',
          lineHeight: 1,
          color: 'var(--text-primary)',
          marginBottom: '10px',
        }}
      >
        {value}
      </div>

      {/* Change indicator */}
      {change !== undefined ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: isPositive ? 'var(--color-success)' : 'var(--color-error)',
            }}
          >
            {isPositive ? '↑' : '↓'} {Math.abs(change)}%
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{changeLabel}</span>
        </div>
      ) : (
        <div style={{ height: '15px' }} />
      )}
    </motion.article>
  );
}
