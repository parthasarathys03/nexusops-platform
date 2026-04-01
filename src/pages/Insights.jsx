import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp, faArrowDown, faChartBar, faChartLine,
  faFire, faLightbulb, faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';

const EASE = [0.25, 0.46, 0.45, 0.94];

const KPIS = [
  { label: 'Avg MTTR',       value: '18m 42s', delta: -12, unit: 'vs last week', color: '#059669' },
  { label: 'Alert Volume',   value: '2,841',   delta: +8,  unit: 'this week',    color: '#DC2626' },
  { label: 'Noise Ratio',    value: '23%',     delta: -5,  unit: 'actionable alerts', color: '#411B7F' },
  { label: 'Incidents',      value: '14',      delta: -3,  unit: 'this month',   color: '#D97706' },
];

const TOP_SERVICES = [
  { name: 'payment-service',  alerts: 38, mttr: '24m', trend: 'up' },
  { name: 'api-gateway',      alerts: 27, mttr: '11m', trend: 'down' },
  { name: 'auth-service',     alerts: 19, mttr: '8m',  trend: 'down' },
  { name: 'checkout-service', alerts: 15, mttr: '31m', trend: 'up' },
  { name: 'postgres-cluster', alerts: 9,  mttr: '4m',  trend: 'down' },
];

const INSIGHTS_LIST = [
  { icon: faFire,                color: '#DC2626', bg: 'rgba(220,38,38,0.09)',   border: 'rgba(220,38,38,0.20)',   title: 'Alert spike on payment-service', body: 'Payment alerts up 38% this week. DB connection pool exhaustion appears as root pattern across 12 of 16 incidents.', tag: 'Pattern Detected' },
  { icon: faLightbulb,           color: '#411B7F', bg: 'rgba(65,27,127,0.08)',   border: 'rgba(65,27,127,0.18)',   title: 'MTTR improved by 18% vs last month', body: 'Faster runbook adoption and AI-suggested remediations reduced average resolution time significantly for critical-tier services.', tag: 'Improvement' },
  { icon: faExclamationTriangle, color: '#D97706', bg: 'rgba(217,119,6,0.08)',   border: 'rgba(217,119,6,0.18)',   title: 'Noise ratio above target (23% vs 15%)', body: 'Alert threshold misconfiguration on auth-service is generating 140+ false positives per day. Recommend threshold tuning.', tag: 'Action Required' },
];

// Simple bar chart data (7 days)
const BAR_DATA = [
  { day: 'Mon', val: 380 },
  { day: 'Tue', val: 510 },
  { day: 'Wed', val: 290 },
  { day: 'Thu', val: 640 },
  { day: 'Fri', val: 420 },
  { day: 'Sat', val: 180 },
  { day: 'Sun', val: 230 },
];
const MAX_VAL = Math.max(...BAR_DATA.map(d => d.val));

export default function Insights() {
  return (
    <PageContainer>
      {/* KPI row */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
        {KPIS.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: EASE, delay: i * 0.05 }}
            className="app-card"
            style={{ padding: '18px 20px 16px' }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-secondary)', marginBottom: 10 }}>{k.label}</p>
            <p style={{ fontSize: '1.95rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', lineHeight: 1, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>{k.value}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: k.delta < 0 ? '#059669' : '#DC2626' }}>
                <FontAwesomeIcon icon={k.delta < 0 ? faArrowDown : faArrowUp} style={{ width: 10, marginRight: 3 }} />
                {Math.abs(k.delta)}%
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{k.unit}</span>
            </div>
          </motion.div>
        ))}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 14, marginBottom: 14 }}>
        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE, delay: 0.22 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <FontAwesomeIcon icon={faChartBar} style={{ width: 14, height: 14, color: '#411B7F' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Alert Volume — Last 7 Days</h2>
          </div>
          <div style={{ padding: '20px 24px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 }}>
              {BAR_DATA.map((d, i) => {
                const pct = (d.val / MAX_VAL) * 100;
                return (
                  <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{d.val}</span>
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: `${pct}%` }}
                      transition={{ duration: 0.55, ease: EASE, delay: 0.3 + i * 0.06 }}
                      style={{
                        width: '100%', borderRadius: '5px 5px 2px 2px',
                        background: d.val === MAX_VAL
                          ? 'linear-gradient(180deg,#FE6F5E,#D94F3E)'
                          : 'linear-gradient(180deg,#5B2DA6,#411B7F)',
                      }}
                    />
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)' }}>{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Top noisy services */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE, delay: 0.28 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <FontAwesomeIcon icon={faChartLine} style={{ width: 14, height: 14, color: '#411B7F' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Top Noisy Services</h2>
          </div>
          <div>
            {TOP_SERVICES.map((svc, i) => (
              <div key={svc.name} style={{ display: 'flex', alignItems: 'center', padding: '11px 20px', borderBottom: i < TOP_SERVICES.length - 1 ? '1px solid var(--border-subtle)' : 'none', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', minWidth: 16, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>#{i + 1}</span>
                <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{svc.name}</span>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{svc.alerts} alerts</span>
                <span style={{ fontSize: 11, color: svc.trend === 'up' ? '#DC2626' : '#059669', fontWeight: 700 }}>
                  <FontAwesomeIcon icon={svc.trend === 'up' ? faArrowUp : faArrowDown} style={{ width: 10 }} />
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI Insights list */}
      <motion.section
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: EASE, delay: 0.35 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em', marginBottom: 2 }}>AI-Generated Insights</h2>
        {INSIGHTS_LIST.map((ins) => (
          <div key={ins.title} style={{
            display: 'flex', gap: 16, padding: '16px 20px', borderRadius: 12,
            background: 'var(--bg-surface)', border: `1.5px solid ${ins.border}`,
            boxShadow: '0 1px 3px rgba(17,24,39,0.06)',
          }}>
            <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 9, background: ins.bg, border: `1.5px solid ${ins.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ins.color }}>
              <FontAwesomeIcon icon={ins.icon} style={{ width: 15, height: 15 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>{ins.title}</span>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: ins.color, background: ins.bg, padding: '2px 8px', borderRadius: 4 }}>{ins.tag}</span>
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{ins.body}</p>
            </div>
          </div>
        ))}
      </motion.section>
    </PageContainer>
  );
}
