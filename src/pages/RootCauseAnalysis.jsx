import PageContainer from '../components/layout/PageContainer';

const EVIDENCE = [
  { id: 1, confidence: '97%', title: 'PostgreSQL connection pool exhausted', details: 'Pool max_connections reached cap; all new requests queued.' },
  { id: 2, confidence: '94%', title: 'Connection timeout flood in payment-service', details: '8,312 timeout events across payment-service pods.' },
  { id: 3, confidence: '91%', title: 'Checkout-to-payment distributed span timeout', details: 'Trace chain confirms causal dependency and cascade.' },
];

const ACTIONS = [
  { id: 1, priority: 'Immediate', title: 'Rollback order-service to v3.1.1', status: 'In progress' },
  { id: 2, priority: 'Immediate', title: 'Increase DB pool 100 to 500', status: 'Done' },
  { id: 3, priority: 'Short-term', title: 'Block locking migrations in CI', status: 'Pending' },
];

export default function RootCauseAnalysis() {
  return (
    <PageContainer>
      <section className="app-card p-6 mb-4" style={{ background: 'linear-gradient(135deg, rgba(45,126,255,0.12) 0%, rgba(0,200,232,0.08) 100%)' }}>
        <p className="label-section mb-2">AI Root Cause Analysis</p>
        <h2 className="text-[20px] font-semibold mb-2">Deployment-triggered schema migration caused DB saturation and service timeout cascade</h2>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="app-pill" style={{ background: 'var(--color-success-muted)', color: 'var(--color-success)' }}>94% confidence</span>
          <span className="app-pill" style={{ background: 'var(--color-error-muted)', color: 'var(--severity-critical)' }}>18,000 users impacted</span>
          <span className="app-pill" style={{ background: 'var(--accent-primary-subtle)', color: 'var(--accent-primary)' }}>4 services directly affected</span>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <article className="app-card p-4">
          <h3 className="text-[16px] font-semibold mb-3">Evidence Chain</h3>
          <div className="space-y-2">
            {EVIDENCE.map((item) => (
              <div key={item.id} className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
                <div className="flex items-center justify-between gap-3 mb-1">
                  <p className="text-[13px] font-medium">{item.title}</p>
                  <span className="text-[11px] metric" style={{ color: 'var(--accent-primary)' }}>{item.confidence}</span>
                </div>
                <p className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>{item.details}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="app-card p-4">
          <h3 className="text-[16px] font-semibold mb-3">Recommended Actions</h3>
          <div className="space-y-2">
            {ACTIONS.map((action) => (
              <div key={action.id} className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="app-pill" style={{ background: 'var(--accent-primary-subtle)', color: 'var(--accent-primary)' }}>{action.priority}</span>
                  <span className="app-pill" style={{ background: 'var(--bg-subtle)', color: 'var(--text-secondary)' }}>{action.status}</span>
                </div>
                <p className="text-[13px] font-medium">{action.title}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </PageContainer>
  );
}