import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved, faExclamationTriangle, faLock, faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';
import { StatStrip } from '../components/ui/StatStrip';

const EASE = [0.25, 0.46, 0.45, 0.94];

const FRAMEWORKS = [
  { name: 'SOC 2 Type II', score: 94, status: 'passing', controls: '48/51',   due: 'Dec 2025' },
  { name: 'ISO 27001',     score: 89, status: 'passing', controls: '93/104',  due: 'Mar 2026' },
  { name: 'GDPR',          score: 82, status: 'passing', controls: '31/38',   due: 'Ongoing' },
  { name: 'PCI-DSS v4.0',  score: 71, status: 'review',  controls: '180/254', due: 'Jun 2025' },
  { name: 'HIPAA',         score: 88, status: 'passing', controls: '42/48',   due: 'Ongoing' },
];

const VIOLATIONS = [
  { id: 'V-0041', severity: 'critical', title: 'Unencrypted PII in payment-service logs',         policy: 'Data Classification', owner: 'FinOps',   age: '3d' },
  { id: 'V-0038', severity: 'high',     title: 'S3 bucket prod-backups-eu has public read ACL',   policy: 'Cloud Security',     owner: 'Platform', age: '5d' },
  { id: 'V-0035', severity: 'high',     title: 'MFA not enforced for 4 admin IAM accounts',       policy: 'Identity & Access',  owner: 'IAM',      age: '7d' },
  { id: 'V-0031', severity: 'medium',   title: 'TLS 1.1 still enabled on legacy-api endpoint',    policy: 'Transport Security', owner: 'Network',  age: '12d' },
  { id: 'V-0029', severity: 'medium',   title: 'Root account used 3× in last 30 days',            policy: 'Identity & Access',  owner: 'IAM',      age: '14d' },
  { id: 'V-0024', severity: 'low',      title: 'CloudTrail not shipped to SIEM for 2 regions',    policy: 'Audit Logging',      owner: 'SecOps',   age: '18d' },
];

const SEV_CFG = {
  critical: { color: '#DC2626', bg: 'rgba(220,38,38,0.09)', ring: 'rgba(220,38,38,0.18)', label: 'Critical' },
  high:     { color: '#EA580C', bg: 'rgba(234,88,12,0.09)', ring: 'rgba(234,88,12,0.18)', label: 'High' },
  medium:   { color: '#D97706', bg: 'rgba(217,119,6,0.09)', ring: 'rgba(217,119,6,0.18)', label: 'Medium' },
  low:      { color: '#059669', bg: 'rgba(5,150,105,0.09)', ring: 'rgba(5,150,105,0.18)', label: 'Low' },
};

const FW_STATUS = {
  passing: { color: '#059669', bar: '#059669' },
  review:  { color: '#D97706', bar: '#D97706' },
  failing: { color: '#DC2626', bar: '#DC2626' },
};

function SevPill({ sev }) {
  const cfg = SEV_CFG[sev] ?? SEV_CFG.low;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 4, fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', background: cfg.bg, color: cfg.color, boxShadow: `inset 0 0 0 1px ${cfg.ring}`, whiteSpace: 'nowrap' }}>
      {cfg.label}
    </span>
  );
}

export default function Security() {
  return (
    <PageContainer>
      <StatStrip stats={[
        { label: 'Security Score',   value: '87/100', sub: 'Strong' },
        { label: 'Open Violations',  value: '6',      valueColor: 'var(--color-error)' },
        { label: 'Policies Passing', value: '43/49' },
        { label: 'Pending Reviews',  value: '11',     valueColor: 'var(--color-warning)' },
      ]} />

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 14, alignItems: 'start' }}>
        {/* Compliance frameworks */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: EASE, delay: 0.12 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FontAwesomeIcon icon={faLock} style={{ width: 13, height: 13, color: 'var(--text-tertiary)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Compliance Frameworks</h2>
          </div>
          {FRAMEWORKS.map((fw, i) => {
            const cfg = FW_STATUS[fw.status] ?? FW_STATUS.passing;
            return (
              <div key={fw.name} style={{ padding: '13px 20px', borderBottom: i < FRAMEWORKS.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>{fw.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: cfg.color }}>{fw.score}%</span>
                </div>
                <div style={{ height: 4, borderRadius: 999, background: 'var(--bg-subtle)', overflow: 'hidden', marginBottom: 6 }}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${fw.score}%` }}
                    transition={{ duration: 0.45, ease: EASE, delay: 0.3 + i * 0.05 }}
                    style={{ height: '100%', borderRadius: 999, background: cfg.bar }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Controls: <strong style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{fw.controls}</strong></span>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Due: <strong style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{fw.due}</strong></span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Violations */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: EASE, delay: 0.18 }}
          className="app-card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ width: 13, height: 13, color: '#DC2626' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.018em' }}>Open Violations</h2>
            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: '#DC2626' }}>6 open</span>
          </div>
          {VIOLATIONS.map((v, i) => (
            <div key={v.id} style={{ display: 'flex', gap: 14, padding: '12px 20px', borderBottom: i < VIOLATIONS.length - 1 ? '1px solid var(--border-subtle)' : 'none', alignItems: 'flex-start', transition: 'background 120ms ease', cursor: 'default' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <SevPill sev={v.severity} />
                  <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{v.id}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3, lineHeight: 1.4 }}>{v.title}</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{v.policy}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{v.owner}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{v.age}</span>
                </div>
              </div>
              <button style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 600, color: '#411B7F', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 0', opacity: 0.8 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
              >
                Review <FontAwesomeIcon icon={faArrowRight} style={{ width: 9 }} />
              </button>
            </div>
          ))}
        </motion.div>
      </section>
    </PageContainer>
  );
}
