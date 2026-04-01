import Sidebar from './Sidebar';
import Header from '../Header';

export default function AppShell({
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
  isDark,
  toggleTheme,
  children,
}) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <Header
          activePage={activePage}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
        <main className="flex-1 overflow-auto" style={{ background: 'var(--bg-base)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
