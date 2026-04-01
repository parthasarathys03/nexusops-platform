import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faCircleExclamation,
  faShieldHalved,
  faServer,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';
import { MetricCard } from '../components/ui/MetricCard';
import { AlertRow } from '../components/ui/AlertRow';
import { DataTable } from '../components/ui/DataTable';

/* Metrics — staggerIndex controls entrance delay, accentOpacity varies visual weight */
const METRICS = [
  {
    title: 'System Uptime',
    value: '99.97%',
    change: 0.02,
    changeLabel: 'vs yesterday',
    icon: faShieldHalved,
    accentColor: 'var(--accent-primary)',
    staggerIndex: 0,
    accentOpacity: 0.32,
  },
  {
    title: 'Active Alerts',
    value: '15',
    change: -4.8,
    changeLabel: 'critical pressure',
    icon: faCircleExclamation,
    accentColor: 'var(--severity-critical)',
    staggerIndex: 1,
    featured: true,
    accentOpacity: 0.45,
  },
  {
    title: 'MTTR Today',
    value: '23m',
    change: 12.5,
    changeLabel: 'faster recovery',
    icon: faChartLine,
    accentColor: 'var(--color-success)',
    staggerIndex: 2,
    accentOpacity: 0.28,
  },
  {
    title: 'Events / sec',
    value: '12,483',
    icon: faServer,
    accentColor: 'var(--text-tertiary)',
    staggerIndex: 3,
    accentOpacity: 0.20,
  },
];

const ALERTS = [
  { id: 1, severity: 'critical', title: 'Payment gateway connection pool exhausted',   source: 'Datadog',    service: 'payment-service', timestamp: '2m ago' },
  { id: 2, severity: 'high',     title: 'CPU spike on prod-api-07 (94%)',               source: 'Prometheus', service: 'api-gateway',     timestamp: '9m ago' },
  { id: 3, severity: 'medium',   title: 'Auth token latency p99 crossed threshold',    source: 'Grafana',    service: 'auth-service',    timestamp: '16m ago' },
  { id: 4, severity: 'low',      title: 'SSL certificate renewal in 14 days',          source: 'Checkmk',    service: 'edge-ingress',    timestamp: '1h ago' },
];

const TABLE_COLUMNS = [
  { key: 'service',  title: 'Service' },
  { key: 'severity', title: 'Risk' },
  { key: 'status',   title: 'Status' },
  { key: 'owner',    title: 'Owner' },
  { key: 'region',   title: 'Region' },
];

const TABLE_ROWS = [
  { id: 'svc-1', service: 'payment-service', severity: 'critical', status: 'Degraded',   owner: 'FinOps',   region: 'us-east-1' },
  { id: 'svc-2', service: 'api-gateway',     severity: 'high',     status: 'Under load', owner: 'Platform', region: 'us-east-1' },
  { id: 'svc-3', service: 'auth-service',    severity: 'medium',   status: 'Mitigating', owner: 'IAM',      region: 'eu-west-1' },
  { id: 'svc-4', service: 'search-service',  severity: 'low',      status: 'Healthy',    owner: 'Core Web', region: 'ap-south-1' },
];

const EASE = [0.25, 0.46, 0.45, 0.94];

export default function Overview() {
  return (
    <PageContainer>
      {/* ── Metric cards ─────────────────────────────────────────── */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        {METRICS.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </section>

      {/* ── Content grid ─────────────────────────────────────────── */}
      {/* Slightly asymmetric — alert feed is wider because it is the primary card */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: '12px',
          alignItems: 'start',
        }}
      >
        {/* ── Alert Feed — Primary card (more visual weight) ─────── */}
        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: EASE, delay: 0.14 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          {/* Card header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px 13px',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.018em',
                }}
              >
                Live Alert Feed
              </h2>
              <p
                style={{
                  fontSize: '11.5px',
                  color: 'var(--text-tertiary)',
                  marginTop: '3px',
                  lineHeight: 1.4,
                }}
              >
                Real-time ingestion across all sources
              </p>
            </div>

            {/* Live badge */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '10.5px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-success)',
                background: 'var(--color-success-muted)',
                padding: '3px 9px',
                borderRadius: '5px',
              }}
            >
              {/* Pulsing dot */}
              <span style={{ position: 'relative', display: 'flex', width: '6px', height: '6px' }}>
                <span
                  className="animate-ping"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'var(--color-success)',
                    opacity: 0.55,
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--color-success)',
                    display: 'inline-flex',
                  }}
                />
              </span>
              Live
            </span>
          </div>

          {/* Alert rows */}
          <div style={{ padding: '4px 4px 0' }}>
            {ALERTS.map((alert, idx) => (
              <AlertRow key={alert.id} alert={alert} index={idx} />
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: '11px 20px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              View all alerts
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ width: '10px', height: '10px' }} />
            </button>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
              {ALERTS.length} of 15 shown
            </span>
          </div>
        </motion.article>

        {/* ── Critical Services — Secondary card ────────────────── */}
        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: EASE, delay: 0.18 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div
            style={{
              padding: '16px 20px 13px',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                letterSpacing: '-0.018em',
              }}
            >
              Critical Services
            </h2>
            <p
              style={{
                fontSize: '11.5px',
                color: 'var(--text-tertiary)',
                marginTop: '3px',
                lineHeight: 1.4,
              }}
            >
              Risk-ranked health and ownership
            </p>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <DataTable columns={TABLE_COLUMNS} rows={TABLE_ROWS} />
          </div>
        </motion.article>
      </section>
    </PageContainer>
  );
}
