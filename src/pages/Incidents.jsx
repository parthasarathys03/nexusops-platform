import PageContainer from '../components/layout/PageContainer';
import { DataTable } from '../components/ui/DataTable';
import { StatStrip } from '../components/ui/StatStrip';

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
      <StatStrip stats={[
        { label: 'Active',     value: '2', valueColor: 'var(--severity-critical)' },
        { label: 'Mitigating', value: '2', valueColor: 'var(--severity-high)' },
        { label: 'Monitoring', value: '1' },
        { label: 'Resolved',   value: '1' },
        { label: 'Open Total', value: '5' },
      ]} />

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
