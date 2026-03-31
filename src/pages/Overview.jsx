import React from 'react'
import {
  FaArrowUp, FaArrowDown, FaBolt, FaCheckCircle,
  FaExclamationCircle, FaTimesCircle, FaBrain,
  FaChevronRight,
} from 'react-icons/fa'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

const sparkUp   = [99.94,99.97,99.96,99.99,99.97,99.95,99.98,99.97].map(v => ({ v }))
const sparkAlt  = [3,5,4,7,6,9,11,15].map(v => ({ v }))
const sparkMttr = [45,38,32,35,28,31,26,23].map(v => ({ v }))
const sparkEvt  = [10,12,14,13,10,15,11,14].map(v => ({ v: v * 1000 }))

const KPI = [
  { label:'System Uptime',  val:'99.97%', delta:'+0.02%',    up:true,  spark:sparkUp,   color:'var(--accent)' },
  { label:'Active Alerts',  val:'15',     delta:'4 critical', up:false, spark:sparkAlt,  color:'var(--danger)' },
  { label:'MTTR Today',     val:'23 min', delta:'−8 min',    up:true,  spark:sparkMttr, color:'var(--accent)' },
  { label:'Events / sec',   val:'12,483', delta:'All sources',up:null,  spark:sparkEvt,  color:'var(--text-3)' },
]

const INSIGHTS = [
  { tag:'CAUSAL',   title:'DB timeouts causing payment failures',  conf:'94%' },
  { tag:'ANOMALY',  title:'API traffic 340% above baseline',       conf:'81%' },
  { tag:'FORECAST', title:'Memory saturation in ~2.4 h',           conf:'76%' },
]

const ACTIVITY = [
  { Icon:FaTimesCircle,      text:'P1 created: Payment gateway timeout',         sub:'INC-2048 · payment-service',   t:'2m',  c:'var(--danger)' },
  { Icon:FaExclamationCircle,text:'Alert: CPU spike prod-api-07 at 94%',         sub:'ALT-4820 · Prometheus',        t:'9m',  c:'var(--warn)'   },
  { Icon:FaCheckCircle,      text:'INC-2041 resolved — Auth latency normalized', sub:'Resolved by Backend Team',     t:'14m', c:'var(--ok)'     },
  { Icon:FaBolt,             text:'Deploy: checkout-service v2.4.1 ✓',           sub:'prod-us-east-1',               t:'22m', c:'var(--accent)' },
  { Icon:FaExclamationCircle,text:'SolarWinds latency degraded',                 sub:'p99 190ms (threshold 100ms)',  t:'35m', c:'var(--warn)'   },
]

const INTG = [
  { n:'Datadog',    ab:'DD', s:'ok'   }, { n:'Dynatrace',  ab:'DT', s:'ok'   },
  { n:'New Relic',  ab:'NR', s:'warn' }, { n:'Prometheus', ab:'PM', s:'ok'   },
  { n:'Grafana',    ab:'GF', s:'ok'   }, { n:'PagerDuty',  ab:'PD', s:'ok'   },
  { n:'Splunk',     ab:'SP', s:'ok'   }, { n:'Zabbix',     ab:'ZB', s:'ok'   },
  { n:'Nagios',     ab:'NG', s:'off'  }, { n:'AppDynamics',ab:'AD', s:'ok'   },
  { n:'Elastic',    ab:'EL', s:'ok'   }, { n:'SolarWinds', ab:'SW', s:'warn' },
]
const DOT_C = { ok:'#10B981', warn:'#F59E0B', off:'var(--text-3)' }

