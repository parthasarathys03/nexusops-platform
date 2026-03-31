import React, { useState } from 'react'
import {
  Clock, User, MessageSquare, Phone, MoreHorizontal,
  ExternalLink, X, Zap, Plus, ChevronRight, CheckCircle2,
  AlertTriangle, Siren, Activity
} from 'lucide-react'

const PRI = {
  P1: { c:'#BE123C', bg:'#FFF1F2', b:'#FECDD3', label:'Critical', barC:'#EF4444' },
  P2: { c:'#C2410C', bg:'#FFF7ED', b:'#FED7AA', label:'High',     barC:'#F97316' },
  P3: { c:'#92400E', bg:'#FEFCE8', b:'#FDE68A', label:'Medium',   barC:'#EAB308' },
  P4: { c:'#166534', bg:'#F0FDF4', b:'#BBF7D0', label:'Low',      barC:'#22C55E' },
}
const STA = {
  active:     { c:'var(--danger)', bg:'var(--danger-s)', b:'var(--danger-b)', dot:'#EF4444', label:'Active',     pulse:true  },
  mitigating: { c:'var(--warn)',   bg:'var(--warn-s)',   b:'var(--warn-b)',   dot:'#D97706', label:'Mitigating', pulse:true  },
  monitoring: { c:'var(--accent)', bg:'var(--accent-s)', b:'var(--accent-b)', dot:'var(--accent)', label:'Monitoring', pulse:false },
  resolved:   { c:'var(--ok)',     bg:'var(--ok-s)',     b:'var(--ok-b)',     dot:'#16A34A', label:'Resolved',   pulse:false },
}

const INCS = [
  { id:'INC-2048', p:'P1', s:'active',
    title:'Payment Gateway Outage — Complete Service Disruption',
    svcs:['payment-service','checkout-service','order-service'],
    impact:'Revenue loss ~$4,200/min · 18,000 users affected',
    dur:'34m', started:'00:12 UTC', lead:'M. Chen',
    resp:['J. Rivera','T. Okonkwo','S. Patel'],
    upd:7, ch:'#inc-payment-2048', prog:40,
  },
  { id:'INC-2047', p:'P1', s:'active',
    title:'API Gateway Cascade — 5xx Errors Across 3 Regions',
    svcs:['api-gateway','auth-service','user-service'],
    impact:'87% error rate on /api/v2 · Affecting 3 AWS regions',
    dur:'18m', started:'00:28 UTC', lead:'T. Okonkwo',
    resp:['DevOps','Backend Platform'],
    upd:4, ch:'#inc-api-2047', prog:20,
  },
  { id:'INC-2046', p:'P2', s:'mitigating',
    title:'PostgreSQL Replication Lag — Primary Read Degraded',
    svcs:['postgres-cluster','product-service','inventory-api'],
    impact:'Stale reads for 3 services · Latency +380ms',
    dur:'55m', started:'23:51 UTC', lead:'Database Team',
    resp:['J. Rivera','Database Team'],
    upd:9, ch:'#inc-db-2046', prog:70,
  },
  { id:'INC-2045', p:'P2', s:'mitigating',
    title:'Elasticsearch Cluster — Split Brain Detected',
    svcs:['elastic-cluster','search-service','analytics'],
    impact:'Search unavailable for 12% of queries · Analytics delayed',
    dur:'1h 22m', started:'23:24 UTC', lead:'S. Patel',
    resp:['Platform Team','S. Patel'],
    upd:12, ch:'#inc-elastic-2045', prog:55,
  },
  { id:'INC-2044', p:'P2', s:'monitoring',
    title:'Memory Saturation — Cache Cluster Eviction Storm',
    svcs:['redis-cache','session-service'],
    impact:'Cache hit rate dropped to 34% · Response time +210ms',
    dur:'2h 5m', started:'22:41 UTC', lead:'Platform Team',
    resp:['Platform Team','M. Chen'],
    upd:8, ch:'#inc-cache-2044', prog:85,
  },
  { id:'INC-2043', p:'P3', s:'active',
    title:'Load Balancer Health Check Failures — 3 Hosts Down',
    svcs:['load-balancer','prod-us-east'],
    impact:'25% capacity reduction in us-east-1',
    dur:'28m', started:'00:18 UTC', lead:'DevOps',
    resp:['DevOps'],
    upd:3, ch:'#inc-lb-2043', prog:15,
  },
  { id:'INC-2042', p:'P3', s:'monitoring',
    title:'Nagios Agent Unreachable — DC-East Blind Spot',
    svcs:['nagios-agent','dc-east-monitoring'],
    impact:'Monitoring gap · 45 unmonitored hosts',
    dur:'3h 14m', started:'21:32 UTC', lead:'NOC Team',
    resp:['NOC Team'],
    upd:5, ch:'#inc-nagios-2042', prog:30,
  },
  { id:'INC-2041', p:'P3', s:'resolved',
    title:'Auth Service Token Refresh Latency Spike',
    svcs:['auth-service'],
    impact:'Login latency 2.4x baseline · 3,400 sessions',
    dur:'47m', started:'23:05 UTC', lead:'Backend Team',
    resp:['Backend Team','J. Rivera'],
    upd:6, ch:'#inc-auth-2041', prog:100,
  },
  { id:'INC-2040', p:'P4', s:'resolved',
    title:'Scheduled Job Failure — Nightly Report Generation',
    svcs:['job-scheduler','reporting-service'],
    impact:'Morning reports delayed · No user-facing impact',
    dur:'8h', started:'16:00 UTC', lead:'Platform Team',
    resp:['Platform Team'],
    upd:3, ch:'#inc-jobs-2040', prog:100,
  },
  { id:'INC-2039', p:'P4', s:'monitoring',
    title:'SolarWinds Polling Latency Elevated',
    svcs:['solarwinds-integration'],
    impact:'Monitoring data delay ~3min',
    dur:'2h 3m', started:'22:43 UTC', lead:null,
    resp:['NOC Team'],
    upd:2, ch:'#inc-sw-2039', prog:25,
  },
  { id:'INC-2038', p:'P4', s:'resolved',
    title:'ManageEngine Inventory Sync Delay',
    svcs:['asset-management'],
    impact:'Asset inventory stale by 2h · Audit-only impact',
    dur:'2h 15m', started:'22:31 UTC', lead:null,
    resp:['IT Ops'],
    upd:2, ch:'#inc-me-2038', prog:100,
  },
]

