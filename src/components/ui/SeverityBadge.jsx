const SEVERITY_CONFIG = {
  critical: { label: 'Critical', bg: 'var(--color-error-muted)', text: 'var(--severity-critical)', dot: 'var(--severity-critical)' },
  high: { label: 'High', bg: 'rgba(255,107,53,0.12)', text: 'var(--severity-high)', dot: 'var(--severity-high)' },
  medium: { label: 'Medium', bg: 'var(--color-warning-muted)', text: 'var(--severity-medium)', dot: 'var(--severity-medium)' },
  low: { label: 'Low', bg: 'var(--color-success-muted)', text: 'var(--severity-low)', dot: 'var(--severity-low)' },
  info: { label: 'Info', bg: 'var(--accent-primary-subtle)', text: 'var(--severity-info)', dot: 'var(--severity-info)' },
};

export function SeverityBadge({ severity = 'info' }) {
  const config = SEVERITY_CONFIG[severity] ?? SEVERITY_CONFIG.info;

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide" style={{ background: config.bg, color: config.text }}>
      <span className="relative flex h-1.5 w-1.5">
        {severity === 'critical' ? <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: config.dot }} /> : null}
        <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: config.dot }} />
      </span>
      {config.label}
    </span>
  );
}