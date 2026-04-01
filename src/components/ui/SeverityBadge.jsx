const SEVERITY = {
  critical: {
    label: 'Critical',
    bg: 'rgba(220, 38, 38, 0.09)',
    text: 'var(--severity-critical)',
    dot: 'var(--severity-critical)',
    ring: 'rgba(220, 38, 38, 0.2)',
  },
  high: {
    label: 'High',
    bg: 'rgba(234, 88, 12, 0.09)',
    text: 'var(--severity-high)',
    dot: 'var(--severity-high)',
    ring: 'rgba(234, 88, 12, 0.2)',
  },
  medium: {
    label: 'Medium',
    bg: 'rgba(217, 119, 6, 0.09)',
    text: 'var(--severity-medium)',
    dot: 'var(--severity-medium)',
    ring: 'rgba(217, 119, 6, 0.2)',
  },
  low: {
    label: 'Low',
    bg: 'rgba(5, 150, 105, 0.09)',
    text: 'var(--severity-low)',
    dot: 'var(--severity-low)',
    ring: 'rgba(5, 150, 105, 0.2)',
  },
  info: {
    label: 'Info',
    bg: 'var(--accent-primary-subtle)',
    text: 'var(--accent-primary)',
    dot: 'var(--accent-primary)',
    ring: 'var(--border-brand)',
  },
};

export function SeverityBadge({ severity = 'info' }) {
  const cfg = SEVERITY[severity] ?? SEVERITY.info;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '2px 8px',
        borderRadius: '5px',
        fontSize: '10.5px',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        background: cfg.bg,
        color: cfg.text,
        boxShadow: `inset 0 0 0 1px ${cfg.ring}`,
        whiteSpace: 'nowrap',
      }}
    >
      {/* Pulse dot for critical, solid dot for others */}
      <span style={{ position: 'relative', display: 'flex', width: '6px', height: '6px', flexShrink: 0 }}>
        {severity === 'critical' && (
          <span
            className="animate-ping"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: cfg.dot,
              opacity: 0.6,
            }}
          />
        )}
        <span
          style={{
            position: 'relative',
            display: 'inline-flex',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: cfg.dot,
          }}
        />
      </span>
      {cfg.label}
    </span>
  );
}
