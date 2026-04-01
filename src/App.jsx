import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AppShell from './components/layout/AppShell';
import Overview from './pages/Overview';
import Alerts from './pages/Alerts';
import Incidents from './pages/Incidents';
import RootCauseAnalysis from './pages/RootCauseAnalysis';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Observe from './pages/Observe';
import Insights from './pages/Insights';
import Agents from './pages/Agents';
import Factory from './pages/Factory';
import Security from './pages/Security';

const PAGES = {
  overview:  Overview,
  alerts:    Alerts,
  incidents: Incidents,
  rca:       RootCauseAnalysis,
  reports:   Reports,
  settings:  Settings,
  profile:   Profile,
  observe:   Observe,
  insights:  Insights,
  agents:    Agents,
  factory:   Factory,
  security:  Security,
};

function ComingSoon({ label }) {
  return (
    <div className="h-full grid place-items-center px-6 py-16">
      <div
        className="app-card p-8 text-center max-w-sm w-full"
        style={{ border: '1px solid var(--border-brand)' }}
      >
        <div
          className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          style={{ background: 'var(--accent-primary-subtle)' }}
        >
          <span style={{ fontSize: '22px' }}>🚧</span>
        </div>
        <p className="label-section mb-2">Module</p>
        <h2
          className="text-[18px] font-bold mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          {label}
        </h2>
        <p className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
          This module is part of the upcoming release. Stay tuned.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('sentra-theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('sentra-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const Page = PAGES[page] ?? (() => <ComingSoon label={page} />);

  return (
    <AppShell
      activePage={page}
      setActivePage={setPage}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      isDark={isDark}
      toggleTheme={() => setIsDark((v) => !v)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="h-full"
        >
          <Page />
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