function Spark({ data, color }) {
  return (
    <div style={{ height: 36, marginTop: 14 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top:0, right:0, bottom:0, left:0 }}>
          <defs>
            <linearGradient id={`sg${color.replace(/[^a-z0-9]/gi,'')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color === 'var(--danger)' ? '#EF4444' : color === 'var(--accent)' ? '#0D9488' : '#9C9087'} stopOpacity={.15}/>
              <stop offset="100%" stopColor="#fff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area
            type="monotone" dataKey="v"
            stroke={color === 'var(--danger)' ? '#EF4444' : color === 'var(--accent)' ? '#0D9488' : '#9C9087'}
            strokeWidth={1.8}
            fill={`url(#sg${color.replace(/[^a-z0-9]/gi,'')})`}
            dot={false} isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function Overview() {
  const okN   = INTG.filter(i => i.s === 'ok').length
  const warnN = INTG.filter(i => i.s === 'warn').length

  return (
    <div className="anim" style={{ display:'flex', flexDirection:'column', gap:20 }}>

      {/* ── KPI Row ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
        {KPI.map((k, i) => (
          <div key={i} className="card card-h" style={{ padding:'20px 22px' }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ fontSize:11, fontWeight:600, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'.07em' }}>
                {k.label}
              </span>
              {k.up !== null && (
                <span style={{
                  display:'flex', alignItems:'center', gap:3,
                  fontSize:10.5, fontWeight:700,
                  color: k.up ? 'var(--ok)' : 'var(--danger)',
                  background: k.up ? 'var(--ok-s)' : 'var(--danger-s)',
                  padding:'2px 8px', borderRadius:20,
                }}>
                  {k.up ? <FaArrowDown size={8}/> : <FaArrowUp size={8}/>}
                  {k.delta}
                </span>
              )}
            </div>
            <span style={{ fontSize:32, fontWeight:800, color:'var(--text-1)', letterSpacing:'-1.5px', lineHeight:1, display:'block' }}>
              {k.val}
            </span>
            {k.up === null && (
              <span style={{ fontSize:12, color:'var(--text-3)', marginTop:3, display:'block' }}>{k.delta}</span>
            )}
            <Spark data={k.spark} color={k.color} />
          </div>
        ))}
      </div>

      {/* ── Middle row ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 296px', gap:14 }}>

        {/* Integration health */}
        <div className="card" style={{ padding:22 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <div>
              <h2 style={{ fontSize:14, fontWeight:700, color:'var(--text-1)' }}>Integration Health</h2>
              <p style={{ fontSize:11.5, color:'var(--text-3)', marginTop:2 }}>15 platforms connected</p>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <span className="pill" style={{ background:'var(--ok-s)', color:'var(--ok)', border:'1px solid var(--ok-b)' }}>
                <div className="dot dot-ok" style={{ width:5,height:5 }}/>{okN} OK
              </span>
              <span className="pill" style={{ background:'var(--warn-s)', color:'var(--warn)', border:'1px solid var(--warn-b)' }}>
                <div className="dot dot-warn" style={{ width:5,height:5 }}/>{warnN} Degraded
              </span>
              <span className="pill" style={{ background:'var(--raised)', color:'var(--text-3)', border:'1px solid var(--border)' }}>
                <div className="dot dot-off" style={{ width:5,height:5 }}/>1 Offline
              </span>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
            {INTG.map(g => (
              <div key={g.n} style={{
                display:'flex', alignItems:'center', gap:9,
                padding:'10px 12px', borderRadius:10,
                border:'1px solid var(--border)',
                background:'var(--surface)',
                opacity: g.s === 'off' ? .45 : 1,
                cursor:'pointer', transition:'all .18s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.background='var(--raised)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--surface)' }}
              >
                <div style={{
                  width:28, height:28, borderRadius:7, flexShrink:0,
                  background:'var(--raised)', border:'1px solid var(--border)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:9, fontWeight:800, color:'var(--text-2)', fontFamily:'monospace',
                }}>{g.ab}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ width:5, height:5, borderRadius:'50%', background:DOT_C[g.s], flexShrink:0 }}/>
                    <span style={{ fontSize:11.5, fontWeight:500, color:'var(--text-1)' }} className="trunc">{g.n}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="card" style={{ padding:22 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <div style={{
              width:32, height:32, borderRadius:9, flexShrink:0,
              background:'var(--accent)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <FaBrain size={14} color="#fff" />
            </div>
            <div>
              <p style={{ fontSize:14, fontWeight:700, color:'var(--text-1)' }}>AI Insights</p>
              <p style={{ fontSize:10.5, color:'var(--accent)', fontWeight:600 }}>3 new findings</p>
            </div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {INSIGHTS.map((ins, i) => (
              <div key={i} style={{
                padding:'12px 14px', borderRadius:10,
                border:'1px solid var(--border)', background:'var(--raised)',
                cursor:'pointer', transition:'all .18s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent-b)'; e.currentTarget.style.background='var(--accent-s)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--raised)' }}
              >
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                  <span style={{
                    fontSize:9.5, fontWeight:700, letterSpacing:'.07em',
                    color:'var(--accent)', background:'var(--accent-s)',
                    border:'1px solid var(--accent-b)',
                    padding:'1px 7px', borderRadius:4,
                  }}>{ins.tag}</span>
                  <span style={{ fontSize:11, fontWeight:700, color:'var(--text-2)' }}>{ins.conf}</span>
                </div>
                <p style={{ fontSize:13, fontWeight:600, color:'var(--text-1)', lineHeight:1.4 }}>{ins.title}</p>
                <button style={{
                  marginTop:6, fontSize:11, fontWeight:600, color:'var(--accent)',
                  background:'none', border:'none', cursor:'pointer', padding:0,
                  display:'flex', alignItems:'center', gap:3,
                }}>
                  View analysis <FaChevronRight size={9}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Activity ── */}
      <div className="card" style={{ padding:22 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <h2 style={{ fontSize:14, fontWeight:700, color:'var(--text-1)' }}>Activity</h2>
          <span style={{
            display:'flex', alignItems:'center', gap:5,
            fontSize:10.5, fontWeight:700, color:'var(--ok)',
            background:'var(--ok-s)', border:'1px solid var(--ok-b)',
            padding:'3px 10px', borderRadius:20,
          }}>
            <div className="dot dot-ok breathe" style={{ width:5, height:5 }}/>LIVE
          </span>
        </div>

        {ACTIVITY.map((a, i) => {
          const Icon = a.Icon
          return (
            <div key={i} style={{
              display:'flex', gap:12, padding:'10px 0',
              borderBottom: i < ACTIVITY.length-1 ? '1px solid var(--border)' : 'none',
              alignItems:'flex-start',
            }}>
              <div style={{
                width:28, height:28, borderRadius:'50%', flexShrink:0,
                background:'var(--raised)', border:'1px solid var(--border)',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <Icon size={12} color={a.c} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p className="trunc" style={{ fontSize:13, fontWeight:600, color:'var(--text-1)' }}>{a.text}</p>
                <p className="trunc" style={{ fontSize:11, color:'var(--text-3)', marginTop:1 }}>{a.sub}</p>
              </div>
              <span style={{ fontSize:11, color:'var(--text-3)', flexShrink:0, paddingTop:1 }}>{a.t}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
