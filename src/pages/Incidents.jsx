import PageContainer from '../components/layout/PageContainer';
import { DataTable } from '../components/ui/DataTable';

const COLUMNS = [
  { key: 'incident', title: 'Incident' },
  { key: 'severity', title: 'Priority' },
  { key: 'status', title: 'Status' },
  { key: 'duration', title: 'Duration' },
  { key: 'lead', title: 'Incident Lead' },
];

const ROWS = [
  { id: 'inc-2048', incident: 'INC-2048 Payment Gateway Outage', severity: 'critical', status: 'Active', duration: '34m', lead: 'M. Chen' },
  { id: 'inc-2047', incident: 'INC-2047 API Gateway Cascade', severity: 'critical', status: 'Active', duration: '18m', lead: 'T. Okonkwo' },
  { id: 'inc-2046', incident: 'INC-2046 PostgreSQL Replication Lag', severity: 'high', status: 'Mitigating', duration: '55m', lead: 'Database Team' },
  { id: 'inc-2045', incident: 'INC-2045 Elasticsearch Split Brain', severity: 'high', status: 'Mitigating', duration: '1h 22m', lead: 'S. Patel' },
  { id: 'inc-2044', incident: 'INC-2044 Cache Eviction Storm', severity: 'medium', status: 'Monitoring', duration: '2h 5m', lead: 'Platform Team' },
  { id: 'inc-2041', incident: 'INC-2041 Auth Latency Spike', severity: 'low', status: 'Resolved', duration: '47m', lead: 'Backend Team' },
];

export default function Incidents() {
  return (
    <PageContainer>
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {[
          { label: 'Active', value: '2', color: 'var(--severity-critical)', bg: 'var(--color-error-muted)' },
          { label: 'Mitigating', value: '2', color: 'var(--severity-high)', bg: 'rgba(255,107,53,0.12)' },
          { label: 'Monitoring', value: '1', color: 'var(--severity-medium)', bg: 'var(--color-warning-muted)' },
          { label: 'Resolved', value: '1', color: 'var(--severity-low)', bg: 'var(--color-success-muted)' },
          { label: 'Open Total', value: '5', color: 'var(--text-primary)', bg: 'var(--bg-elevated)' },
        ].map((stat) => (
          <article key={stat.label} className="app-card p-4">
            <p className="text-[30px] metric font-semibold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="label-section mt-1">{stat.label}</p>
            <div className="mt-2 h-1 rounded-full" style={{ background: stat.bg }} />
          </article>
        ))}
      </section>

      <section className="app-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-semibold">Incident Queue</h2>
          <button className="btn-gradient text-[12px]">Declare Incident</button>
        </div>
        <DataTable columns={COLUMNS} rows={ROWS} />
      </section>
    </PageContainer>
  );
}
