import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AppShell from './components/layout/AppShell';
import Overview from './pages/Overview';
import Alerts from './pages/Alerts';
import Incidents from './pages/Incidents';
import RootCauseAnalysis from './pages/RootCauseAnalysis';

const PAGES = {
  overview: Overview,
  alerts: Alerts,
  incidents: Incidents,
  rca: RootCauseAnalysis,
};

function ComingSoon({ label }) {
  return (
    <div className="h-full grid place-items-center px-6">
      <div className="app-card p-6 text-center max-w-md w-full">
        <p className="label-section mb-2">Module</p>
        <h2 className="text-[20px] font-semibold mb-2">{label}</h2>
        <p className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>This module is intentionally disabled in the current rollout.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);

  const Page = PAGES[page] ?? (() => <ComingSoon label={page} />);

  return (
    <AppShell activePage={page} setActivePage={setPage} collapsed={collapsed} setCollapsed={setCollapsed}>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24 }}
        >
          <Page />
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}