import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCircleExclamation, faShieldHalved, faServer } from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';
import { MetricCard } from '../components/ui/MetricCard';
import { AlertRow } from '../components/ui/AlertRow';
import { DataTable } from '../components/ui/DataTable';

const METRICS = [
  { title: 'System Uptime', value: '99.97%', change: 0.02, changeLabel: 'vs yesterday', icon: faShieldHalved, accentColor: 'var(--accent-primary)' },
  { title: 'Active Alerts', value: '15', change: -4.8, changeLabel: 'critical pressure', icon: faCircleExclamation, accentColor: 'var(--severity-critical)' },
  { title: 'MTTR Today', value: '23m', change: 12.5, changeLabel: 'faster recovery', icon: faChartLine, accentColor: 'var(--accent-secondary)' },
  { title: 'Events / sec', value: '12,483', icon: faServer, accentColor: 'var(--color-info)' },
];

const ALERTS = [
  { id: 1, severity: 'critical', title: 'Payment gateway connection pool exhausted', source: 'Datadog', service: 'payment-service', timestamp: '2m ago' },
  { id: 2, severity: 'high', title: 'CPU spike detected on prod-api-07 (94%)', source: 'Prometheus', service: 'api-gateway', timestamp: '9m ago' },
  { id: 3, severity: 'medium', title: 'Auth token latency p99 crossed threshold', source: 'Grafana', service: 'auth-service', timestamp: '16m ago' },
  { id: 4, severity: 'low', title: 'SSL certificate renewal in 14 days', source: 'Checkmk', service: 'edge-ingress', timestamp: '1h ago' },
];

const TABLE_COLUMNS = [
  { key: 'service', title: 'Service' },
  { key: 'severity', title: 'Risk' },
  { key: 'status', title: 'Status' },
  { key: 'owner', title: 'Owner' },
  { key: 'region', title: 'Region' },
];

const TABLE_ROWS = [
  { id: 'svc-1', service: 'payment-service', severity: 'critical', status: 'Degraded', owner: 'FinOps', region: 'us-east-1' },
  { id: 'svc-2', service: 'api-gateway', severity: 'high', status: 'Under load', owner: 'Platform', region: 'us-east-1' },
  { id: 'svc-3', service: 'auth-service', severity: 'medium', status: 'Mitigating', owner: 'IAM', region: 'eu-west-1' },
  { id: 'svc-4', service: 'search-service', severity: 'low', status: 'Healthy', owner: 'Core Web', region: 'ap-south-1' },
];

export default function Overview() {
  return (
    <PageContainer>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        {METRICS.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-4">
        <article className="app-card p-4">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-[16px] font-semibold">Live Alert Feed</h2>
            <span className="app-pill" style={{ background: 'var(--color-success-muted)', color: 'var(--color-success)' }}>Live stream</span>
          </div>
          <div>
            {ALERTS.map((alert, idx) => (
              <AlertRow key={alert.id} alert={alert} index={idx} />
            ))}
          </div>
        </article>

        <article className="app-card p-4">
          <div className="mb-3">
            <h2 className="text-[16px] font-semibold">Critical Services</h2>
            <p className="text-[12px] mt-1" style={{ color: 'var(--text-tertiary)' }}>Risk-ranked service health and ownership.</p>
          </div>
          <DataTable columns={TABLE_COLUMNS} rows={TABLE_ROWS} />
        </article>
      </section>
    </PageContainer>
  );
}