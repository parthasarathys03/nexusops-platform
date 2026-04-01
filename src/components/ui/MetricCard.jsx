import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function MetricCard({ title, value, change, changeLabel = 'vs last period', icon, accentColor = 'var(--accent-primary)' }) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <motion.article
      whileHover={{ y: -2, boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${accentColor}33` }}
      transition={{ duration: 0.2 }}
      className="relative rounded-2xl p-5 overflow-hidden"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-card)' }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none" style={{ background: `radial-gradient(ellipse at top right, ${accentColor}18, transparent 70%)` }} />
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>{title}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accentColor}18`, color: accentColor }}>
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
        </div>
      </div>
      <div className="text-[2.1rem] leading-none metric font-bold mb-2" data-metric>{value}</div>
      {change !== undefined ? (
        <div className="text-xs flex items-center gap-2">
          <span style={{ color: isPositive ? 'var(--color-success)' : 'var(--color-error)', fontWeight: 600 }}>{isPositive ? '?' : '?'} {Math.abs(change)}%</span>
          <span style={{ color: 'var(--text-tertiary)' }}>{changeLabel}</span>
        </div>
      ) : null}
    </motion.article>
  );
}