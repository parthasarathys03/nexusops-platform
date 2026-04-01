/**
 * StatStrip — replaces the "4 identical colored stat cards" pattern.
 * A single horizontal bar with dividers. Clean, information-dense,
 * no decorative chrome per stat.
 *
 * stats: Array of { label, value, sub?, valueColor? }
 */
export function StatStrip({ stats }) {
  return (
    <div
      className="app-card"
      style={{
        display: 'flex',
        marginBottom: 16,
        overflow: 'hidden',
        padding: 0,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={{
            flex: 1,
            padding: '15px 22px',
            borderRight: i < stats.length - 1 ? '1px solid var(--border-subtle)' : 'none',
          }}
        >
          <p style={{
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-tertiary)',
            marginBottom: 5,
          }}>
            {s.label}
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontFeatureSettings: "'tnum'",
            fontSize: '1.5rem',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: s.valueColor || 'var(--text-primary)',
          }}>
            {s.value}
          </p>
          {s.sub && (
            <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: 4 }}>
              {s.sub}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
