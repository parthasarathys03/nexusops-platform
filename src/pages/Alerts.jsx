import React, { useState } from 'react'
import {
  Search, Filter, ChevronDown, X, Eye, MoreHorizontal,
  Clock, CheckCircle2, Zap, ExternalLink, MessageSquare
} from 'lucide-react'

const SEV = {
  critical: { l:'Critical', c:'var(--danger)', bg:'var(--danger-s)', dot:'dot-err'  },
  high:     { l:'High',     c:'var(--warn)',   bg:'var(--warn-s)',   dot:'dot-warn' },
  medium:   { l:'Medium',   c:'var(--text-2)', bg:'var(--raised)',   dot:'dot-off'  },
  low:      { l:'Low',      c:'var(--ok)',     bg:'var(--ok-s)',     dot:'dot-ok'   },
}

const ROWS = [
  { id:'ALT-4821', sev:'critical', st:'firing', title:'Payment Gateway — DB Connection Pool Exhausted', svc:'payment-service', src:'Datadog', dur:'32m', assignee:'M. Chen' },
  { id:'ALT-4820', sev:'critical', st:'firing', title:'prod-api-07 CPU Utilization 94%', svc:'api-gateway', src:'Prometheus', dur:'18m', assignee:null },
  { id:'ALT-4819', sev:'critical', st:'ack', title:'Checkout Service HTTP 5xx Rate 8.7%', svc:'checkout-service', src:'New Relic', dur:'41m', assignee:'J. Rivera' },
  { id:'ALT-4818', sev:'critical', st:'firing', title:'PostgreSQL Replica Lag 2m 14s', svc:'postgres-cluster', src:'Zabbix', dur:'55m', assignee:null },
  { id:'ALT-4817', sev:'high', st:'firing', title:'Redis cache-cluster-03 Memory 87%', svc:'redis-cache', src:'Dynatrace', dur:'1h 12m', assignee:'T. Okonkwo' },
  { id:'ALT-4816', sev:'high', st:'firing', title:'SolarWinds Integration Latency 190ms', svc:'monitoring-infra', src:'SolarWinds', dur:'2h 3m', assignee:null },
  { id:'ALT-4815', sev:'high', st:'ack', title:'SSL Certificate Expiry in 14 days', svc:'cert-manager', src:'Checkmk', dur:'4h 38m', assignee:'DevOps' },
  { id:'ALT-4814', sev:'high', st:'firing', title:'Load Balancer — 3/12 Hosts Unhealthy', svc:'load-balancer', src:'AppDynamics', dur:'28m', assignee:null },
  { id:'ALT-4813', sev:'medium', st:'firing', title:'Elasticsearch Disk Usage 78%', svc:'elastic-cluster', src:'Elastic (ELK)', dur:'6h 20m', assignee:null },
  { id:'ALT-4812', sev:'medium', st:'ack', title:'Auth Service Token Latency p99 820ms', svc:'auth-service', src:'Grafana', dur:'3h 45m', assignee:'S. Patel' },
  { id:'ALT-4811', sev:'medium', st:'firing', title:'Nagios Agent Offline — DC-East', svc:'nagios-agent', src:'Nagios', dur:'3h 14m', assignee:null },
  { id:'ALT-4810', sev:'medium', st:'firing', title:'Search Service Cache Miss Rate 63%', svc:'search-service', src:'New Relic', dur:'1h 52m', assignee:null },
  { id:'ALT-4809', sev:'low', st:'firing', title:'Scheduled Job nightly-report-gen Failed', svc:'job-scheduler', src:'Splunk', dur:'8h', assignee:null },
  { id:'ALT-4808', sev:'low', st:'ack', title:'Staging Disk Inode Usage 71%', svc:'staging-env', src:'Site24x7', dur:'12h 30m', assignee:'Platform' },
  { id:'ALT-4807', sev:'low', st:'firing', title:'ManageEngine Inventory Sync Delayed 2h', svc:'asset-mgmt', src:'ManageEngine', dur:'2h 15m', assignee:null },
]

