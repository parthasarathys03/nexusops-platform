import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EASE = [0.25, 0.46, 0.45, 0.94];

export function MetricCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  accentColor = '#411B7F',
  staggerIndex = 0,
  featured = false,
}) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: EASE, delay: staggerIndex * 0.05 }}
      whileHover={{ y: -3, transition: { duration: 0.18, ease: EASE } }}
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'var(--bg-surface)',
        border: featured
          ? '1.5px solid var(--border-brand)'
          : '1.5px solid var(--border-default)',
        boxShadow: featured
          ? '0 2px 8px rgba(65,27,127,0.10), 0 8px 24px rgba(65,27,127,0.07)'
          : '0 1px 3px rgba(17,24,39,0.08), 0 4px 12px rgba(17,24,39,0.05)',
        padding: '20px 20px 18px 22px',
        cursor: 'default',
        transition: 'box-shadow 200ms ease, border-color 200ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(65,27,127,0.14), 0 12px 30px rgba(65,27,127,0.08)';
        e.currentTarget.style.borderColor = 'var(--border-brand)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = featured
          ? '0 2px 8px rgba(65,27,127,0.10), 0 8px 24px rgba(65,27,127,0.07)'
          : '0 1px 3px rgba(17,24,39,0.08), 0 4px 12px rgba(17,24,39,0.05)';
        e.currentTarget.style.borderColor = featured
          ? 'var(--border-brand)'
          : 'var(--border-default)';
      }}
    >
      {/* Left accent strip — solid, not transparent. Feels structural. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: featured ? '4px' : '3px',
          background: accentColor,
          borderRadius: '12px 0 0 12px',
        }}
      />

      {/* Title + icon row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
            paddingRight: '8px',
          }}
        >
          {title}
        </span>

        {/* Icon — outlined box, not soft-fill AI style */}
        <div
          style={{
            flexShrink: 0,
            width: featured ? '34px' : '30px',
            height: featured ? '34px' : '30px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1.5px solid ${accentColor}`,
            color: accentColor,
            background: 'transparent',
          }}
        >
          <FontAwesomeIcon
            icon={icon}
            style={{ width: featured ? '14px' : '13px', height: featured ? '14px' : '13px' }}
          />
        </div>
      </div>

      {/* Value */}
      <div
        data-metric
        style={{
          fontFamily: 'var(--font-mono)',
          fontFeatureSettings: "'tnum'",
          fontSize: featured ? '2.15rem' : '1.95rem',
          fontWeight: 700,
          letterSpacing: '-0.04em',
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
              fontSize: '11.5px',
              fontWeight: 700,
              color: isPositive ? 'var(--color-success)' : 'var(--color-error)',
            }}
          >
            {isPositive ? '↑' : '↓'} {Math.abs(change)}%
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>{changeLabel}</span>
        </div>
      ) : (
        <div style={{ height: '16px' }} />
      )}
    </motion.article>
  );
}
