import { motion } from 'framer-motion';
import { SeverityBadge } from './SeverityBadge';

export function AlertRow({ alert, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      whileHover={{ background: 'var(--bg-subtle)', x: 2 }}
      className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors"
      style={{ borderBottom: '1px solid var(--border-subtle)' }}
    >
      <SeverityBadge severity={alert.severity} />
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-medium truncate" style={{ color: 'var(--text-primary)' }}>{alert.title}</p>
        <p className="text-[12px] truncate mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{alert.source} · {alert.service}</p>
      </div>
      <span className="text-[11px] metric" style={{ color: 'var(--text-tertiary)' }}>{alert.timestamp}</span>
    </motion.div>
  );
}