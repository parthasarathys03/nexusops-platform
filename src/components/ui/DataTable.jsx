import { SeverityBadge } from './SeverityBadge';

export function DataTable({ columns, rows }) {
  return (
    <div
      style={{
        width: '100%',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid var(--border-default)',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr style={{ background: 'var(--bg-subtle)' }}>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  color: 'var(--text-tertiary)',
                  padding: '10px 16px',
                  textAlign: 'left',
                  borderBottom: '1px solid var(--border-default)',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={row.id}
              className="data-row"
              style={{ background: 'transparent', cursor: 'pointer' }}
            >
              {columns.map((col, colIdx) => (
                <td
                  key={`${row.id}-${col.key}`}
                  style={{
                    padding: '11px 16px',
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                    borderBottom:
                      rowIdx < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    fontWeight: colIdx === 0 ? 500 : 400,
                  }}
                >
                  {col.key === 'severity' ? (
                    <SeverityBadge severity={row[col.key]} />
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
