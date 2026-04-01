import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faArrowTrendUp,
  faCalendarDays,
  faDownload,
  faChartBar,
  faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../components/layout/PageContainer';

const REPORTS = [
  {
    id: 1,
    title: 'Weekly SLA Report',
    description: 'System availability, MTTR, and SLO compliance across all services.',
    period: 'Mar 24 – Mar 30, 2026',
    icon: faArrowTrendUp,
    status: 'Ready',
    statusColor: 'success',
    size: '2.4 MB',
  },
  {
    id: 2,
    title: 'Incident Retrospective',
    description: 'Root cause analysis summary and corrective actions for INC-2048.',
    period: 'Mar 28, 2026',
    icon: faFilePdf,
    status: 'Ready',
    statusColor: 'success',
    size: '1.1 MB',
  },
  {
    id: 3,
    title: 'Monthly Ops Review',
    description: 'Aggregated uptime metrics, top alerting services, and capacity trends.',
    period: 'March 2026',
    icon: faChartBar,
    status: 'Generating',
    statusColor: 'warning',
    size: '—',
  },
  {
    id: 4,
    title: 'Security Compliance Digest',
    description: 'Audit trail, policy violations, and access anomalies summary.',
    period: 'Q1 2026',
    icon: faCalendarDays,
    status: 'Scheduled',
    statusColor: 'info',
    size: '—',
  },
];

const BADGE_STYLES = {
  success: { bg: 'var(--color-success-muted)', color: 'var(--color-success)' },
  warning: { bg: 'var(--color-warning-muted)', color: 'var(--color-warning)' },
  info:    { bg: 'var(--accent-primary-subtle)', color: 'var(--accent-primary)' },
};

export default function Reports() {
  return (
    <PageContainer>
      {/* ── Header row ──────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-[22px] font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}
          >
            Reports
          </h2>
          <p className="text-[13px] mt-1" style={{ color: 'var(--text-tertiary)' }}>
            Download and schedule operational reports across your platform.
          </p>
        </div>
        <button className="btn-gradient">
          <FontAwesomeIcon icon={faCalendarDays} style={{ width: '13px', height: '13px' }} />
          Schedule Report
        </button>
      </div>

      {/* ── Report cards ───────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REPORTS.map((report) => {
          const badge = BADGE_STYLES[report.statusColor] ?? BADGE_STYLES.info;
          return (
            <article
              key={report.id}
              className="app-card app-card-hover p-5 flex gap-4"
              style={{ cursor: 'pointer' }}
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--accent-primary-subtle)' }}
              >
                <FontAwesomeIcon
                  icon={report.icon}
                  style={{ width: '18px', height: '18px', color: 'var(--accent-primary)' }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3
                    className="text-[14px] font-semibold"
                    style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
                  >
                    {report.title}
                  </h3>
                  <span
                    className="app-pill flex-shrink-0 text-[11px]"
                    style={{ background: badge.bg, color: badge.color }}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="text-[12.5px] leading-relaxed mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  {report.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11.5px]" style={{ color: 'var(--text-tertiary)' }}>
                    <FontAwesomeIcon icon={faClockRotateLeft} style={{ width: '10px', height: '10px' }} />
                    {report.period}
                  </span>
                  {report.status === 'Ready' && (
                    <button
                      className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
                      style={{
                        background: 'var(--accent-primary-subtle)',
                        color: 'var(--accent-primary)',
                        border: '1px solid var(--border-brand)',
                      }}
                    >
                      <FontAwesomeIcon icon={faDownload} style={{ width: '11px', height: '11px' }} />
                      {report.size}
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Summary strip ──────────────────────── */}
      <div
        className="mt-6 rounded-2xl p-5 flex flex-wrap gap-6"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {[
          { label: 'Reports Generated',  value: '128', sub: 'last 90 days' },
          { label: 'Avg. Generation Time', value: '4.2s', sub: 'across all types' },
          { label: 'Scheduled Reports',  value: '6',   sub: 'active schedules' },
          { label: 'Data Retention',     value: '12 mo', sub: 'rolling window' },
        ].map((stat) => (
          <div key={stat.label} className="flex-1 min-w-[120px]">
            <div
              className="text-[26px] font-bold"
              data-metric
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
            >
              {stat.value}
            </div>
            <div className="text-[12px] font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>
              {stat.label}
            </div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
              {stat.sub}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
