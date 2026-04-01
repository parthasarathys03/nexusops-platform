import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt, faCheckCircle, faSpinner, faPauseCircle,
  faRobot, faClock, faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';

const EASE = [0.25, 0.46, 0.45, 0.94];

const STATS = [
  { label: 'Active Agents',   value: '8',    color: '#411B7F', bg: 'rgba(65,27,127,0.08)', border: 'rgba(65,27,127,0.22)', icon: faBolt },
  { label: 'Tasks Completed', value: '1,204', color: '#059669', bg: 'rgba(5,150,105,0.08)', border: 'rgba(5,150,105,0.22)', icon: faCheckCircle },
  { label: 'In Progress',     value: '23',    color: '#D97706', bg: 'rgba(217,119,6,0.08)', border: 'rgba(217,119,6,0.22)', icon: faSpinner },
  { label: 'Avg Task Time',   value: '4m 12s', color: '#411B7F', bg: 'rgba(65,27,127,0.08)', border: 'rgba(65,27,127,0.22)', icon: faClock },
];

const AGENTS = [
  {
    name: 'RCA Investigator',
    id: 'agent-rca-01',
    status: 'running',
    task: 'Analysing payment-service connection pool exhaustion — correlating 8 signals across 3 layers',
    started: '4m ago',
    completed: 142,
    model: 'GPT-4o',
  },
  {
    name: 'Alert Correlator',
    id: 'agent-corr-02',
    status: 'running',
    task: 'Grouping 38 alerts from last 2 hours into incident clusters',
    started: '12m ago',
    completed: 891,
    model: 'Claude 3.5',
  },
  {
    name: 'Runbook Executor',
    id: 'agent-rb-03',
    status: 'running',
    task: 'Executing auto-remediation runbook for api-gateway CPU spike (step 3/5)',
    started: '2m ago',
    completed: 54,
    model: 'GPT-4o-mini',
  },
  {
    name: 'Capacity Planner',
    id: 'agent-cap-04',
    status: 'idle',
    task: 'Waiting for next scheduled analysis at 18:00 UTC',
    started: '2h ago',
    completed: 310,
    model: 'Claude 3.5',
  },
  {
    name: 'Log Summariser',
    id: 'agent-log-05',
    status: 'idle',
    task: 'Summarising error logs for 6 services — queued behind RCA Investigator',
    started: '8m ago',
    completed: 2040,
    model: 'GPT-4o-mini',
  },
  {
    name: 'SLO Guardian',
    id: 'agent-slo-06',
    status: 'running',
    task: 'Monitoring SLO burn rates; api-gateway at 3.2× burn — escalation threshold approaching',
    started: '18m ago',
    completed: 207,
    model: 'Claude 3.5',
  },
];

const ACTIVITY = [
  { time: '14:32', agent: 'RCA Investigator',  action: 'Identified root cause: DB conn pool limit (max=100, used=100)', type: 'success' },
  { time: '14:28', agent: 'Alert Correlator',  action: 'Merged 12 alerts into incident INC-0041 — payment cluster', type: 'info' },
  { time: '14:21', agent: 'Runbook Executor',  action: 'Executed step 2/5: increased pool size to 150 on prod-db-01', type: 'success' },
  { time: '14:15', agent: 'SLO Guardian',      action: 'WARNING: api-gateway SLO burn rate at 3.2× — paging on-call', type: 'warning' },
  { time: '14:08', agent: 'Log Summariser',    action: 'Generated 6-service error digest — 340 log lines → 4 bullets', type: 'info' },
  { time: '13:55', agent: 'Capacity Planner',  action: 'Forecast: payment-service needs +40% compute by next Thursday', type: 'info' },
];

const STATUS_CFG = {
  running: { color: '#411B7F', bg: 'rgba(65,27,127,0.09)', ring: 'rgba(65,27,127,0.22)', label: 'Running', icon: faBolt },
  idle:    { color: '#6B7280', bg: 'rgba(107,114,128,0.09)', ring: 'rgba(107,114,128,0.18)', label: 'Idle',    icon: faPauseCircle },
  error:   { color: '#DC2626', bg: 'rgba(220,38,38,0.09)', ring: 'rgba(220,38,38,0.22)', label: 'Error',   icon: faCheckCircle },
};

const ACT_CFG = {
  success: '#059669',
  warning: '#D97706',
  info:    '#411B7F',
};

export default function Agents() {
  return (
    <PageContainer>
      {/* Stats */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: EASE, delay: i * 0.05 }}
            style={{
              borderRadius: 12, padding: '18px 20px',
              background: 'var(--bg-surface)',
              border: `1.5px solid ${s.border}`,
              boxShadow: '0 1px 3px rgba(17,24,39,0.07)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}
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

      <section style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 14, alignItems: 'start' }}>
        {/* Agent cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {AGENTS.map((agent, i) => {
            const cfg = STATUS_CFG[agent.status] ?? STATUS_CFG.idle;
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, ease: EASE, delay: 0.2 + i * 0.06 }}
                style={{
                  borderRadius: 12, padding: '16px 18px',
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-default)',
                  boxShadow: '0 1px 3px rgba(17,24,39,0.06)',
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0, background: cfg.bg, border: `1.5px solid ${cfg.ring}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cfg.color }}>
                  <FontAwesomeIcon icon={faRobot} style={{ width: 16, height: 16 }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>{agent.name}</span>
                    <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{agent.id}</span>
                    <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: cfg.color, background: cfg.bg, padding: '2px 8px', borderRadius: 5, boxShadow: `inset 0 0 0 1px ${cfg.ring}` }}>
                      <FontAwesomeIcon icon={cfg.icon} style={{ width: 9 }} />{cfg.label}
                    </span>
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 8 }}>{agent.task}</p>
                  <div style={{ display: 'flex', gap: 18 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Model: <strong style={{ color: 'var(--text-secondary)' }}>{agent.model}</strong></span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Started: <strong style={{ color: 'var(--text-secondary)' }}>{agent.started}</strong></span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Tasks done: <strong style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{agent.completed.toLocaleString()}</strong></span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Activity log */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE, delay: 0.28 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <FontAwesomeIcon icon={faListCheck} style={{ width: 14, height: 14, color: '#411B7F' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Activity Log</h2>
          </div>
          <div style={{ padding: '4px 0' }}>
            {ACTIVITY.map((act, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '11px 18px', borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--border-subtle)' : 'none', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', flexShrink: 0, marginTop: 1 }}>{act.time}</span>
                <div style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 10.5, fontWeight: 700, color: ACT_CFG[act.type], marginBottom: 2 }}>{act.agent}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{act.action}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </PageContainer>
  );
}
