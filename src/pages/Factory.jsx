import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faGears, faTag } from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';
import { StatStrip } from '../components/ui/StatStrip';

const EASE = [0.25, 0.46, 0.45, 0.94];

const MODELS = [
  { name: 'RCA Classifier v3', type: 'Classification', status: 'deployed', accuracy: '96.4%', calls: '12,400', latency: '82ms',  version: 'v3.2.1', updated: '2d ago' },
  { name: 'Alert Correlator',  type: 'Clustering',     status: 'deployed', accuracy: '91.8%', calls: '28,100', latency: '145ms', version: 'v2.0.4', updated: '5d ago' },
  { name: 'Anomaly Detector',  type: 'Time-series',    status: 'deployed', accuracy: '94.1%', calls: '41,200', latency: '68ms',  version: 'v1.7.0', updated: '1d ago' },
  { name: 'NLP Runbook Gen',   type: 'LLM Fine-tune',  status: 'training', accuracy: '—',     calls: '—',     latency: '—',     version: 'v0.8.0', updated: 'Now' },
  { name: 'SLO Predictor',     type: 'Regression',     status: 'deployed', accuracy: '88.9%', calls: '2,100', latency: '41ms',  version: 'v1.1.2', updated: '8d ago' },
  { name: 'Log Summariser',    type: 'LLM Fine-tune',  status: 'paused',   accuracy: '90.2%', calls: '—',     latency: '—',     version: 'v2.3.0', updated: '14d ago' },
];

const PIPELINES = [
  { name: 'alert-ingestion-pipeline', runs: 1204, success: 1199, last: '2m ago',  status: 'healthy' },
  { name: 'rca-training-pipeline',    runs: 42,   success: 41,   last: '12h ago', status: 'healthy' },
  { name: 'log-embed-pipeline',       runs: 880,  success: 872,  last: '5m ago',  status: 'degraded' },
];

const STATUS_CFG = {
  deployed: { color: '#059669', bg: 'rgba(5,150,105,0.09)',  ring: 'rgba(5,150,105,0.18)',  label: 'Deployed' },
  training: { color: '#D97706', bg: 'rgba(217,119,6,0.09)',  ring: 'rgba(217,119,6,0.18)',  label: 'Training' },
  paused:   { color: '#6B7280', bg: 'rgba(107,114,128,0.08)', ring: 'rgba(107,114,128,0.15)', label: 'Paused' },
  healthy:  { color: '#059669', bg: 'rgba(5,150,105,0.09)',  ring: 'rgba(5,150,105,0.18)',  label: 'Healthy' },
  degraded: { color: '#D97706', bg: 'rgba(217,119,6,0.09)',  ring: 'rgba(217,119,6,0.18)',  label: 'Degraded' },
};

function StatusPill({ status }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG.healthy;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 4, fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', background: cfg.bg, color: cfg.color, boxShadow: `inset 0 0 0 1px ${cfg.ring}` }}>
      {cfg.label}
    </span>
  );
}

export default function Factory() {
  return (
    <PageContainer>
      <StatStrip stats={[
        { label: 'Deployed Models', value: '12' },
        { label: 'Training Jobs',   value: '3', valueColor: 'var(--color-warning)' },
        { label: 'API Calls / day', value: '84K' },
        { label: 'Avg Latency',     value: '210ms' },
      ]} />

      {/* Models table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: EASE, delay: 0.1 }}
        className="app-card"
        style={{ padding: 0, overflow: 'hidden', marginBottom: 12 }}
      >
        <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <FontAwesomeIcon icon={faRobot} style={{ width: 13, height: 13, color: 'var(--text-tertiary)' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Model Registry</h2>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-tertiary)' }}>{MODELS.length} models</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-elevated)' }}>
              {['Model', 'Type', 'Status', 'Accuracy', 'API Calls / day', 'Latency', 'Version', 'Updated'].map(h => (
                <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m, i) => (
              <tr key={m.name} style={{ borderBottom: i < MODELS.length - 1 ? '1px solid var(--border-subtle)' : 'none', transition: 'background 120ms ease', cursor: 'default' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{m.name}</td>
                <td style={{ padding: '10px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', background: 'var(--bg-subtle)', padding: '2px 7px', borderRadius: 4, border: '1px solid var(--border-default)' }}>
                    {m.type}
                  </span>
                </td>
                <td style={{ padding: '10px 16px' }}><StatusPill status={m.status} /></td>
                <td style={{ padding: '10px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600 }}>{m.accuracy}</td>
                <td style={{ padding: '10px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{m.calls}</td>
                <td style={{ padding: '10px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{m.latency}</td>
                <td style={{ padding: '10px 16px', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{m.version}</td>
                <td style={{ padding: '10px 16px', fontSize: 12, color: 'var(--text-tertiary)' }}>{m.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Pipelines */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: EASE, delay: 0.16 }}
        className="app-card"
        style={{ padding: 0, overflow: 'hidden' }}
      >
        <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <FontAwesomeIcon icon={faGears} style={{ width: 13, height: 13, color: 'var(--text-tertiary)' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Data Pipelines</h2>
        </div>
        {PIPELINES.map((p, i) => {
          const successRate = Math.round((p.success / p.runs) * 100);
          return (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 20px', borderBottom: i < PIPELINES.length - 1 ? '1px solid var(--border-subtle)' : 'none', transition: 'background 120ms ease', cursor: 'default' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{p.name}</span>
              <StatusPill status={p.status} />
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{p.runs.toLocaleString()} runs</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: successRate === 100 ? '#059669' : '#D97706', fontFamily: 'var(--font-mono)' }}>{successRate}% success</span>
              <span style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>Last run {p.last}</span>
            </div>
          );
        })}
      </motion.div>
    </PageContainer>
  );
}
