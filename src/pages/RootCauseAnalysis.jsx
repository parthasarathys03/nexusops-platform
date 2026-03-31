import React, { useState } from 'react'
import {
  BrainCircuit, Sparkles, ChevronRight, CheckCircle2, ArrowRight,
  Clock, BarChart3, Database, GitBranch, Zap, Server, Network,
  Globe, ExternalLink, Copy, ThumbsUp, ThumbsDown, Share2,
  ChevronDown, Eye, Target, Layers, Shield
} from 'lucide-react'

/* ─ Evidence data ─ */
const EVD = [
  {
    id:1, type:'metric', conf:97, sev:'critical', src:'Datadog', srcC:'#632CA6',
    title:'PostgreSQL Connection Pool Exhausted',
    detail:'db.pool.waiting jumped from 2 → 847 at 23:41:18 UTC. Pool max_connections=100 reached capacity, queuing all new requests.',
    before:'2', after:'847', ts:'23:41:18 UTC', tags:['database','connection-pool','root-cause'], root:true,
  },
  {
    id:2, type:'log', conf:94, sev:'critical', src:'Elastic (ELK)', srcC:'#FEC514',
    title:'Flood of "connection timeout" Errors in payment-service',
    detail:'8,312 occurrences of HikariPool timeout at 30s across all payment-service instances starting 23:41:19 UTC.',
    before:'0.2%', after:'89.4%', ts:'23:41:19 UTC', tags:['payment-service','hikari','logs'],
  },
  {
    id:3, type:'trace', conf:91, sev:'critical', src:'Dynatrace', srcC:'#1496FF',
    title:'Checkout → Payment Service Span Timeouts',
    detail:'100% of checkout transactions failed within 30s. Distributed traces confirm full causal chain.',
    before:'45ms', after:'TIMEOUT', ts:'23:41:21 UTC', tags:['distributed-trace','checkout'],
  },
  {
    id:4, type:'metric', conf:88, sev:'high', src:'Prometheus', srcC:'#E6522C',
    title:'Long-Running Migration Query Holding Table Lock',
    detail:'ALTER TABLE order_items deployed at 23:38 UTC held ACCESS EXCLUSIVE lock for 4m 12s during peak traffic.',
    before:'<1s', after:'252s', ts:'23:38:00 UTC', tags:['migration','lock'],
  },
  {
    id:5, type:'deploy', conf:85, sev:'high', src:'Splunk', srcC:'#65A637',
    title:'Triggering Event: order-service v3.1.2 Deployment',
    detail:'Deployment initiated a schema migration without maintenance window or connection throttle.',
    before:'v3.1.1', after:'v3.1.2', ts:'23:38:00 UTC', tags:['deploy','trigger','change'], trigger:true,
  },
]

const RECS = [
  { id:1, pri:'immediate', effort:'low',  title:'Rollback order-service to v3.1.1', status:'in-progress',
    detail:'Eliminates the migration lock trigger. Schema change must be re-planned with a maintenance window.',
    cmd:'kubectl rollout undo deployment/order-service --to-revision=4 -n production' },
  { id:2, pri:'immediate', effort:'low',  title:'Increase HikariCP pool (100 → 500)', status:'done',
    detail:'Provides immediate headroom while root cause is being resolved.',
    cmd:'helm upgrade payment-service ./chart --set db.pool.maxConnections=500 -n production' },
  { id:3, pri:'short-term', effort:'medium', title:'Adopt pt-online-schema-change for migrations', status:'pending',
    detail:'All future ALTER TABLE ops must use non-blocking strategies. Block non-annotated migrations in CI.', cmd:null },
  { id:4, pri:'short-term', effort:'medium', title:'Add migration dry-run gate in CI/CD pipeline', status:'pending',
    detail:'Simulate migration on prod replica. Fail deploy if lock wait > 5s.', cmd:null },
  { id:5, pri:'long-term',  effort:'high',  title:'Implement circuit breaker in payment-service', status:'pending',
    detail:'Resilience4j circuit breaker on DB calls — open after 5 failures in 10s.', cmd:null },
]

