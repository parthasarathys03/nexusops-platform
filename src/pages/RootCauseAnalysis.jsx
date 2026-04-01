import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRobot,
  faChevronRight,
  faCircleCheck,
  faArrowRight,
  faClock,
  faChartLine,
  faDatabase,
  faCodeBranch,
  faBolt,
  faServer,
  faNetworkWired,
  faGlobe,
  faArrowUpRightFromSquare,
  faCopy,
  faThumbsUp,
  faThumbsDown,
  faShareNodes,
  faChevronDown,
  faEye,
  faBullseye,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'

const EVIDENCE = [
  { id: 1, type: 'metric', conf: 97, sev: 'critical', title: 'PostgreSQL connection pool exhausted', detail: 'Pool max_connections reached capacity, queuing all new requests.', before: '2', after: '847', ts: '23:41:18 UTC', root: true },
  { id: 2, type: 'log', conf: 94, sev: 'critical', title: 'Connection timeout flood in payment-service', detail: '8,312 timeout errors across payment-service instances.', before: '0.2%', after: '89.4%', ts: '23:41:19 UTC' },
  { id: 3, type: 'trace', conf: 91, sev: 'critical', title: 'Checkout to payment span timeouts', detail: 'Distributed traces confirm full causal chain.', before: '45ms', after: 'TIMEOUT', ts: '23:41:21 UTC' },
  { id: 4, type: 'metric', conf: 88, sev: 'high', title: 'Migration query held lock', detail: 'ACCESS EXCLUSIVE lock held for 4m 12s during peak traffic.', before: '<1s', after: '252s', ts: '23:38:00 UTC' },
]

const RECOMMENDATIONS = [
  { id: 1, pri: 'Immediate', status: 'In Progress', title: 'Rollback order-service to v3.1.1', detail: 'Eliminates the migration lock trigger.', cmd: 'kubectl rollout undo deployment/order-service --to-revision=4 -n production' },
  { id: 2, pri: 'Immediate', status: 'Done', title: 'Increase HikariCP pool 100 -> 500', detail: 'Provides immediate headroom while mitigation completes.', cmd: 'helm upgrade payment-service ./chart --set db.pool.maxConnections=500 -n production' },
  { id: 3, pri: 'Short-Term', status: 'Pending', title: 'Enforce non-blocking migrations', detail: 'Block unsafe schema changes in CI.', cmd: null },
]

