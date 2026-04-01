import Sidebar from './Sidebar';
import Header from '../Header';

export default function AppShell({ activePage, setActivePage, collapsed, setCollapsed, children }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <Header activePage={activePage} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}