const PRI_CFG = {
  immediate:   { c:'#BE123C', bg:'#FFF1F2', b:'#FECDD3', label:'Immediate'  },
  'short-term':{ c:'#C2410C', bg:'#FFF7ED', b:'#FED7AA', label:'Short-Term' },
  'long-term': { c:'#1D4ED8', bg:'#EFF6FF', b:'#BFDBFE', label:'Long-Term'  },
}
const STATUS_CFG = {
  done:        { c:'#166534', bg:'#F0FDF4', b:'#BBF7D0', label:'Done'        },
  'in-progress':{ c:'#1D4ED8', bg:'#EFF6FF', b:'#BFDBFE', label:'In Progress'},
  pending:     { c:'#6B7280', bg:'#F9FAFB', b:'#E5E7EB', label:'Pending'     },
}

const TL_EVENTS = [
  {t:'23:38:00', ev:'order-service v3.1.2 deployed — schema migration begins', type:'deploy'},
  {t:'23:38:02', ev:'PostgreSQL ACCESS EXCLUSIVE lock acquired on order_items', type:'cause'},
  {t:'23:40:47', ev:'Connection pool hits 95% (95/100) — HikariCP warning logged', type:'warn'},
  {t:'23:41:18', ev:'Connection pool EXHAUSTED — 100/100 in use, 847 waiting', type:'critical'},
  {t:'23:41:19', ev:'payment-service HTTP 500 rate jumps from 0.2% → 89.4%', type:'critical'},
  {t:'23:41:35', ev:'Datadog alert ALT-4821 fires → PagerDuty page sent', type:'alert'},
  {t:'23:41:38', ev:'INC-2048 auto-created by NexusOps AI engine', type:'incident'},
  {t:'23:42:10', ev:'M. Chen acknowledged · War room opened', type:'action'},
  {t:'23:50:14', ev:'Migration lock released after 12m timeout', type:'mitigate'},
  {t:'00:02:00', ev:'Error rate declining 89% → 45%', type:'progress'},
  {t:'00:12:00', ev:'Mitigation complete — error rate < 1%, pool expanded to 500', type:'resolved'},
]
const TL_DOT = {deploy:'#5B5BD6',cause:'#F97316',warn:'#EAB308',critical:'#EF4444',alert:'#EF4444',incident:'#A855F7',action:'#3B82F6',mitigate:'#F97316',progress:'#3B82F6',resolved:'#22C55E'}
const TL_BG  = {deploy:'#EEF0FF',cause:'#FFF7ED',warn:'#FEFCE8',critical:'#FFF1F2',alert:'#FFF1F2',incident:'#F5F0FF',action:'#EFF6FF',mitigate:'#FFF7ED',progress:'#EFF6FF',resolved:'#F0FDF4'}

const TypeIcon = ({type}) => {
  if(type==='log')    return <Database  size={13} color="#92400E" />
  if(type==='trace')  return <GitBranch size={13} color="#1D4ED8" />
  if(type==='deploy') return <Zap       size={13} color="#7C3AED" />
  return <BarChart3 size={13} color="#C2410C" />
}

