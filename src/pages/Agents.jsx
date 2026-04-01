import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt, faPauseCircle, faRobot, faListCheck,
  faArrowUp, faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';
import { StatStrip } from '../components/ui/StatStrip';

const EASE = [0.25, 0.46, 0.45, 0.94];

const AGENTS = [
  { name: 'RCA Investigator', id: 'agent-rca-01', status: 'running', task: 'Analysing payment-service connection pool exhaustion — correlating 8 signals across 3 layers', started: '4m ago', completed: 142, model: 'GPT-4o' },
  { name: 'Alert Correlator', id: 'agent-corr-02', status: 'running', task: 'Grouping 38 alerts from last 2 hours into incident clusters', started: '12m ago', completed: 891, model: 'Claude 3.5' },
  { name: 'Runbook Executor', id: 'agent-rb-03', status: 'running', task: 'Executing auto-remediation runbook for api-gateway CPU spike (step 3/5)', started: '2m ago', completed: 54, model: 'GPT-4o-mini' },
  { name: 'Capacity Planner', id: 'agent-cap-04', status: 'idle', task: 'Waiting for next scheduled analysis at 18:00 UTC', started: '2h ago', completed: 310, model: 'Claude 3.5' },
  { name: 'Log Summariser',   id: 'agent-log-05', status: 'idle', task: 'Summarising error logs for 6 services — queued behind RCA Investigator', started: '8m ago', completed: 2040, model: 'GPT-4o-mini' },
  { name: 'SLO Guardian',     id: 'agent-slo-06', status: 'running', task: 'Monitoring SLO burn rates; api-gateway at 3.2× burn — escalation threshold approaching', started: '18m ago', completed: 207, model: 'Claude 3.5' },
];

const ACTIVITY = [
  { time: '14:32', agent: 'RCA Investigator', action: 'Identified root cause: DB conn pool limit (max=100, used=100)', type: 'success' },
  { time: '14:28', agent: 'Alert Correlator', action: 'Merged 12 alerts into incident INC-0041 — payment cluster', type: 'info' },
  { time: '14:21', agent: 'Runbook Executor', action: 'Executed step 2/5: increased pool size to 150 on prod-db-01', type: 'success' },
  { time: '14:15', agent: 'SLO Guardian',     action: 'WARNING: api-gateway SLO burn rate at 3.2× — paging on-call', type: 'warning' },
  { time: '14:08', agent: 'Log Summariser',   action: 'Generated 6-service error digest — 340 log lines → 4 bullets', type: 'info' },
  { time: '13:55', agent: 'Capacity Planner', action: 'Forecast: payment-service needs +40% compute by next Thursday', type: 'info' },
];

const STATUS_CFG = {
  running: { color: '#411B7F', bg: 'rgba(65,27,127,0.08)', ring: 'rgba(65,27,127,0.18)', label: 'Running', icon: faBolt },
  idle:    { color: '#6B7280', bg: 'rgba(107,114,128,0.07)', ring: 'rgba(107,114,128,0.15)', label: 'Idle', icon: faPauseCircle },
};

const ACT_COLOR = { success: '#059669', warning: '#D97706', info: '#411B7F' };

export default function Agents() {
  return (
    <PageContainer>
      <StatStrip stats={[
        { label: 'Active Agents',   value: '8' },
        { label: 'Tasks Completed', value: '1,204' },
        { label: 'In Progress',     value: '23' },
        { label: 'Avg Task Time',   value: '4m 12s' },
      ]} />

      <section style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 12, alignItems: 'start' }}>
        {/* Agent cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {AGENTS.map((agent, i) => {
            const cfg = STATUS_CFG[agent.status] ?? STATUS_CFG.idle;
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.17, ease: EASE, delay: 0.08 + i * 0.04 }}
                className="app-card"
                style={{ padding: '13px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}
              >
                <FontAwesomeIcon icon={faRobot} style={{ width: 14, height: 14, color: cfg.color, flexShrink: 0, marginTop: 3 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>{agent.name}</span>
                    <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{agent.id}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: cfg.color, background: cfg.bg, padding: '2px 8px', borderRadius: 4, boxShadow: `inset 0 0 0 1px ${cfg.ring}` }}>
                      {cfg.label}
                    </span>
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 7 }}>{agent.task}</p>
                  <div style={{ display: 'flex', gap: 18 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Model: <strong style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{agent.model}</strong></span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Started {agent.started}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{agent.completed.toLocaleString()} tasks done</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Activity log */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: EASE, delay: 0.14 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '14px 18px 12px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FontAwesomeIcon icon={faListCheck} style={{ width: 13, height: 13, color: 'var(--text-tertiary)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Activity Log</h2>
          </div>
          {ACTIVITY.map((act, i) => (
            <div key={i} style={{ display: 'flex', gap: 11, padding: '10px 18px', borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--border-subtle)' : 'none', alignItems: 'flex-start' }}>
              <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', flexShrink: 0, marginTop: 1 }}>{act.time}</span>
              <div style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 10.5, fontWeight: 700, color: ACT_COLOR[act.type], marginBottom: 2 }}>{act.agent}</span>
                <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{act.action}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </PageContainer>
  );
}
