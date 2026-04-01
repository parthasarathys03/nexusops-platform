import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFlask, faRobot, faCheckCircle, faSpinner, faCirclePause,
  faGears, faBrain, faCodeBranch, faTag,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';

const EASE = [0.25, 0.46, 0.45, 0.94];

const STATS = [
  { label: 'Deployed Models', value: '12',    color: '#411B7F', bg: 'rgba(65,27,127,0.08)', border: 'rgba(65,27,127,0.22)', icon: faBrain },
  { label: 'Training Jobs',   value: '3',     color: '#D97706', bg: 'rgba(217,119,6,0.08)', border: 'rgba(217,119,6,0.22)', icon: faSpinner },
  { label: 'API Calls / day', value: '84K',   color: '#059669', bg: 'rgba(5,150,105,0.08)', border: 'rgba(5,150,105,0.22)', icon: faCodeBranch },
  { label: 'Avg Latency',     value: '210ms', color: '#411B7F', bg: 'rgba(65,27,127,0.08)', border: 'rgba(65,27,127,0.22)', icon: faGears },
];

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
  deployed: { color: '#059669', bg: 'rgba(5,150,105,0.09)',  ring: 'rgba(5,150,105,0.2)',  label: 'Deployed' },
  training: { color: '#D97706', bg: 'rgba(217,119,6,0.09)',  ring: 'rgba(217,119,6,0.2)',  label: 'Training' },
  paused:   { color: '#6B7280', bg: 'rgba(107,114,128,0.09)', ring: 'rgba(107,114,128,0.18)', label: 'Paused' },
  healthy:  { color: '#059669', bg: 'rgba(5,150,105,0.09)',  ring: 'rgba(5,150,105,0.2)',  label: 'Healthy' },
  degraded: { color: '#D97706', bg: 'rgba(217,119,6,0.09)',  ring: 'rgba(217,119,6,0.2)',  label: 'Degraded' },
};

function StatusPill({ status }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG.healthy;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 9px', borderRadius: 5, fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', background: cfg.bg, color: cfg.color, boxShadow: `inset 0 0 0 1px ${cfg.ring}` }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.color, display: 'inline-block' }} />
      {cfg.label}
    </span>
  );
}

export default function Factory() {
  return (
    <PageContainer>
      {/* Stats */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: EASE, delay: i * 0.05 }}
            style={{ borderRadius: 12, padding: '18px 20px', background: 'var(--bg-surface)', border: `1.5px solid ${s.border}`, boxShadow: '0 1px 3px rgba(17,24,39,0.07)', display: 'flex', alignItems: 'center', gap: 14 }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: s.bg, border: `1.5px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
              <FontAwesomeIcon icon={s.icon} style={{ width: 17, height: 17 }} />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-secondary)', marginBottom: 3 }}>{s.label}</p>
              <p style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: s.color, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{s.value}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Models table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: EASE, delay: 0.22 }}
        className="app-card"
        style={{ padding: 0, overflow: 'hidden', marginBottom: 14 }}
      >
        <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <FontAwesomeIcon icon={faRobot} style={{ width: 14, height: 14, color: '#411B7F' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Model Registry</h2>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-tertiary)' }}>{MODELS.length} models</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-elevated)' }}>
              {['Model', 'Type', 'Status', 'Accuracy', 'API Calls / day', 'Latency', 'Version', 'Updated'].map(h => (
                <th key={h} style={{ padding: '9px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m, i) => (
              <tr key={m.name} className="data-row" style={{ borderBottom: i < MODELS.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{m.name}</td>
                <td style={{ padding: '11px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#411B7F', background: 'rgba(65,27,127,0.08)', padding: '2px 8px', borderRadius: 4, border: '1px solid rgba(65,27,127,0.18)' }}>
                    <FontAwesomeIcon icon={faTag} style={{ width: 9, marginRight: 4 }} />{m.type}
                  </span>
                </td>
                <td style={{ padding: '11px 16px' }}><StatusPill status={m.status} /></td>
                <td style={{ padding: '11px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600 }}>{m.accuracy}</td>
                <td style={{ padding: '11px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{m.calls}</td>
                <td style={{ padding: '11px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{m.latency}</td>
                <td style={{ padding: '11px 16px', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{m.version}</td>
                <td style={{ padding: '11px 16px', fontSize: 12, color: 'var(--text-tertiary)' }}>{m.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Pipelines */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: EASE, delay: 0.32 }}
        className="app-card"
        style={{ padding: 0, overflow: 'hidden' }}
      >
        <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <FontAwesomeIcon icon={faGears} style={{ width: 14, height: 14, color: '#411B7F' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Data Pipelines</h2>
        </div>
        {PIPELINES.map((p, i) => {
          const successRate = Math.round((p.success / p.runs) * 100);
          return (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '13px 20px', borderBottom: i < PIPELINES.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
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
