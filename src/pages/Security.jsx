import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved, faCheckCircle, faExclamationTriangle,
  faTimesCircle, faLock, faUserShield, faClipboardList,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';

const EASE = [0.25, 0.46, 0.45, 0.94];

const STATS = [
  { label: 'Security Score',   value: '87/100', color: '#059669', bg: 'rgba(5,150,105,0.08)', border: 'rgba(5,150,105,0.22)', icon: faShieldHalved },
  { label: 'Open Violations',  value: '6',      color: '#DC2626', bg: 'rgba(220,38,38,0.08)', border: 'rgba(220,38,38,0.22)', icon: faTimesCircle },
  { label: 'Policies Passing', value: '43/49',  color: '#411B7F', bg: 'rgba(65,27,127,0.08)', border: 'rgba(65,27,127,0.22)', icon: faCheckCircle },
  { label: 'Pending Reviews',  value: '11',     color: '#D97706', bg: 'rgba(217,119,6,0.08)', border: 'rgba(217,119,6,0.22)', icon: faClipboardList },
];

const FRAMEWORKS = [
  { name: 'SOC 2 Type II',   score: 94, status: 'passing', controls: '48/51', due: 'Dec 2025' },
  { name: 'ISO 27001',       score: 89, status: 'passing', controls: '93/104', due: 'Mar 2026' },
  { name: 'GDPR',            score: 82, status: 'passing', controls: '31/38',  due: 'Ongoing' },
  { name: 'PCI-DSS v4.0',    score: 71, status: 'review',  controls: '180/254', due: 'Jun 2025' },
  { name: 'HIPAA',           score: 88, status: 'passing', controls: '42/48',  due: 'Ongoing' },
];

const VIOLATIONS = [
  { id: 'V-0041', severity: 'critical', title: 'Unencrypted PII in payment-service logs',          policy: 'Data Classification', owner: 'FinOps',   age: '3d' },
  { id: 'V-0038', severity: 'high',     title: 'S3 bucket prod-backups-eu has public read ACL',    policy: 'Cloud Security',     owner: 'Platform', age: '5d' },
  { id: 'V-0035', severity: 'high',     title: 'MFA not enforced for 4 admin IAM accounts',        policy: 'Identity & Access',  owner: 'IAM',      age: '7d' },
  { id: 'V-0031', severity: 'medium',   title: 'TLS 1.1 still enabled on legacy-api endpoint',     policy: 'Transport Security', owner: 'Network',  age: '12d' },
  { id: 'V-0029', severity: 'medium',   title: 'Root account used for 3 operations last 30 days',  policy: 'Identity & Access',  owner: 'IAM',      age: '14d' },
  { id: 'V-0024', severity: 'low',      title: 'CloudTrail logs not shipped to SIEM for 2 regions', policy: 'Audit Logging',    owner: 'SecOps',   age: '18d' },
];

const SEV_CFG = {
  critical: { color: '#DC2626', bg: 'rgba(220,38,38,0.09)', ring: 'rgba(220,38,38,0.20)', label: 'Critical' },
  high:     { color: '#EA580C', bg: 'rgba(234,88,12,0.09)', ring: 'rgba(234,88,12,0.20)', label: 'High' },
  medium:   { color: '#D97706', bg: 'rgba(217,119,6,0.09)', ring: 'rgba(217,119,6,0.20)', label: 'Medium' },
  low:      { color: '#059669', bg: 'rgba(5,150,105,0.09)', ring: 'rgba(5,150,105,0.20)', label: 'Low' },
};

const FW_STATUS = {
  passing: { color: '#059669', bg: 'rgba(5,150,105,0.09)', ring: 'rgba(5,150,105,0.2)',  label: 'Passing' },
  review:  { color: '#D97706', bg: 'rgba(217,119,6,0.09)', ring: 'rgba(217,119,6,0.2)',  label: 'In Review' },
  failing: { color: '#DC2626', bg: 'rgba(220,38,38,0.09)', ring: 'rgba(220,38,38,0.2)',  label: 'Failing' },
};

function SevPill({ sev }) {
  const cfg = SEV_CFG[sev] ?? SEV_CFG.low;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 9px', borderRadius: 5, fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', background: cfg.bg, color: cfg.color, boxShadow: `inset 0 0 0 1px ${cfg.ring}` }}>
      {cfg.label}
    </span>
  );
}

export default function Security() {
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

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 14, alignItems: 'start' }}>
        {/* Compliance frameworks */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE, delay: 0.22 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <FontAwesomeIcon icon={faLock} style={{ width: 14, height: 14, color: '#411B7F' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Compliance Frameworks</h2>
          </div>
          {FRAMEWORKS.map((fw, i) => {
            const cfg = FW_STATUS[fw.status] ?? FW_STATUS.passing;
            const barColor = fw.score >= 90 ? '#059669' : fw.score >= 75 ? '#D97706' : '#DC2626';
            return (
              <div key={fw.name} style={{ padding: '14px 20px', borderBottom: i < FRAMEWORKS.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>{fw.name}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 5, fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', background: cfg.bg, color: cfg.color, boxShadow: `inset 0 0 0 1px ${cfg.ring}` }}>{cfg.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                  <div style={{ flex: 1, height: 5, borderRadius: 999, background: 'var(--bg-subtle)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${fw.score}%` }}
                      transition={{ duration: 0.55, ease: EASE, delay: 0.4 + i * 0.06 }}
                      style={{ height: '100%', borderRadius: 999, background: barColor }}
                    />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: barColor, fontFamily: 'var(--font-mono)', minWidth: 32 }}>{fw.score}%</span>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Controls: <strong style={{ color: 'var(--text-secondary)' }}>{fw.controls}</strong></span>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Due: <strong style={{ color: 'var(--text-secondary)' }}>{fw.due}</strong></span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Violations table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE, delay: 0.28 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ width: 14, height: 14, color: '#DC2626' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Open Violations</h2>
            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: '#DC2626', background: 'rgba(220,38,38,0.09)', padding: '2px 9px', borderRadius: 5 }}>6 open</span>
          </div>
          {VIOLATIONS.map((v, i) => (
            <div key={v.id} className="data-row" style={{ display: 'flex', gap: 14, padding: '13px 20px', borderBottom: i < VIOLATIONS.length - 1 ? '1px solid var(--border-subtle)' : 'none', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                  <SevPill sev={v.severity} />
                  <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{v.id}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.4 }}>{v.title}</p>
                <div style={{ display: 'flex', gap: 14 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Policy: <strong style={{ color: 'var(--text-secondary)' }}>{v.policy}</strong></span>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Owner: <strong style={{ color: 'var(--text-secondary)' }}>{v.owner}</strong></span>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Open {v.age}</span>
                </div>
              </div>
              <button style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600, color: '#411B7F', background: 'rgba(65,27,127,0.07)', border: '1px solid rgba(65,27,127,0.18)', borderRadius: 7, padding: '5px 11px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Review <FontAwesomeIcon icon={faArrowRight} style={{ width: 9 }} />
              </button>
            </div>
          ))}
        </motion.div>
      </section>
    </PageContainer>
  );
}
