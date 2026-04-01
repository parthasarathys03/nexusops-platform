import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClockRotateLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

const PAGE_META = {
  overview: 'Dashboard',
  alerts: 'Alerts',
  incidents: 'Incidents',
  rca: 'Analytics',
};

export default function Header({ activePage }) {
  const title = PAGE_META[activePage] ?? 'Module';

  return (
    <header className="h-14 px-6 flex items-center gap-4 border-b sticky top-0 z-20" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(5,11,24,0.78)', backdropFilter: 'blur(12px)' }}>
      <div>
        <p className="text-[10px] tracking-[0.10em] uppercase" style={{ color: 'var(--text-tertiary)' }}>AIOps Platform</p>
        <h1 className="text-[18px] font-semibold leading-tight">{title}</h1>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <label className="h-9 w-[260px] rounded-lg px-3 flex items-center gap-2" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
          <FontAwesomeIcon icon={faSearch} className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
          <input placeholder="Search services, alerts, incidents" className="bg-transparent border-none outline-none text-[13px] w-full" style={{ color: 'var(--text-primary)' }} />
        </label>
        <button className="h-9 px-3 rounded-lg text-[12px] font-medium inline-flex items-center gap-2" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
          <FontAwesomeIcon icon={faClockRotateLeft} className="w-3 h-3" />
          Last 3h
        </button>
        <button className="w-9 h-9 rounded-lg" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
          <FontAwesomeIcon icon={faBell} className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}