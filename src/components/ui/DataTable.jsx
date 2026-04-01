import { SeverityBadge } from './SeverityBadge';

export function DataTable({ columns, rows }) {
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-default)' }}>
      <table className="w-full border-separate border-spacing-0">
        <thead style={{ background: 'var(--bg-elevated)' }}>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-[11px] font-semibold uppercase tracking-widest px-4 py-3 text-left" style={{ color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-default)' }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="group" style={{ background: 'transparent' }}>
              {columns.map((col) => (
                <td key={`${row.id}-${col.key}`} className="px-4 py-3 text-[13.5px]" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }}>
                  {col.key === 'severity' ? <SeverityBadge severity={row[col.key]} /> : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}