const TIMELINE = [
  { t: '23:38:00', ev: 'order-service v3.1.2 deployed; migration begins', c: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
  { t: '23:41:18', ev: 'Connection pool exhausted, 847 waiting', c: '#F43F5E', bg: 'var(--danger-s)' },
  { t: '23:41:35', ev: 'ALT-4821 fired and page sent', c: '#F43F5E', bg: 'var(--danger-s)' },
  { t: '23:42:10', ev: 'War room opened and lead assigned', c: '#00D4AA', bg: 'var(--accent-s)' },
  { t: '00:12:00', ev: 'Mitigation complete; errors below 1%', c: '#10B981', bg: 'var(--ok-s)' },
]

const typeIcon = (type) => {
  if (type === 'log') return faDatabase
  if (type === 'trace') return faCodeBranch
  return faChartLine
}

export default function RootCauseAnalysis() {
  const [tab, setTab] = useState('evidence')
  const [expanded, setExpanded] = useState(1)
  const [copied, setCopied] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const copyCmd = (id, cmd) => {
    if (!cmd) return
    navigator.clipboard.writeText(cmd).catch(() => {})
    setCopied(id)
    setTimeout(() => setCopied(null), 1200)
  }

  return (
    <div className="p-6 space-y-5 anim-fade-up" style={{ maxWidth: 1400 }}>
      <div className="rounded-2xl p-6 gradient-border" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.10) 0%, rgba(0,212,170,0.08) 100%)', border: '1px solid var(--border)' }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#8B5CF6,#00D4AA)' }}>
            <FontAwesomeIcon icon={faRobot} style={{ color: '#0B1222' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)' }}>AI Root Cause Analysis</h2>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: 'var(--ok-s)', border: '1px solid var(--ok-b)', color: '#10B981' }}>
                <FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: 11 }} /> ANALYSIS COMPLETE
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 760 }}>
              <strong style={{ color: 'var(--text-1)' }}>Root cause identified with 94% confidence:</strong> deployment-triggered schema migration caused pool exhaustion and cascading service timeouts.
            </p>
            <div className="flex items-center gap-5 mt-4 flex-wrap">
              {[
                { l: 'Confidence', v: '94%', c: '#00D4AA' },
                { l: 'Evidence Items', v: '4', c: '#10B981' },
                { l: 'Services Impacted', v: '6', c: '#3B82F6' },
                { l: 'Users Affected', v: '18,000', c: '#F43F5E' },
              ].map((s) => (
                <div key={s.l}><p style={{ fontSize: 16, fontWeight: 800, color: s.c }}>{s.v}</p><p style={{ fontSize: 10, color: 'var(--text-3)' }}>{s.l}</p></div>
              ))}
              <div className="flex items-center gap-2 ml-auto flex-wrap">
                <button onClick={() => setFeedback('up')} className="flex items-center gap-1.5 btn-ghost" style={{ fontSize: 12, height: 32 }}><FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: 12 }} />{feedback === 'up' ? 'Helpful!' : 'Helpful'}</button>
                <button onClick={() => setFeedback('down')} className="flex items-center gap-1.5 btn-ghost" style={{ fontSize: 12, height: 32 }}><FontAwesomeIcon icon={faThumbsDown} style={{ fontSize: 12 }} />Not Helpful</button>
                <button className="btn-ghost flex items-center gap-1.5" style={{ fontSize: 12, height: 32 }}><FontAwesomeIcon icon={faShareNodes} style={{ fontSize: 12 }} />Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border)', display: 'flex', gap: 6 }}>
        {[
          { id: 'evidence', label: 'Evidence Chain', n: 4 },
          { id: 'impact', label: 'Impact Map' },
          { id: 'recommendations', label: 'Recommendations', n: 3 },
          { id: 'timeline', label: 'Event Timeline' },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className="btn-ghost" style={{ height: 32, fontSize: 12, borderColor: tab === t.id ? 'var(--accent-b)' : 'var(--border)', color: tab === t.id ? 'var(--text-1)' : 'var(--text-2)', background: tab === t.id ? 'var(--accent-s)' : 'transparent' }}>
            {t.label}{t.n ? <span style={{ marginLeft: 6, color: 'var(--accent)' }}>{t.n}</span> : null}
          </button>
        ))}
      </div>

      {tab === 'evidence' && (
        <div className="space-y-3">
          {EVIDENCE.map((e) => {
            const open = expanded === e.id
            const leftC = e.sev === 'critical' ? '#F43F5E' : '#F59E0B'
            return (
              <div key={e.id} className="card" style={{ borderLeft: `3px solid ${leftC}` }}>
                <div className="flex items-start gap-3 p-4 cursor-pointer" onClick={() => setExpanded(open ? null : e.id)}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: e.root ? 'var(--accent-s)' : 'var(--raised)', border: '1px solid var(--border)', color: 'var(--text-1)', fontSize: 11, fontWeight: 700 }}>{e.id}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <FontAwesomeIcon icon={typeIcon(e.type)} style={{ fontSize: 13, color: 'var(--accent)' }} />
                      <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)' }}>{e.title}</p>
                      {e.root ? <span className="pill" style={{ background: 'rgba(139,92,246,0.12)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.3)' }}>ROOT</span> : null}
                    </div>
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'monospace' }}>{e.ts}</span>
                      <span style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700 }}>{e.conf}%</span>
                    </div>
                  </div>
                  <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 12, color: 'var(--text-3)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </div>
                {open && (
                  <div className="px-4 pb-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 10 }}>{e.detail}</p>
                    <div className="flex items-center gap-3 mt-3" style={{ fontSize: 11, fontFamily: 'monospace' }}>
                      <span style={{ color: 'var(--text-3)' }}>{e.before}</span>
                      <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 10, color: '#F43F5E' }} />
                      <span style={{ color: '#F43F5E', fontWeight: 700 }}>{e.after}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="btn-primary" style={{ height: 30, fontSize: 11 }}><FontAwesomeIcon icon={faEye} style={{ fontSize: 11 }} /> View source</button>
                      <button className="btn-ghost" style={{ height: 30, fontSize: 11 }}><FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ fontSize: 11 }} /> Raw data</button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {tab === 'impact' && (
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>Service Impact Topology</h3>
            <div className="flex items-center gap-3 ml-auto">
              {[{ c: '#8B5CF6', l: 'Trigger' }, { c: '#F59E0B', l: 'Cause' }, { c: '#F43F5E', l: 'Critical' }, { c: '#10B981', l: 'Recovered' }].map((l) => (
                <div key={l.l} className="flex items-center gap-1.5" style={{ fontSize: 11 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: l.c }} /><span style={{ color: 'var(--text-3)' }}>{l.l}</span></div>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl p-8" style={{ background: 'var(--raised)', border: '1px solid var(--border)', minHeight: 220 }}>
            <div className="flex items-center gap-3 min-w-[760px]">
              {[faBolt, faDatabase, faServer, faGlobe, faNetworkWired].map((ic, idx) => (
                <React.Fragment key={idx}>
                  <div className="rounded-xl p-4" style={{ width: 140, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ background: 'var(--accent-s)', border: '1px solid var(--accent-b)' }}><FontAwesomeIcon icon={ic} style={{ color: '#00D4AA' }} /></div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-1)' }}>Node {idx + 1}</p>
                  </div>
                  {idx < 4 ? <FontAwesomeIcon icon={faChevronRight} style={{ color: 'var(--text-3)' }} /> : null}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'recommendations' && (
        <div className="space-y-3">
          {RECOMMENDATIONS.map((r) => (
            <div key={r.id} className="card p-5" style={{ borderLeft: `3px solid ${r.pri === 'Immediate' ? '#F43F5E' : '#00D4AA'}` }}>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: r.status === 'Done' ? 'var(--ok-s)' : 'var(--raised)', border: '1px solid var(--border)' }}>
                  {r.status === 'Done' ? <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#10B981', fontSize: 13 }} /> : <span style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 700 }}>{r.id}</span>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1"><p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{r.title}</p><span className="pill" style={{ background: 'var(--accent-s)', border: '1px solid var(--accent-b)', color: 'var(--accent)' }}>{r.pri}</span><span className="pill" style={{ background: 'var(--raised)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>{r.status}</span></div>
                  <p style={{ fontSize: 12, color: 'var(--text-2)' }}>{r.detail}</p>
                  {r.cmd && (
                    <div className="flex items-center gap-3 mt-3 px-4 py-2.5 rounded-lg" style={{ background: 'var(--raised)', border: '1px solid var(--border)' }}>
                      <code style={{ flex: 1, fontSize: 11, color: 'var(--accent)', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.cmd}</code>
                      <button onClick={() => copyCmd(r.id, r.cmd)} className="btn-ghost" style={{ height: 28, fontSize: 11, color: copied === r.id ? '#10B981' : 'var(--text-2)' }}>
                        <FontAwesomeIcon icon={copied === r.id ? faCircleCheck : faCopy} style={{ fontSize: 11 }} /> {copied === r.id ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'timeline' && (
        <div className="card p-6">
          <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', marginBottom: 20 }}>Chronological Event Timeline</h3>
          <div className="relative">
            <div style={{ position: 'absolute', left: 55, top: 0, bottom: 0, width: 1, background: 'var(--border)' }} />
            {TIMELINE.map((ev, i) => (
              <div key={i} className="flex gap-6 mb-5">
                <div style={{ width: 55, flexShrink: 0, textAlign: 'right' }}><span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--text-3)', fontWeight: 600 }}>{ev.t}</span></div>
                <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0 z-10" style={{ background: ev.bg, border: `1px solid ${ev.c}44` }}><div className="w-2.5 h-2.5 rounded-full" style={{ background: ev.c }} /></div>
                <div className="flex-1 min-w-0 pt-1"><p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>{ev.ev}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
