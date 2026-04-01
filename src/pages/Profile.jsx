import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faBuilding,
  faLocationDot,
  faPen,
  faShield,
  faBell,
  faClockRotateLeft,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';

const ACTIVITY = [
  { action: 'Declared incident INC-2048',  time: '34 minutes ago',  type: 'incident' },
  { action: 'Updated alert threshold to 15', time: '2 hours ago',    type: 'settings' },
  { action: 'Acknowledged alert ALT-1082',   time: '3 hours ago',    type: 'alert' },
  { action: 'Ran Root Cause Analysis',       time: 'Yesterday',      type: 'analysis' },
  { action: 'Invited Temi Okonkwo to team',  time: '2 days ago',     type: 'team' },
];

const ACTIVITY_COLORS = {
  incident: { bg: 'var(--color-error-muted)',   dot: 'var(--severity-critical)' },
  settings: { bg: 'var(--bg-subtle)',           dot: 'var(--text-tertiary)' },
  alert:    { bg: 'var(--color-warning-muted)', dot: 'var(--color-warning)' },
  analysis: { bg: 'var(--accent-primary-subtle)', dot: 'var(--accent-primary)' },
  team:     { bg: 'var(--color-success-muted)', dot: 'var(--color-success)' },
};

export default function Profile() {
  return (
    <PageContainer>
      <div className="max-w-[860px]">
        {/* ── Profile header card ─────────────── */}
        <div
          className="app-card mb-4 overflow-hidden"
          style={{ padding: 0 }}
        >
          {/* Gradient banner */}
          <div
            className="h-24 w-full"
            style={{ background: 'linear-gradient(135deg, #411B7F 0%, #FE6F5E 100%)', opacity: 0.9 }}
          />

          {/* Avatar + info row */}
          <div className="px-6 pb-6">
            <div className="flex items-end gap-5 -mt-8 mb-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-[22px] font-bold text-white flex-shrink-0 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #411B7F, #FE6F5E)',
                  border: '3px solid var(--bg-surface)',
                }}
              >
                JD
              </div>
              <div className="flex-1 pt-4">
                <h2
                  className="text-[20px] font-bold leading-tight"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}
                >
                  Jane Doe
                </h2>
                <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                  Platform Administrator · Engineering
                </p>
              </div>
              <button className="btn-outline flex-shrink-0">
                <FontAwesomeIcon icon={faPen} style={{ width: '11px', height: '11px' }} />
                Edit Profile
              </button>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-5">
              {[
                { icon: faEnvelope,     label: 'jane@company.com' },
                { icon: faBuilding,     label: 'Acme Corp' },
                { icon: faLocationDot,  label: 'San Francisco, CA' },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                  <FontAwesomeIcon icon={item.icon} style={{ width: '12px', height: '12px', color: 'var(--text-tertiary)' }} />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4">
          {/* ── Left: details ──────────────────── */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="app-card p-5">
              <h3 className="text-[14px] font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Activity Summary
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Incidents Declared',  value: '24' },
                  { label: 'Alerts Acknowledged', value: '183' },
                  { label: 'RCAs Completed',      value: '9' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3.5 text-center"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
                  >
                    <div
                      className="text-[26px] font-bold"
                      data-metric
                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.03em' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[11px] mt-1 font-medium" style={{ color: 'var(--text-tertiary)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="app-card p-5">
              <h3 className="text-[14px] font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Recent Activity
              </h3>
              <div className="space-y-1">
                {ACTIVITY.map((item, i) => {
                  const colors = ACTIVITY_COLORS[item.type] ?? ACTIVITY_COLORS.settings;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2.5 border-b last:border-b-0"
                      style={{ borderColor: 'var(--border-subtle)' }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: colors.dot }}
                      />
                      <p className="flex-1 text-[13px]" style={{ color: 'var(--text-primary)' }}>
                        {item.action}
                      </p>
                      <span className="text-[11.5px] flex-shrink-0" style={{ color: 'var(--text-tertiary)' }}>
                        <FontAwesomeIcon icon={faClockRotateLeft} className="mr-1" style={{ width: '9px' }} />
                        {item.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: quick actions ────────────── */}
          <div className="space-y-4">
            <div className="app-card p-5">
              <h3 className="text-[14px] font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { icon: faPen,              label: 'Edit Profile Details' },
                  { icon: faShield,           label: 'Security Settings' },
                  { icon: faBell,             label: 'Notification Preferences' },
                  { icon: faRightFromBracket, label: 'Sign Out', danger: true },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-left transition-colors"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: action.danger ? 'var(--color-error)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                  >
                    <FontAwesomeIcon
                      icon={action.icon}
                      style={{
                        width: '13px',
                        height: '13px',
                        color: action.danger ? 'var(--color-error)' : 'var(--text-tertiary)',
                      }}
                    />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-4"
              style={{
                background: 'var(--accent-primary-subtle)',
                border: '1px solid var(--border-brand)',
              }}
            >
              <p className="text-[12px] font-semibold mb-1" style={{ color: 'var(--accent-primary)' }}>
                Role Permissions
              </p>
              <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
                You have <strong>Administrator</strong> access — full read/write across all modules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
