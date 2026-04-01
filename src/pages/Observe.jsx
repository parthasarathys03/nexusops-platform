import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faNetworkWired, faDatabase, faCloud } from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';
import { StatStrip } from '../components/ui/StatStrip';

const EASE = [0.25, 0.46, 0.45, 0.94];

const SERVICES = [
  { name: 'api-gateway',        region: 'us-east-1',  latency: '42ms',  uptime: '99.99%', status: 'healthy',  requests: '1.2M/h' },
  { name: 'payment-service',    region: 'us-east-1',  latency: '128ms', uptime: '98.20%', status: 'degraded', requests: '340K/h' },
  { name: 'auth-service',       region: 'eu-west-1',  latency: '61ms',  uptime: '99.97%', status: 'healthy',  requests: '890K/h' },
  { name: 'search-service',     region: 'ap-south-1', latency: '88ms',  uptime: '99.91%', status: 'healthy',  requests: '220K/h' },
  { name: 'notification-svc',   region: 'us-west-2',  latency: '55ms',  uptime: '99.85%', status: 'healthy',  requests: '78K/h' },
  { name: 'media-processor',    region: 'us-east-1',  latency: '—',     uptime: '0%',     status: 'down',     requests: '0' },
  { name: 'analytics-pipeline', region: 'eu-west-1',  latency: '201ms', uptime: '99.40%', status: 'degraded', requests: '55K/h' },
  { name: 'postgres-cluster',   region: 'us-east-1',  latency: '12ms',  uptime: '99.98%', status: 'healthy',  requests: '4.1M/h' },
];

const INFRA = [
  { label: 'Compute',     icon: faServer,       used: 72,    total: 120,   unit: 'nodes' },
  { label: 'Network',     icon: faNetworkWired, used: 3.4,   total: 10,    unit: 'Gbps' },
  { label: 'Storage',     icon: faDatabase,     used: 14.2,  total: 20,    unit: 'TB' },
  { label: 'Cloud Spend', icon: faCloud,        used: 18400, total: 22000, unit: '$' },
];

const STATUS_CFG = {
  healthy:  { color: '#059669', bg: 'rgba(5,150,105,0.09)',  ring: 'rgba(5,150,105,0.18)',  label: 'Healthy' },
  degraded: { color: '#D97706', bg: 'rgba(217,119,6,0.09)', ring: 'rgba(217,119,6,0.18)',  label: 'Degraded' },
  down:     { color: '#DC2626', bg: 'rgba(220,38,38,0.09)', ring: 'rgba(220,38,38,0.18)',  label: 'Down' },
};

function StatusPill({ status }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG.healthy;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', background: cfg.bg, color: cfg.color, boxShadow: `inset 0 0 0 1px ${cfg.ring}` }}>
      {cfg.label}
    </span>
  );
}

export default function Observe() {
  return (
    <PageContainer>
      <StatStrip stats={[
        { label: 'Healthy Services',  value: '47' },
        { label: 'Degraded',          value: '3',      valueColor: 'var(--color-warning)' },
        { label: 'Down',              value: '1',      valueColor: 'var(--color-error)' },
        { label: 'Uptime (30d avg)',  value: '99.91%', sub: 'across all services' },
      ]} />

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 14, alignItems: 'start' }}>
        {/* Service health table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: EASE, delay: 0.12 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Service Health</h2>
              <p style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 2 }}>Real-time status across all environments</p>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#059669' }}>47 / 51 Healthy</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                {['Service', 'Region', 'Status', 'Latency', 'Uptime', 'Requests/h'].map(h => (
                  <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((svc, i) => (
                <tr
                  key={svc.name}
                  style={{ borderBottom: i < SERVICES.length - 1 ? '1px solid var(--border-subtle)' : 'none', cursor: 'pointer', transition: 'background 120ms ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{svc.name}</td>
                  <td style={{ padding: '10px 16px', fontSize: 11.5, color: 'var(--text-tertiary)' }}>{svc.region}</td>
                  <td style={{ padding: '10px 16px' }}><StatusPill status={svc.status} /></td>
                  <td style={{ padding: '10px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{svc.latency}</td>
                  <td style={{ padding: '10px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: svc.uptime === '0%' ? '#DC2626' : 'var(--text-primary)', fontWeight: 600 }}>{svc.uptime}</td>
                  <td style={{ padding: '10px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{svc.requests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Infra capacity */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: EASE, delay: 0.18 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Infrastructure</h2>
            <p style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 2 }}>Capacity utilisation</p>
          </div>
          <div style={{ padding: '14px 20px 18px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {INFRA.map(inf => {
              const pct = Math.round((inf.used / inf.total) * 100);
              const barColor = pct > 85 ? '#DC2626' : pct > 65 ? '#D97706' : '#411B7F';
              return (
                <div key={inf.label}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <FontAwesomeIcon icon={inf.icon} style={{ width: 12, height: 12, color: 'var(--text-tertiary)' }} />
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)' }}>{inf.label}</span>
                    </div>
                    <span style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      {inf.unit === '$' ? `$${inf.used.toLocaleString()}` : `${inf.used} ${inf.unit}`}
                      <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}> / {inf.unit === '$' ? `$${inf.total.toLocaleString()}` : `${inf.total} ${inf.unit}`}</span>
                    </span>
                  </div>
                  <div style={{ height: 5, borderRadius: 999, background: 'var(--bg-subtle)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                      style={{ height: '100%', borderRadius: 999, background: barColor }}
                    />
                  </div>
                  <p style={{ fontSize: 10.5, color: 'var(--text-tertiary)', marginTop: 3, textAlign: 'right' }}>{pct}% used</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </PageContainer>
  );
}