export default function RootCauseAnalysis() {
  const [expanded, setExpanded] = useState(1)
  const [tab,      setTab]      = useState('evidence')
  const [feedback, setFeedback] = useState(null)
  const [copied,   setCopied]   = useState(null)

  const copyCmd = (id, cmd) => {
    navigator.clipboard.writeText(cmd).catch(()=>{})
    setCopied(id)
    setTimeout(()=>setCopied(null), 2000)
  }

  return (
    <div className="p-6 space-y-5 anim-fade-up" style={{ maxWidth:1400 }}>

      {/* ── AI Banner ── */}
      <div
        className="rounded-2xl p-6"
        style={{ background:'linear-gradient(135deg,#F5F0FF 0%,#EDE9FF 40%,#EFF6FF 100%)', border:'1px solid #DDD5F8' }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background:'linear-gradient(135deg,#5B5BD6,#A855F7)', boxShadow:'0 4px 16px rgba(91,91,214,.35)' }}
          >
            <BrainCircuit size={22} color="#fff" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h2 style={{ fontSize:16,fontWeight:800,color:'var(--text-1)' }}>AI Root Cause Analysis</h2>
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
                style={{ background:'#F0FDF4',border:'1px solid #BBF7D0',color:'#166534' }}
              >
                <div className="dot-green" /> ANALYSIS COMPLETE
              </div>
            </div>
            <p style={{ fontSize:13,color:'var(--text-2)',lineHeight:1.6,maxWidth:700 }}>
              <strong style={{ color:'var(--text-1)' }}>Root cause identified with 94% confidence:</strong>{' '}
              Deployment of{' '}
              <code style={{ background:'#EDE9FF',color:'#7C3AED',padding:'1px 6px',borderRadius:4,fontSize:12,fontFamily:'monospace' }}>
                order-service v3.1.2
              </code>{' '}
              at 23:38 UTC triggered a non-concurrent{' '}
              <code style={{ background:'#FFF7ED',color:'#C2410C',padding:'1px 6px',borderRadius:4,fontSize:12,fontFamily:'monospace' }}>
                ALTER TABLE
              </code>{' '}
              migration that exhausted the PostgreSQL connection pool (100/100), cascading to payment and checkout failures.
            </p>

            <div className="flex items-center gap-5 mt-4 flex-wrap">
              {[
                {l:'Confidence',      v:'94%',          c:'var(--accent)'},
                {l:'Evidence Items',  v:'5',            c:'#059669'},
                {l:'Services Impacted',v:'6',           c:'#C2410C'},
                {l:'Users Affected',  v:'18,000',       c:'#BE123C'},
                {l:'Revenue Impact',  v:'~$142,800',    c:'#7C3AED'},
              ].map(s=>(
                <div key={s.l}>
                  <p style={{ fontSize:16,fontWeight:800,color:s.c,letterSpacing:'-0.3px' }}>{s.v}</p>
                  <p style={{ fontSize:10,color:'var(--text-3)',fontWeight:500 }}>{s.l}</p>
                </div>
              ))}
              <div className="flex items-center gap-2 ml-auto flex-wrap">
                <button
                  onClick={()=>setFeedback('up')}
                  className="flex items-center gap-1.5 btn-ghost"
                  style={{ fontSize:12, height:32, color: feedback==='up' ? '#166534' : undefined, background: feedback==='up' ? '#F0FDF4' : undefined, borderColor: feedback==='up' ? '#BBF7D0' : undefined }}
                >
                  <ThumbsUp size={12} />{feedback==='up'?'Helpful!':'Helpful'}
                </button>
                <button
                  onClick={()=>setFeedback('down')}
                  className="flex items-center gap-1.5 btn-ghost"
                  style={{ fontSize:12, height:32, color: feedback==='down' ? '#BE123C' : undefined, background: feedback==='down' ? '#FFF1F2' : undefined, borderColor: feedback==='down' ? '#FECDD3' : undefined }}
                >
                  <ThumbsDown size={12} />Not Helpful
                </button>
                <button className="btn-ghost flex items-center gap-1.5" style={{ fontSize:12, height:32 }}>
                  <Share2 size={12} />Share Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ borderBottom:'1px solid var(--border)', display:'flex' }}>
        {[
          { id:'evidence',        label:'Evidence Chain',    n:5 },
          { id:'impact',          label:'Impact Map'            },
          { id:'recommendations', label:'Recommendations',   n:5 },
          { id:'timeline',        label:'Event Timeline'        },
        ].map(t=>(
          <button
            key={t.id}
            onClick={()=>setTab(t.id)}
            className={`page-tab ${tab===t.id?'active':''}`}
          >
            {t.label}
            {t.n && (
              <span
                className="ml-1.5 badge"
                style={{ fontSize:10, background: tab===t.id?'#EEF0FF':'#F4F6FB', color: tab===t.id?'var(--accent)':'#9CA3AF', border:'1px solid var(--border)' }}
              >
                {t.n}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab: Evidence ── */}
      {tab==='evidence' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <h3 style={{ fontSize:13,fontWeight:700,color:'var(--text-1)' }}>Correlated Evidence Chain</h3>
              <div style={{ flex:1,height:1,background:'var(--border)' }} />
              <span style={{ fontSize:11,color:'var(--text-3)' }}>Sorted by causal weight</span>
            </div>

            {EVD.map((e,i)=>{
              const open = expanded===e.id
              const leftC = e.sev==='critical' ? '#EF4444' : '#F97316'
              return (
                <div key={e.id}>
                  <div
                    className="card overflow-hidden"
                    style={{ borderLeft:`3px solid ${leftC}` }}
                  >
                    <div
                      className="flex items-start gap-3 p-4 cursor-pointer"
                      onClick={()=>setExpanded(open?null:e.id)}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 flex-shrink-0"
                        style={i===0 ? {background:'linear-gradient(135deg,#5B5BD6,#A855F7)',color:'#fff',fontSize:11,fontWeight:800}
                          : {background:'#F4F6FB',border:'1px solid #E4E9F4',color:'var(--text-3)',fontSize:11,fontWeight:700}}
                      >
                        {i+1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <TypeIcon type={e.type} />
                          <p style={{ fontSize:12,fontWeight:700,color:'var(--text-1)' }}>{e.title}</p>
                          {e.root && (
                            <span className="badge" style={{ fontSize:9,background:'#EDE9FF',color:'#7C3AED',border:'1px solid #DDD5F8',letterSpacing:'.06em' }}>
                              ROOT CAUSE
                            </span>
                          )}
                          {e.trigger && (
                            <span className="badge" style={{ fontSize:9,background:'#FFF7ED',color:'#C2410C',border:'1px solid #FED7AA',letterSpacing:'.06em' }}>
                              TRIGGER
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span style={{ fontSize:10,fontFamily:'monospace',color:'var(--text-3)' }}>{e.ts}</span>
                          <div className="flex items-center gap-1.5">
                            <div className="w-16 h-1.5 rounded-full" style={{ background:'#EEF0F8' }}>
                              <div style={{ width:`${e.conf}%`, height:'100%', borderRadius:9, background:'linear-gradient(90deg,#5B5BD6,#A855F7)' }} />
                            </div>
                            <span style={{ fontSize:10,fontWeight:700,color:'var(--accent)' }}>{e.conf}%</span>
                          </div>
                          {e.tags.slice(0,3).map(t=>(
                            <span key={t} style={{ fontSize:9,background:'#F4F6FB',color:'#6B7280',padding:'1px 6px',borderRadius:4,border:'1px solid #E4E9F4' }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 mt-0.5">
                        {e.before && (
                          <div className="hidden lg:flex items-center gap-1.5" style={{ fontSize:11,fontFamily:'monospace' }}>
                            <span style={{ color:'var(--text-3)' }}>{e.before}</span>
                            <ArrowRight size={10} color="#EF4444" />
                            <span style={{ color:'#BE123C',fontWeight:700 }}>{e.after}</span>
                          </div>
                        )}
                        <ChevronDown size={13} color="#9CA3AF" style={{ transform: open?'rotate(180deg)':'none', transition:'transform .2s' }} />
                      </div>
                    </div>

                    {open && (
                      <div
                        className="px-4 pb-4 pt-0 anim-fade-up"
                        style={{ borderTop:'1px solid var(--border)' }}
                      >
                        <p style={{ fontSize:12,color:'var(--text-2)',lineHeight:1.6,marginTop:12 }}>{e.detail}</p>
                        <div className="grid grid-cols-3 gap-3 mt-3">
                          {[{l:'Metric',v:e.type},{l:'Before',v:e.before},{l:'After (Peak)',v:e.after}].map(c=>(
                            <div key={c.l} className="card-sm p-3">
                              <p style={{ fontSize:10,color:'var(--text-3)',marginBottom:4 }}>{c.l}</p>
                              <p style={{ fontSize:13,fontWeight:700,fontFamily:'monospace',color:c.l==='After (Peak)'?'#BE123C':'var(--text-1)' }}>{c.v}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="btn-primary flex items-center gap-1.5" style={{ height:30,fontSize:11 }}>
                            <Eye size={11} />View in {e.src}
                          </button>
                          <button className="btn-ghost flex items-center gap-1.5" style={{ height:30,fontSize:11 }}>
                            <ExternalLink size={11} />Raw Data
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {i<EVD.length-1 && (
                    <div className="flex justify-center py-1">
                      <ChevronDown size={13} color="#D1D5DB" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Confidence gauge */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target size={14} color="var(--accent)" />
                <h3 style={{ fontSize:13,fontWeight:700,color:'var(--text-1)' }}>Confidence Score</h3>
              </div>
              <div className="flex justify-center mb-4">
                <div style={{ position:'relative',width:100,height:100 }}>
                  <svg className="conf-ring" width="100" height="100" viewBox="0 0 100 100" style={{ transform:'rotate(-90deg)' }}>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#EEF0F8" strokeWidth="10" />
                    <circle cx="50" cy="50" r="40" fill="none" strokeWidth="10" strokeLinecap="round"
                      stroke="url(#cg)" strokeDasharray={`${94*2.51} 251`} />
                    <defs>
                      <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#5B5BD6" />
                        <stop offset="100%" stopColor="#A855F7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div style={{ position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' }}>
                    <span style={{ fontSize:22,fontWeight:800,color:'var(--text-1)' }}>94%</span>
                    <span style={{ fontSize:9,color:'var(--text-3)',fontWeight:500 }}>confidence</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  {l:'Metric correlation',  p:97, c:'#EF4444'},
                  {l:'Log pattern match',   p:94, c:'#F97316'},
                  {l:'Trace causality',     p:91, c:'#5B5BD6'},
                  {l:'Change correlation',  p:88, c:'#A855F7'},
                  {l:'Historical match',    p:72, c:'#6B7280'},
                ].map(r=>(
                  <div key={r.l}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontSize:11,color:'var(--text-3)' }}>{r.l}</span>
                      <span style={{ fontSize:11,fontWeight:700,color:'var(--text-2)' }}>{r.p}%</span>
                    </div>
                    <div className="prog-track">
                      <div className="prog-fill" style={{ width:`${r.p}%`, background:r.c }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar incidents */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Layers size={13} color="#3B82F6" />
                <h3 style={{ fontSize:13,fontWeight:700,color:'var(--text-1)' }}>Similar Past Incidents</h3>
              </div>
              {[
                {id:'INC-1893',t:'DB conn pool exhausted (Oct 14)',m:'91%',r:'12m'},
                {id:'INC-1742',t:'Migration lock cascade (Sep 2)', m:'84%',r:'28m'},
                {id:'INC-1601',t:'HikariCP timeout storm (Aug 18)',m:'79%',r:'45m'},
              ].map(s=>(
                <div key={s.id} className="card-sm p-3 mb-2 cursor-pointer" style={{ ':hover':{borderColor:'#CBD3E8'} }}>
                  <div className="flex items-start gap-2.5">
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize:11,fontWeight:600,color:'var(--text-1)' }}>{s.t}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span style={{ fontSize:10,fontFamily:'monospace',color:'var(--accent)' }}>{s.id}</span>
                        <span style={{ fontSize:10,color:'#22C55E' }}>Resolved {s.r}</span>
                      </div>
                    </div>
                    <span style={{ fontSize:11,fontWeight:700,color:'#A855F7',flexShrink:0 }}>{s.m}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Impact Map ── */}
      {tab==='impact' && (
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <h3 style={{ fontSize:13,fontWeight:700,color:'var(--text-1)' }}>Service Impact Topology</h3>
            <div className="flex items-center gap-3 ml-auto">
              {[{c:'#5B5BD6',l:'Trigger'},{c:'#F97316',l:'Root Cause'},{c:'#EF4444',l:'Critical'},{c:'#6B7280',l:'User Impact'}].map(l=>(
                <div key={l.l} className="flex items-center gap-1.5" style={{ fontSize:11 }}>
                  <div style={{ width:8,height:8,borderRadius:2,background:l.c,flexShrink:0 }} />
                  <span style={{ color:'var(--text-3)' }}>{l.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="overflow-x-auto rounded-xl p-8"
            style={{ background:'#FAFBFE', border:'1px solid var(--border)', minHeight:240 }}
          >
            <div className="flex items-center gap-0 min-w-[720px]">
              {[
                { Icon:Zap,    label:'order-service',   sub:'v3.1.2 deploy',      type:'trigger',  c:'#5B5BD6', bg:'#EEF0FF', b:'#C7D2FE' },
                null,
                { Icon:Database,label:'PostgreSQL',     sub:'ALTER TABLE lock',   type:'cause',    c:'#C2410C', bg:'#FFF7ED', b:'#FED7AA' },
                null,
                { Icon:Server, label:'payment-service', sub:'89% error rate',     type:'critical', c:'#BE123C', bg:'#FFF1F2', b:'#FECDD3' },
                null,
                { Icon:Globe,  label:'checkout-service',sub:'8.7% 5xx rate',      type:'affected', c:'#C2410C', bg:'#FFF7ED', b:'#FED7AA' },
                null,
                { Icon:Network,label:'18,000 users',    sub:'Payment unavailable',type:'impact',   c:'#6B7280', bg:'#F9FAFB', b:'#E5E7EB' },
              ].map((node,i)=>{
                if (!node) return (
                  <div key={i} className="flex items-center" style={{ width:40,flexShrink:0 }}>
                    <div style={{ flex:1,height:1.5,background:'#E4E9F4' }} />
                    <ChevronRight size={14} color="#C5CBD8" style={{ marginLeft:-1 }} />
                  </div>
                )
                const Icon = node.Icon
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center rounded-xl p-4 flex-shrink-0"
                    style={{ width:136, background:node.bg, border:`1.5px solid ${node.b}` }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                      style={{ background:node.c+'18', border:`1px solid ${node.c}33` }}
                    >
                      <Icon size={18} color={node.c} strokeWidth={1.8} />
                    </div>
                    <p style={{ fontSize:11,fontWeight:700,color:'var(--text-1)',lineHeight:1.3 }}>{node.label}</p>
                    <p style={{ fontSize:10,color:'var(--text-3)',marginTop:3 }}>{node.sub}</p>
                    <div
                      className="mt-2 px-2 py-0.5 rounded-full text-center"
                      style={{ background:node.c+'18',border:`1px solid ${node.c}33` }}
                    >
                      <span style={{ fontSize:9,fontWeight:700,color:node.c,textTransform:'uppercase',letterSpacing:'.05em' }}>
                        {node.type}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div
            className="mt-4 p-4 rounded-xl inline-flex items-start gap-3"
            style={{ background:'#FFF1F2', border:'1px solid #FECDD3' }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:'#FECDD3' }}>
              <BarChart3 size={15} color="#BE123C" />
            </div>
            <div>
              <p style={{ fontSize:12,fontWeight:700,color:'#BE123C' }}>Estimated Revenue Impact</p>
              <p style={{ fontSize:22,fontWeight:900,color:'#BE123C',letterSpacing:'-0.5px' }}>~$142,800</p>
              <p style={{ fontSize:11,color:'#C2410C' }}>34 min × $4,200/min estimated loss</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Recommendations ── */}
      {tab==='recommendations' && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            {['immediate','short-term','long-term'].map(p=>{
              const cfg=PRI_CFG[p]
              const n=RECS.filter(r=>r.pri===p).length
              return (
                <div key={p}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold"
                  style={{ background:cfg.bg, border:`1px solid ${cfg.b}`, color:cfg.c }}
                >
                  {cfg.label} ({n})
                </div>
              )
            })}
          </div>
          {RECS.map(r=>{
            const pc=PRI_CFG[r.pri]
            const sc=STATUS_CFG[r.status]
            return (
              <div
                key={r.id}
                className="card p-5"
                style={{ borderLeft:`3px solid ${pc.c}` }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={r.status==='done'?{background:'#F0FDF4',border:'1px solid #BBF7D0'}:{background:'#F4F6FB',border:'1px solid #E4E9F4'}}
                  >
                    {r.status==='done'
                      ? <CheckCircle2 size={14} color="#22C55E" />
                      : <span style={{ fontSize:11,fontWeight:700,color:'var(--text-3)' }}>{r.id}</span>
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p style={{ fontSize:13,fontWeight:700,color:'var(--text-1)' }}>{r.title}</p>
                      <span className="badge" style={{ fontSize:9,background:pc.bg,color:pc.c,border:`1px solid ${pc.b}` }}>{pc.label}</span>
                      <span className="badge" style={{ fontSize:9,background:sc.bg,color:sc.c,border:`1px solid ${sc.b}` }}>{sc.label}</span>
                      <span style={{ fontSize:10,color:'var(--text-3)' }}>Effort: <strong style={{ color:'var(--text-2)' }}>{r.effort.charAt(0).toUpperCase()+r.effort.slice(1)}</strong></span>
                    </div>
                    <p style={{ fontSize:12,color:'var(--text-2)',lineHeight:1.5 }}>{r.detail}</p>
                    {r.cmd && (
                      <div
                        className="flex items-center gap-3 mt-3 px-4 py-2.5 rounded-lg"
                        style={{ background:'#F4F6FB', border:'1px solid var(--border)' }}
                      >
                        <code style={{ flex:1,fontSize:11,fontFamily:'monospace',color:'#166534',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>
                          {r.cmd}
                        </code>
                        <button
                          onClick={()=>copyCmd(r.id,r.cmd)}
                          className="flex items-center gap-1.5 flex-shrink-0"
                          style={{ fontSize:11,fontWeight:600,color: copied===r.id ? '#166534' : 'var(--accent)' }}
                        >
                          {copied===r.id ? <><CheckCircle2 size={12} />Copied!</> : <><Copy size={12} />Copy</>}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Tab: Timeline ── */}
      {tab==='timeline' && (
        <div className="card p-6">
          <h3 style={{ fontSize:13,fontWeight:700,color:'var(--text-1)',marginBottom:20 }}>Chronological Event Timeline</h3>
          <div className="relative">
            <div style={{ position:'absolute',left:55,top:0,bottom:0,width:1,background:'linear-gradient(180deg,#E4E9F4 0%,transparent 100%)' }} />
            {TL_EVENTS.map((ev,i)=>(
              <div key={i} className="flex gap-6 mb-5 group">
                <div style={{ width:55,flexShrink:0,textAlign:'right' }}>
                  <span style={{ fontSize:10,fontFamily:'monospace',color:'var(--text-3)',fontWeight:600 }}>{ev.t}</span>
                </div>
                <div
                  className="w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  style={{ background:TL_BG[ev.type]||'#F4F6FB', border:`1.5px solid ${TL_DOT[ev.type]||'#E4E9F4'}44` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background:TL_DOT[ev.type]||'#9CA3AF' }} />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p style={{ fontSize:12,fontWeight:600,color:'var(--text-1)',lineHeight:1.4 }}>{ev.ev}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