const TIMELINE = [
  { time:'00:12', type:'critical', text:'INC-2048 opened — Payment gateway timeout detected', who:'System' },
  { time:'00:14', type:'action',   text:'M. Chen acknowledged, assigned as Incident Lead',     who:'M. Chen' },
  { time:'00:18', type:'info',     text:'War room opened · 4 responders joined',               who:'System' },
  { time:'00:21', type:'action',   text:'Hypothesis: DB connection pool saturation',           who:'J. Rivera' },
  { time:'00:28', type:'critical', text:'INC-2047 created — Cascading API failures',           who:'System' },
  { time:'00:33', type:'mitigate', text:'Mitigation: Pool size 100 → 500',                    who:'T. Okonkwo' },
  { time:'00:39', type:'progress', text:'Error rate decreasing: 8.7% → 3.2%',                 who:'Monitoring' },
]
const TL_DOT = { critical:'#EF4444', action:'var(--accent)', info:'var(--accent)', mitigate:'#D97706', progress:'#16A34A' }
const TL_BG  = { critical:'var(--danger-s)', action:'var(--accent-s)', info:'var(--accent-s)', mitigate:'var(--warn-s)', progress:'var(--ok-s)' }

export default function Incidents() {
  const [sel, setSel]    = useState(null)
  const [filt, setFilt]  = useState('all')

  const counts = {
    all:        INCS.length,
    active:     INCS.filter(i=>i.s==='active').length,
    mitigating: INCS.filter(i=>i.s==='mitigating').length,
    monitoring: INCS.filter(i=>i.s==='monitoring').length,
    resolved:   INCS.filter(i=>i.s==='resolved').length,
  }

  const rows = INCS.filter(i => filt==='all' || i.s===filt)

  return (
    <div className="flex h-full" style={{ minHeight:0 }}>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Stats */}
        <div
          className="grid grid-cols-5 flex-shrink-0"
          style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)' }}
        >
          {[
            { id:'active',     label:'Active',     color:'#BE123C', bg:'#FFF1F2' },
            { id:'mitigating', label:'Mitigating', color:'#C2410C', bg:'#FFF7ED' },
            { id:'monitoring', label:'Monitoring', color:'var(--accent)', bg:'var(--accent-s)' },
            { id:'resolved',   label:'Resolved',   color:'#166534', bg:'#F0FDF4' },
            { id:'all',        label:'Total Open', color:'var(--text-1)', bg:'var(--surface)' },
          ].map(s=>(
            <button
              key={s.id}
              onClick={()=>setFilt(s.id)}
              className="flex flex-col items-start px-5 py-4 transition-all"
              style={{
                borderRight:'1px solid var(--border)',
                background: filt===s.id ? s.bg : 'transparent',
                borderBottom: filt===s.id ? `2px solid ${s.color}` : '2px solid transparent',
              }}
            >
              <span style={{ fontSize:24,fontWeight:800,color:s.color,letterSpacing:'-1px',lineHeight:1 }}>
                {s.id==='all' ? counts.all - counts.resolved : counts[s.id]}
              </span>
              <span style={{ fontSize:11,fontWeight:600,color:'var(--text-3)',marginTop:2,textTransform:'uppercase',letterSpacing:'.05em' }}>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Priority row */}
        <div
          className="flex items-center gap-3 px-6 py-2.5 flex-shrink-0"
          style={{ background:'var(--raised)', borderBottom:'1px solid var(--border)' }}
        >
          <span style={{ fontSize:11,fontWeight:700,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'.07em' }}>Priority:</span>
          {['P1','P2','P3','P4'].map(p=>{
            const cfg=PRI[p]
            const n=INCS.filter(i=>i.p===p).length
            return (
              <div key={p}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
                style={{ background:cfg.bg, border:`1px solid ${cfg.b}`, color:cfg.c }}
              >
                {p} · {n}
              </div>
            )
          })}
          <button className="btn-primary flex items-center gap-1.5 ml-auto" style={{ height:30,fontSize:11 }}>
            <Plus size={11} /> Declare Incident
          </button>
        </div>

        {/* Incident list */}
        <div className="flex-1 overflow-auto">
          {rows.map(inc=>{
            const pc = PRI[inc.p]
            const sc = STA[inc.s]
            const isSel = sel?.id===inc.id
            return (
              <div
                key={inc.id}
                className="tbl-row"
                style={{
                  display:'flex', alignItems:'flex-start', gap:14,
                  padding:'14px 20px',
                  borderLeft: isSel ? '3px solid var(--accent)' : '3px solid transparent',
                  background: isSel ? 'var(--accent-s)' : 'transparent',
                }}
                onClick={()=>setSel(isSel?null:inc)}
              >
                {/* Priority badge */}
                <div
                  className="flex-shrink-0 text-center rounded-xl"
                  style={{ minWidth:50, padding:'8px 6px', background:pc.bg, border:`1px solid ${pc.b}` }}
                >
                  <p style={{ fontSize:14,fontWeight:800,color:pc.c,lineHeight:1 }}>{inc.p}</p>
                  <p style={{ fontSize:9,fontWeight:700,color:pc.c,opacity:.65,marginTop:2,textTransform:'uppercase' }}>{pc.label}</p>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1.5">
                    <p style={{ fontSize:13,fontWeight:700,color:'var(--text-1)',flex:1,lineHeight:1.4 }}>{inc.title}</p>
                    {/* Status pill */}
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full flex-shrink-0 text-[10px] font-bold"
                      style={{ background:sc.bg, border:`1px solid ${sc.b}`, color:sc.c }}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${sc.pulse?'breathe':''}`}
                        style={{ background:sc.dot }} />
                      {sc.label.toUpperCase()}
                    </div>
                  </div>

                  {/* Services */}
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    {inc.svcs.slice(0,3).map(s=>(
                      <span key={s}
                        style={{ fontSize:10,fontFamily:'monospace',background:'var(--raised)',color:'var(--text-2)',padding:'2px 7px',borderRadius:4,border:'1px solid var(--border)' }}>
                        {s}
                      </span>
                    ))}
                    {inc.svcs.length>3 && <span style={{ fontSize:10,color:'var(--text-3)' }}>+{inc.svcs.length-3}</span>}
                  </div>

                  <p style={{ fontSize:12,color:'var(--text-2)',marginBottom:8 }}>{inc.impact}</p>

                  {/* Progress bar */}
                  {inc.s !== 'active' && (
                    <div className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span style={{ fontSize:10,color:'var(--text-3)' }}>Resolution</span>
                        <span style={{ fontSize:10,fontWeight:700,color:sc.c }}>{inc.prog}%</span>
                      </div>
                      <div className="prog-track" style={{ height:3 }}>
                        <div className="prog-fill" style={{ width:`${inc.prog}%`, background:sc.dot }} />
                      </div>
                    </div>
                  )}

                  {/* Meta row */}
                  <div className="flex items-center gap-2 flex-wrap" style={{ fontSize:11,color:'var(--text-3)' }}>
                    <span
                      style={{ fontFamily:'monospace',fontWeight:700,color:'var(--accent)',background:'var(--accent-s)',padding:'1px 6px',borderRadius:4,fontSize:10 }}>
                      {inc.id}
                    </span>
                    <span>·</span>
                    <Clock size={11} /><span>{inc.dur}</span>
                    <span>·</span>
                    <User size={11} /><span>{inc.lead||'Unassigned'}</span>
                    <span>·</span>
                    <MessageSquare size={11} /><span>{inc.upd} updates</span>
                    <span style={{ color:'var(--accent)',fontWeight:500 }}>{inc.ch}</span>
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {(inc.s==='active'||inc.s==='mitigating') && (
                    <button
                      className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold"
                      style={{ background:pc.bg, border:`1px solid ${pc.b}`, color:pc.c }}
                      onClick={e=>e.stopPropagation()}
                    >
                      <Phone size={10} /> Bridge
                    </button>
                  )}
                  <button
                    className="flex items-center justify-center rounded-lg"
                    style={{ width:28,height:28,background:'var(--raised)',border:'1px solid #E4E9F4' }}
                    onClick={e=>e.stopPropagation()}
                  >
                    <MoreHorizontal size={13} color="#7882B5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Timeline sidebar (always) */}
      <div
        className="flex-shrink-0 flex flex-col"
        style={{ width: sel ? 290 : 260, borderLeft:'1px solid var(--border)', background:'var(--surface)' }}
      >
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom:'1px solid var(--border)' }}>
          <div>
            <p style={{ fontSize:12,fontWeight:700,color:'var(--text-1)' }}>
              {sel ? sel.id : 'Incident Timeline'}
            </p>
            <p style={{ fontSize:11,color:'var(--text-3)',marginTop:1 }}>
              {sel ? 'Live activity log' : 'Select an incident'}
            </p>
          </div>
          {sel && (
            <button onClick={()=>setSel(null)}
              style={{ width:24,height:24,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:6,background:'var(--raised)',border:'1px solid #E4E9F4' }}>
              <X size={12} color="#7882B5" />
            </button>
          )}
        </div>

        {sel && (
          <div className="p-4 flex-shrink-0" style={{ borderBottom:'1px solid var(--border)', background:'var(--raised)' }}>
            <p style={{ fontSize:12,fontWeight:600,color:'var(--text-1)',lineHeight:1.4 }}>{sel.title}</p>
            <p style={{ fontSize:11,color:'var(--text-2)',marginTop:4 }}>{sel.impact}</p>
            <div className="mt-3 space-y-1.5">
              {[
                {l:'Lead',      v:sel.lead||'Unassigned'},
                {l:'Duration',  v:sel.dur},
                {l:'Channel',   v:sel.ch, special:true},
              ].map(r=>(
                <div key={r.l} className="flex justify-between">
                  <span style={{ fontSize:11,color:'var(--text-3)' }}>{r.l}</span>
                  <span style={{ fontSize:11,fontWeight:500,color:r.special?'var(--accent)':'var(--text-1)',maxWidth:150,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto p-4">
          <div className="relative">
            <div className="tl-line" />
            {TIMELINE.map((ev,i)=>(
              <div key={i} className="flex gap-3 mb-4 relative">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  style={{ background: TL_BG[ev.type]||'var(--raised)', border:`1px solid ${TL_DOT[ev.type]||'var(--border)'}33` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: TL_DOT[ev.type]||'#9CA3AF' }} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span style={{ fontSize:10,fontFamily:'monospace',color:'var(--text-3)',fontWeight:600 }}>{ev.time}</span>
                    <span style={{ fontSize:10,color:'var(--text-3)' }}>· {ev.who}</span>
                  </div>
                  <p style={{ fontSize:11,color:'var(--text-2)',lineHeight:1.5 }}>{ev.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-2 flex-shrink-0" style={{ borderTop:'1px solid var(--border)' }}>
          <button
            className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold"
            style={{ height:36,fontSize:12,background:'var(--accent)',border:'none',color:'#fff',cursor:'pointer' }}
          >
            <Zap size={12} /> AI — Root Cause Analysis
          </button>
          <button className="btn-ghost w-full flex items-center justify-center gap-2" style={{ height:33,fontSize:11 }}>
            <ExternalLink size={11} /> Open Full Incident
          </button>
        </div>
      </div>
    </div>
  )
}