export default function Alerts() {
  const [q, setQ]       = useState('')
  const [tab, setTab]   = useState('all')
  const [sel, setSel]   = useState(null)

  const cnt = { critical:4, high:4, medium:4, low:3 }
  const list = ROWS.filter(r => {
    if (tab !== 'all' && r.sev !== tab) return false
    if (q && !r.title.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  return (
    <div className="anim" style={{ display:'flex', flexDirection:'column', gap:16 }}>

      {/* Severity summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {(['critical','high','medium','low']).map(s=>{
          const cfg = SEV[s]
          const active = tab === s
          return (
            <button key={s} className="card card-h" onClick={()=>setTab(active?'all':s)} style={{
              padding:'14px 18px', display:'flex', alignItems:'center', gap:14,
              cursor:'pointer', textAlign:'left',
              borderColor: active ? 'var(--accent-b)' : 'var(--border)',
              background: active ? 'var(--accent-s)' : 'var(--surface)',
            }}>
              <div className={cfg.dot} />
              <div>
                <div style={{ fontSize:22, fontWeight:800, color:cfg.c, lineHeight:1, letterSpacing:'-.5px' }}>{cnt[s]}</div>
                <div className="sect" style={{ marginTop:2 }}>{cfg.l}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Toolbar */}
      <div className="card" style={{ display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 20px', borderBottom:'1px solid var(--border)' }}>
          <div className="inp" style={{ flex:1, maxWidth:300 }}>
            <Search size={13} color="var(--text-3)" />
            <input placeholder="Search alerts..." value={q} onChange={e=>setQ(e.target.value)} />
            {q && <button onClick={()=>setQ('')} style={{background:'none',border:'none',cursor:'pointer'}}><X size={12} color="var(--text-3)"/></button>}
          </div>
          <div style={{ display:'flex', gap:2, background:'var(--raised)', borderRadius:7, padding:3, border:'1px solid var(--border)' }}>
            {[{id:'all',l:`All (${ROWS.length})`},{id:'firing',l:'Firing'},{id:'ack',l:"Ack'd"}].map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{
                padding:'4px 12px', borderRadius:5, fontSize:12, fontWeight: tab===t.id?600:500,
                background: tab===t.id?'var(--surface)':'transparent',
                color: tab===t.id?'var(--text-1)':'var(--text-3)',
                border:'none', cursor:'pointer',
                boxShadow: tab===t.id?'0 1px 3px rgba(0,0,0,.08)':'none',
              }}>{t.l}</button>
            ))}
          </div>
          <div style={{ flex:1 }} />
          <button className="btn btn-o"><Filter size={12}/>Filters<ChevronDown size={11}/></button>
          <button className="btn btn-a"><Zap size={12}/>Run Playbook</button>
        </div>

        {/* Header */}
        <div style={{
          display:'grid', gridTemplateColumns:'80px 1fr 110px 70px 70px 80px 50px',
          gap:12, padding:'8px 20px', background:'var(--raised)', borderBottom:'1px solid var(--border)',
        }}>
          {['Severity','Alert · Service','Source','Duration','Status','Assignee',''].map((h,i)=>(
            <span key={i} className="sect" style={{ fontSize:10 }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        <div style={{ maxHeight:520, overflowY:'auto' }}>
          {list.map(r=>{
            const cfg = SEV[r.sev]
            const isSel = sel?.id===r.id
            return (
              <div key={r.id} className={`row ${isSel?'sel':''}`}
                style={{ display:'grid', gridTemplateColumns:'80px 1fr 110px 70px 70px 80px 50px', gap:12,
                  borderLeft: isSel?'3px solid var(--accent)':'3px solid transparent',
                }}
                onClick={()=>setSel(isSel?null:r)}
              >
                {/* Severity */}
                <span className="pill" style={{ background:cfg.bg, color:cfg.c, fontSize:10, alignSelf:'center', justifySelf:'start' }}>
                  <div className={cfg.dot} style={{width:5,height:5}}/>{cfg.l}
                </span>

                {/* Title */}
                <div style={{ minWidth:0 }}>
                  <p className="trunc" style={{ fontSize:12, fontWeight:600 }}>{r.title}</p>
                  <p className="mono trunc" style={{ fontSize:10, color:'var(--text-3)', marginTop:1 }}>{r.svc}</p>
                </div>

                {/* Source */}
                <span style={{ fontSize:11, color:'var(--text-2)' }}>{r.src}</span>

                {/* Duration */}
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                  <Clock size={11} color="var(--text-3)" />
                  <span className="mono" style={{ fontSize:11, color:'var(--text-2)' }}>{r.dur}</span>
                </div>

                {/* Status */}
                <span className="pill" style={{
                  background: r.st==='firing'?'var(--danger-s)':'var(--ok-s)',
                  color: r.st==='firing'?'var(--danger)':'var(--ok)',
                  fontSize:10, alignSelf:'center', justifySelf:'start',
                }}>
                  {r.st==='firing' && <div className="dot-err pulse" style={{width:4,height:4}}/>}
                  {r.st==='firing'?'FIRING':"ACK'D"}
                </span>

                {/* Assignee */}
                <span style={{ fontSize:11, color: r.assignee?'var(--text-2)':'var(--text-3)' }}>
                  {r.assignee || '—'}
                </span>

                {/* Action */}
                <div style={{ display:'flex', gap:4, justifyContent:'flex-end' }}>
                  <button style={{ width:26,height:26,borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer' }}>
                    <Eye size={11} color="var(--text-3)"/>
                  </button>
                </div>
              </div>
            )
          })}
          {list.length===0 && (
            <div style={{ padding:48, textAlign:'center' }}>
              <CheckCircle2 size={32} color="#BBF7D0" />
              <p style={{ fontSize:14, fontWeight:600, color:'var(--text-2)', marginTop:12 }}>No alerts match</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      {sel && (
        <div className="card anim" style={{ padding:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
            <div>
              <span className="mono" style={{ fontSize:12, fontWeight:700, color:'var(--accent)' }}>{sel.id}</span>
              <h3 style={{ fontSize:14, fontWeight:700, marginTop:4 }}>{sel.title}</h3>
            </div>
            <button onClick={()=>setSel(null)} style={{width:28,height:28,borderRadius:7,border:'1px solid var(--border)',background:'var(--surface)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
              <X size={13} color="var(--text-3)"/>
            </button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {[{l:'Service',v:sel.svc},{l:'Source',v:sel.src},{l:'Duration',v:sel.dur},{l:'Status',v:sel.st},{l:'Assignee',v:sel.assignee||'Unassigned'}].map(d=>(
              <div key={d.l}>
                <div className="sect" style={{marginBottom:4}}>{d.l}</div>
                <div style={{ fontSize:13, fontWeight:600 }}>{d.v}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:8, marginTop:16 }}>
            <button className="btn btn-a"><CheckCircle2 size={12}/>Acknowledge</button>
            <button className="btn btn-o"><MessageSquare size={12}/>Comment</button>
            <button className="btn btn-o"><ExternalLink size={12}/>Open Source</button>
            <div style={{flex:1}}/>
            <button className="btn btn-a">
              <Zap size={12}/>AI — Run RCA
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
