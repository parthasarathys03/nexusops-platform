import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle, faExclamationCircle, faTimesCircle,
  faServer, faNetworkWired, faDatabase, faCloud,
  faArrowUp, faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';

const EASE = [0.25, 0.46, 0.45, 0.94];

const HEALTH_STATS = [
  { label: 'Healthy Services',  value: '47',   color: '#059669', bg: 'rgba(5,150,105,0.08)',   border: 'rgba(5,150,105,0.22)',   icon: faCheckCircle },
  { label: 'Degraded',          value: '3',    color: '#D97706', bg: 'rgba(217,119,6,0.08)',   border: 'rgba(217,119,6,0.22)',   icon: faExclamationCircle },
  { label: 'Down',              value: '1',    color: '#DC2626', bg: 'rgba(220,38,38,0.08)',   border: 'rgba(220,38,38,0.22)',   icon: faTimesCircle },
  { label: 'Uptime (30d avg)',  value: '99.91%', color: '#411B7F', bg: 'rgba(65,27,127,0.07)', border: 'rgba(65,27,127,0.20)',   icon: faCheckCircle },
];

const SERVICES = [
  { name: 'api-gateway',        region: 'us-east-1', latency: '42ms',  uptime: '99.99%', status: 'healthy',  requests: '1.2M/h' },
  { name: 'payment-service',    region: 'us-east-1', latency: '128ms', uptime: '98.20%', status: 'degraded', requests: '340K/h' },
  { name: 'auth-service',       region: 'eu-west-1', latency: '61ms',  uptime: '99.97%', status: 'healthy',  requests: '890K/h' },
  { name: 'search-service',     region: 'ap-south-1',latency: '88ms',  uptime: '99.91%', status: 'healthy',  requests: '220K/h' },
  { name: 'notification-svc',   region: 'us-west-2', latency: '55ms',  uptime: '99.85%', status: 'healthy',  requests: '78K/h' },
  { name: 'media-processor',    region: 'us-east-1', latency: '—',     uptime: '0%',     status: 'down',     requests: '0' },
  { name: 'analytics-pipeline', region: 'eu-west-1', latency: '201ms', uptime: '99.40%', status: 'degraded', requests: '55K/h' },
  { name: 'postgres-cluster',   region: 'us-east-1', latency: '12ms',  uptime: '99.98%', status: 'healthy',  requests: '4.1M/h' },
];

const INFRA = [
  { label: 'Compute',    icon: faServer,       used: 72, total: 120, unit: 'nodes' },
  { label: 'Network',    icon: faNetworkWired, used: 3.4, total: 10, unit: 'Gbps' },
  { label: 'Storage',    icon: faDatabase,     used: 14.2, total: 20, unit: 'TB' },
  { label: 'Cloud Spend',icon: faCloud,        used: 18400, total: 22000, unit: '$' },
];

const STATUS_CFG = {
  healthy:  { color: '#059669', bg: 'rgba(5,150,105,0.09)',  ring: 'rgba(5,150,105,0.2)',  label: 'Healthy' },
  degraded: { color: '#D97706', bg: 'rgba(217,119,6,0.09)', ring: 'rgba(217,119,6,0.2)',  label: 'Degraded' },
  down:     { color: '#DC2626', bg: 'rgba(220,38,38,0.09)', ring: 'rgba(220,38,38,0.2)',  label: 'Down' },
};

function StatusPill({ status }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG.healthy;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 9px', borderRadius: 5,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
      background: cfg.bg, color: cfg.color, boxShadow: `inset 0 0 0 1px ${cfg.ring}`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.color, display: 'inline-block' }} />
      {cfg.label}
    </span>
  );
}

export default function Observe() {
  return (
    <PageContainer>
      {/* Stat bar */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
        {HEALTH_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: EASE, delay: i * 0.05 }}
            style={{
              borderRadius: 12, padding: '18px 20px',
              background: 'var(--bg-surface)',
              border: `1.5px solid ${s.border}`,
              boxShadow: '0 1px 3px rgba(17,24,39,0.07), 0 4px 12px rgba(17,24,39,0.04)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 10, flexShrink: 0,
              background: s.bg, border: `1.5px solid ${s.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: s.color,
            }}>
              <FontAwesomeIcon icon={s.icon} style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-secondary)', marginBottom: 3 }}>{s.label}</p>
              <p style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: s.color, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{s.value}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 14, alignItems: 'start' }}>
        {/* Service health table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE, delay: 0.22 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Service Health</h2>
              <p style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 2 }}>Real-time status across all environments</p>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#059669', background: 'rgba(5,150,105,0.09)', padding: '3px 10px', borderRadius: 5 }}>47 / 51 Healthy</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                {['Service', 'Region', 'Status', 'Latency', 'Uptime', 'Requests/h'].map(h => (
                  <th key={h} style={{ padding: '9px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((svc, i) => (
                <tr key={svc.name} className="data-row" style={{ borderBottom: i < SERVICES.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{svc.name}</td>
                  <td style={{ padding: '11px 16px', fontSize: 11.5, color: 'var(--text-tertiary)' }}>{svc.region}</td>
                  <td style={{ padding: '11px 16px' }}><StatusPill status={svc.status} /></td>
                  <td style={{ padding: '11px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{svc.latency}</td>
                  <td style={{ padding: '11px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: svc.uptime === '0%' ? '#DC2626' : 'var(--text-primary)', fontWeight: 600 }}>{svc.uptime}</td>
                  <td style={{ padding: '11px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{svc.requests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Infra capacity */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE, delay: 0.28 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--border-subtle)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Infrastructure</h2>
            <p style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 2 }}>Capacity utilisation</p>
          </div>
          <div style={{ padding: '12px 20px 16px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {INFRA.map(inf => {
              const pct = Math.round((inf.used / inf.total) * 100);
              const barColor = pct > 85 ? '#DC2626' : pct > 65 ? '#D97706' : '#411B7F';
              return (
                <div key={inf.label}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <FontAwesomeIcon icon={inf.icon} style={{ width: 13, height: 13, color: 'var(--text-tertiary)' }} />
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)' }}>{inf.label}</span>
                    </div>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      {inf.unit === '$' ? `$${inf.used.toLocaleString()}` : `${inf.used} ${inf.unit}`}
                      <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}> / {inf.unit === '$' ? `$${inf.total.toLocaleString()}` : `${inf.total} ${inf.unit}`}</span>
                    </span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: 'var(--bg-subtle)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                      style={{ height: '100%', borderRadius: 999, background: barColor }}
                    />
                  </div>
                  <p style={{ fontSize: 10.5, color: 'var(--text-tertiary)', marginTop: 4, textAlign: 'right' }}>{pct}% used</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </PageContainer>
  );
}
