import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faLock,
  faLink,
  faUsers,
  faSliders,
  faShieldHalved,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';

const TABS = [
  { id: 'general',      label: 'General',      icon: faSliders },
  { id: 'notifications', label: 'Notifications', icon: faBell },
  { id: 'security',     label: 'Security',     icon: faLock },
  { id: 'integrations', label: 'Integrations', icon: faLink },
  { id: 'team',         label: 'Team',         icon: faUsers },
];

const INTEGRATIONS = [
  { name: 'Datadog',    connected: true,  logo: '🐶', desc: 'Metrics and APM data source' },
  { name: 'Prometheus', connected: true,  logo: '🔥', desc: 'Open-source metrics collection' },
  { name: 'PagerDuty',  connected: true,  logo: '📟', desc: 'On-call and incident escalation' },
  { name: 'Grafana',    connected: false, logo: '📊', desc: 'Visualization and dashboards' },
  { name: 'Splunk',     connected: false, logo: '🌐', desc: 'Log management and search' },
  { name: 'New Relic',  connected: true,  logo: '🔵', desc: 'Full-stack observability' },
];

function Toggle({ on }) {
  const [active, setActive] = useState(on);
  return (
    <button
      onClick={() => setActive((v) => !v)}
      className="relative inline-flex flex-shrink-0 h-5 w-9 rounded-full transition-colors"
      style={{
        background: active ? 'linear-gradient(135deg, #411B7F, #FE6F5E)' : 'var(--border-default)',
        border: 'none',
        cursor: 'pointer',
        transition: 'background var(--t-fast)',
      }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform"
        style={{ transform: active ? 'translateX(18px)' : 'translateX(2px)', transition: 'transform var(--t-fast)' }}
      />
    </button>
  );
}

export default function Settings() {
  const [tab, setTab] = useState('general');

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-[22px] font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}
          >
            Settings
          </h2>
          <p className="text-[13px] mt-1" style={{ color: 'var(--text-tertiary)' }}>
            Manage your platform preferences, integrations, and team access.
          </p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* ── Sidebar tabs ──────────────────────── */}
        <aside className="flex-shrink-0 w-[200px]">
          <nav className="space-y-0.5">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="w-full flex items-center gap-3 px-3 h-10 rounded-xl text-[13px] font-medium text-left transition-colors"
                style={{
                  background: tab === t.id ? 'var(--accent-primary-subtle)' : 'transparent',
                  color: tab === t.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <FontAwesomeIcon
                  icon={t.icon}
                  style={{
                    width: '13px',
                    height: '13px',
                    color: tab === t.id ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                  }}
                />
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Content panel ─────────────────────── */}
        <div className="flex-1 min-w-0">
          {tab === 'general' && (
            <div className="app-card p-6 space-y-6">
              <h3 className="text-[15px] font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                General Settings
              </h3>
              {[
                { label: 'Platform name',       value: 'Sentra AIOps',      hint: 'Displayed in header and reports' },
                { label: 'Default time range',  value: 'Last 3 hours',      hint: 'Dashboard default window' },
                { label: 'Alert threshold',     value: '15 critical',       hint: 'Escalation trigger threshold' },
                { label: 'Retention period',    value: '90 days',           hint: 'Event log retention' },
              ].map((field) => (
                <div key={field.label} className="flex items-center justify-between gap-4 pb-5 border-b last:border-b-0 last:pb-0" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div>
                    <p className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{field.label}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{field.hint}</p>
                  </div>
                  <input
                    defaultValue={field.value}
                    className="h-9 px-3 rounded-xl text-[13px] w-[180px]"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1.5px solid var(--border-default)',
                      color: 'var(--text-primary)',
                      fontFamily: 'inherit',
                      outline: 'none',
                    }}
                  />
                </div>
              ))}
              <div className="pt-2 flex justify-end">
                <button className="btn-gradient">
                  <FontAwesomeIcon icon={faCheck} style={{ width: '12px', height: '12px' }} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="app-card p-6 space-y-4">
              <h3 className="text-[15px] font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Notification Preferences
              </h3>
              {[
                { label: 'Critical alerts', sub: 'Notify immediately for P1 incidents', on: true },
                { label: 'High severity alerts', sub: 'Email + in-app for P2 issues', on: true },
                { label: 'Incident resolution', sub: 'Notify when incidents are resolved', on: false },
                { label: 'Weekly digest', sub: 'Summary email every Monday morning', on: true },
                { label: 'System updates', sub: 'Platform maintenance and releases', on: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3.5 border-b last:border-b-0"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <div>
                    <p className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{item.sub}</p>
                  </div>
                  <Toggle on={item.on} />
                </div>
              ))}
            </div>
          )}

          {tab === 'security' && (
            <div className="space-y-4">
              <div className="app-card p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-primary-subtle)' }}
                  >
                    <FontAwesomeIcon icon={faShieldHalved} style={{ width: '18px', height: '18px', color: 'var(--accent-primary)' }} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                      Security Overview
                    </h3>
                    <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      Your account security status is strong.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Two-factor authentication', active: true },
                    { label: 'SSO via Okta',              active: true },
                    { label: 'Audit logging',             active: true },
                    { label: 'IP allowlist',              active: false },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between py-2">
                      <span className="text-[13px]" style={{ color: 'var(--text-primary)' }}>{s.label}</span>
                      <Toggle on={s.active} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'integrations' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTEGRATIONS.map((integ) => (
                <div key={integ.name} className="app-card p-4 flex items-center gap-3">
                  <span className="text-[24px]">{integ.logo}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{integ.name}</p>
                    <p className="text-[11.5px] truncate" style={{ color: 'var(--text-tertiary)' }}>{integ.desc}</p>
                  </div>
                  <span
                    className="app-pill text-[11px]"
                    style={
                      integ.connected
                        ? { background: 'var(--color-success-muted)', color: 'var(--color-success)' }
                        : { background: 'var(--bg-subtle)', color: 'var(--text-tertiary)', border: '1px solid var(--border-default)' }
                    }
                  >
                    {integ.connected ? 'Connected' : 'Connect'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {tab === 'team' && (
            <div className="app-card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[15px] font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  Team Members
                </h3>
                <button className="btn-gradient">
                  <FontAwesomeIcon icon={faUsers} style={{ width: '12px', height: '12px' }} />
                  Invite
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Jane Doe',       email: 'jane@company.com',    role: 'Admin',    avatar: 'JD' },
                  { name: 'Marcus Chen',    email: 'marcus@company.com',  role: 'Engineer', avatar: 'MC' },
                  { name: 'Temi Okonkwo',   email: 'temi@company.com',    role: 'Engineer', avatar: 'TO' },
                  { name: 'Sara Patel',     email: 'sara@company.com',    role: 'Analyst',  avatar: 'SP' },
                  { name: 'Database Team',  email: 'db-team@company.com', role: 'Team',     avatar: 'DB' },
                ].map((member) => (
                  <div
                    key={member.email}
                    className="flex items-center gap-3 py-2.5 border-b last:border-b-0"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #411B7F, #FE6F5E)' }}
                    >
                      {member.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{member.name}</p>
                      <p className="text-[11.5px]" style={{ color: 'var(--text-tertiary)' }}>{member.email}</p>
                    </div>
                    <span
                      className="app-pill text-[11px]"
                      style={{ background: 'var(--accent-primary-subtle)', color: 'var(--accent-primary)' }}
                    >
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
