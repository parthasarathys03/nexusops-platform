import { useMemo, useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { AlertRow } from '../components/ui/AlertRow';

const ALERTS = [
  { id: 1, severity: 'critical', title: 'Payment Gateway - DB Connection Pool Exhausted', source: 'Datadog', service: 'payment-service', timestamp: '2m ago' },
  { id: 2, severity: 'critical', title: 'prod-api-07 CPU Utilization 94%', source: 'Prometheus', service: 'api-gateway', timestamp: '9m ago' },
  { id: 3, severity: 'high', title: 'Checkout Service HTTP 5xx Rate 8.7%', source: 'New Relic', service: 'checkout-service', timestamp: '11m ago' },
  { id: 4, severity: 'high', title: 'PostgreSQL replica lag 2m 14s', source: 'Zabbix', service: 'postgres-cluster', timestamp: '14m ago' },
  { id: 5, severity: 'medium', title: 'Auth Service Token Latency p99 820ms', source: 'Grafana', service: 'auth-service', timestamp: '20m ago' },
  { id: 6, severity: 'low', title: 'Scheduled job nightly-report-gen failed', source: 'Splunk', service: 'job-scheduler', timestamp: '33m ago' },
];

const FILTERS = ['all', 'critical', 'high', 'medium', 'low'];

export default function Alerts() {
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState('all');

  const list = useMemo(() => ALERTS.filter((row) => {
    if (severity !== 'all' && row.severity !== severity) return false;
    if (query && !`${row.title} ${row.service}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }), [query, severity]);

  return (
    <PageContainer>
      <section className="app-card p-4 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search alerts by title or service"
            className="h-10 px-3 rounded-lg w-full md:w-[320px] bg-transparent"
            style={{ border: '1px solid var(--border-default)', color: 'var(--text-primary)', background: 'var(--bg-elevated)' }}
          />
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setSeverity(filter)}
              className="h-9 px-3 rounded-lg text-[12px] uppercase tracking-wide"
              style={{
                border: '1px solid var(--border-default)',
                background: severity === filter ? 'var(--accent-primary-subtle)' : 'var(--bg-elevated)',
                color: severity === filter ? 'var(--accent-primary)' : 'var(--text-secondary)',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="app-card p-2">
        {list.map((alert, index) => (
          <AlertRow key={alert.id} alert={alert} index={index} />
        ))}
        {list.length === 0 ? <p className="text-center py-10 text-[13px]" style={{ color: 'var(--text-tertiary)' }}>No alerts match current filters.</p> : null}
      </section>
    </PageContainer>
  );
}