import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp, faArrowDown, faChartBar, faChartLine,
  faFire, faLightbulb, faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';
import { StatStrip } from '../components/ui/StatStrip';

const EASE = [0.25, 0.46, 0.45, 0.94];

const TOP_SERVICES = [
  { name: 'payment-service',  alerts: 38, mttr: '24m', trend: 'up' },
  { name: 'api-gateway',      alerts: 27, mttr: '11m', trend: 'down' },
  { name: 'auth-service',     alerts: 19, mttr: '8m',  trend: 'down' },
  { name: 'checkout-service', alerts: 15, mttr: '31m', trend: 'up' },
  { name: 'postgres-cluster', alerts: 9,  mttr: '4m',  trend: 'down' },
];

const INSIGHTS_LIST = [
  { icon: faFire,                color: '#DC2626', bg: 'rgba(220,38,38,0.08)',  border: 'rgba(220,38,38,0.16)',  title: 'Alert spike on payment-service', body: 'Payment alerts up 38% this week. DB connection pool exhaustion appears as root pattern across 12 of 16 incidents.', tag: 'Pattern' },
  { icon: faLightbulb,           color: '#411B7F', bg: 'rgba(65,27,127,0.07)', border: 'rgba(65,27,127,0.15)', title: 'MTTR improved by 18% vs last month', body: 'Faster runbook adoption and AI-suggested remediations reduced average resolution time for critical-tier services.', tag: 'Improvement' },
  { icon: faExclamationTriangle, color: '#D97706', bg: 'rgba(217,119,6,0.07)', border: 'rgba(217,119,6,0.15)', title: 'Noise ratio above target (23% vs 15%)', body: 'Alert threshold misconfiguration on auth-service is generating 140+ false positives per day. Recommend threshold tuning.', tag: 'Action' },
];

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
      <StatStrip stats={[
        { label: 'Avg MTTR',     value: '18m 42s', sub: '↓ 12% vs last week' },
        { label: 'Alert Volume', value: '2,841',   sub: 'this week' },
        { label: 'Noise Ratio',  value: '23%',     valueColor: 'var(--color-warning)', sub: 'target: 15%' },
        { label: 'Incidents',    value: '14',      sub: 'this month' },
      ]} />

      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 12, marginBottom: 12 }}>
        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: EASE, delay: 0.1 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FontAwesomeIcon icon={faChartBar} style={{ width: 13, height: 13, color: 'var(--text-tertiary)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Alert Volume — Last 7 Days</h2>
          </div>
          <div style={{ padding: '20px 24px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 130 }}>
              {BAR_DATA.map((d, i) => {
                const pct = (d.val / MAX_VAL) * 100;
                return (
                  <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, height: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{d.val}</span>
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: `${pct}%` }}
                      transition={{ duration: 0.32, ease: EASE, delay: 0.14 + i * 0.04 }}
                      style={{
                        width: '100%', borderRadius: '4px 4px 2px 2px',
                        background: d.val === MAX_VAL ? '#FE6F5E' : '#411B7F',
                        opacity: d.val === MAX_VAL ? 1 : 0.7,
                      }}
                    />
                    <span style={{ fontSize: 10.5, fontWeight: 500, color: 'var(--text-tertiary)' }}>{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Top noisy services */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: EASE, delay: 0.14 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FontAwesomeIcon icon={faChartLine} style={{ width: 13, height: 13, color: 'var(--text-tertiary)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Top Noisy Services</h2>
          </div>
          <div>
            {TOP_SERVICES.map((svc, i) => (
              <div key={svc.name} style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderBottom: i < TOP_SERVICES.length - 1 ? '1px solid var(--border-subtle)' : 'none', gap: 12, transition: 'background 120ms ease', cursor: 'default' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', minWidth: 18, fontFamily: 'var(--font-mono)' }}>#{i + 1}</span>
                <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{svc.name}</span>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{svc.alerts}</span>
                <span style={{ fontSize: 11, color: svc.trend === 'up' ? '#DC2626' : '#059669', fontWeight: 600 }}>
                  <FontAwesomeIcon icon={svc.trend === 'up' ? faArrowUp : faArrowDown} style={{ width: 9 }} />
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI Insights */}
      <motion.section
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: EASE, delay: 0.18 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 10.5, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>AI-Generated Insights</h2>
        {INSIGHTS_LIST.map((ins) => (
          <div key={ins.title} style={{ display: 'flex', gap: 14, padding: '13px 16px', borderRadius: 8, background: 'var(--bg-surface)', border: `1px solid ${ins.border}` }}>
            <FontAwesomeIcon icon={ins.icon} style={{ width: 14, height: 14, color: ins.color, flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>{ins.title}</span>
                <span style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: ins.color, opacity: 0.9 }}>{ins.tag}</span>
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{ins.body}</p>
            </div>
          </div>
        ))}
      </motion.section>
    </PageContainer>
  );
}
