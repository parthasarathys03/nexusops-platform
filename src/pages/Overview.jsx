import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUp,
  faArrowDown,
  faBolt,
  faCircleCheck,
  faCircleExclamation,
  faCircleXmark,
  faBrain,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'

const sparkUp = [99.94, 99.97, 99.96, 99.99, 99.97, 99.95, 99.98, 99.97].map((v) => ({ v }))
const sparkAlt = [3, 5, 4, 7, 6, 9, 11, 15].map((v) => ({ v }))
const sparkMttr = [45, 38, 32, 35, 28, 31, 26, 23].map((v) => ({ v }))
const sparkEvt = [10, 12, 14, 13, 10, 15, 11, 14].map((v) => ({ v: v * 1000 }))

const BASE_KPI = [
  { id: 'uptime', label: 'System Uptime', val: 99.97, format: 'percent', delta: '+0.02%', up: true, spark: sparkUp, color: 'var(--accent)' },
  { id: 'alerts', label: 'Active Alerts', val: 15, format: 'int', delta: '4 critical', up: false, spark: sparkAlt, color: 'var(--danger)' },
  { id: 'mttr', label: 'MTTR Today', val: 23, format: 'minutes', delta: '-8 min', up: true, spark: sparkMttr, color: 'var(--accent)' },
  { id: 'events', label: 'Events / sec', val: 12483, format: 'int', delta: 'All sources', up: null, spark: sparkEvt, color: 'var(--text-3)' },
]

const INSIGHTS = [
  { tag: 'CAUSAL', title: 'DB timeouts causing payment failures', conf: '94%' },
  { tag: 'ANOMALY', title: 'API traffic 340% above baseline', conf: '81%' },
  { tag: 'FORECAST', title: 'Memory saturation in ~2.4 h', conf: '76%' },
]

const ACTIVITY = [
  { icon: faCircleXmark, text: 'P1 created: Payment gateway timeout', sub: 'INC-2048 - payment-service', t: '2m', c: 'var(--danger)' },
  { icon: faCircleExclamation, text: 'Alert: CPU spike prod-api-07 at 94%', sub: 'ALT-4820 - Prometheus', t: '9m', c: 'var(--warn)' },
  { icon: faCircleCheck, text: 'INC-2041 resolved: Auth latency normalized', sub: 'Resolved by Backend Team', t: '14m', c: 'var(--ok)' },
  { icon: faBolt, text: 'Deploy: checkout-service v2.4.1', sub: 'prod-us-east-1', t: '22m', c: 'var(--accent)' },
  { icon: faCircleExclamation, text: 'SolarWinds latency degraded', sub: 'p99 190ms (threshold 100ms)', t: '35m', c: 'var(--warn)' },
]

const INTG = [
  { n: 'Datadog', ab: 'DD', s: 'ok' }, { n: 'Dynatrace', ab: 'DT', s: 'ok' },
  { n: 'New Relic', ab: 'NR', s: 'warn' }, { n: 'Prometheus', ab: 'PM', s: 'ok' },
  { n: 'Grafana', ab: 'GF', s: 'ok' }, { n: 'PagerDuty', ab: 'PD', s: 'ok' },
  { n: 'Splunk', ab: 'SP', s: 'ok' }, { n: 'Zabbix', ab: 'ZB', s: 'ok' },
  { n: 'Nagios', ab: 'NG', s: 'off' }, { n: 'AppDynamics', ab: 'AD', s: 'ok' },
  { n: 'Elastic', ab: 'EL', s: 'ok' }, { n: 'SolarWinds', ab: 'SW', s: 'warn' },
]
const DOT_C = { ok: '#10B981', warn: '#F59E0B', off: 'var(--text-3)' }

function formatMetric(value, format) {
  if (format === 'percent') return `${value.toFixed(2)}%`
  if (format === 'minutes') return `${Math.round(value)} min`
  return Math.round(value).toLocaleString()
}

function AnimatedMetric({ value, format }) {
  const [displayValue, setDisplayValue] = useState(value)
  const fromRef = useRef(value)

  useEffect(() => {
    const start = performance.now()
    const from = fromRef.current
    const to = value
    const duration = 700
    let frameId = 0

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = easeOutCubic(progress)
      setDisplayValue(from + (to - from) * eased)
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [value])

  return <>{formatMetric(displayValue, format)}</>
}

function ChartTooltip({ active, payload, label, format }) {
  if (!active || !payload || !payload.length) return null
  const raw = Number(payload[0].value)
  const pretty = formatMetric(raw, format)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      style={{
        background: '#131D2E',
        border: '1px solid #1E293B',
        borderRadius: 10,
        color: '#E2E8F0',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        padding: '8px 10px',
        fontSize: 12,
      }}
    >
      <div style={{ color: '#94A3B8', marginBottom: 2 }}>{label ?? 'Current'}</div>
      <div style={{ fontWeight: 700 }}>{pretty}</div>
    </motion.div>
  )
}

function Spark({ data, color, format }) {
  const stroke = color === 'var(--danger)' ? '#F43F5E' : color === 'var(--accent)' ? '#00D4AA' : '#475569'
  const gidFill = `sgf${stroke.replace(/[^a-z0-9]/gi, '')}`
  const gidStroke = `sgs${stroke.replace(/[^a-z0-9]/gi, '')}`

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }} style={{ height: 36, marginTop: 14 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gidFill} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
            </linearGradient>
            <linearGradient id={gidStroke} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00D4AA" stopOpacity={1} />
              <stop offset="100%" stopColor="#00D4AA" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <Tooltip content={<ChartTooltip format={format} />} cursor={{ stroke: '#1E293B', strokeDasharray: '3 3' }} />
          <Area
            type="monotone"
            dataKey="v"
            stroke={`url(#${gidStroke})`}
            strokeWidth={2.5}
            fill={`url(#${gidFill})`}
            dot={false}
            activeDot={{ r: 4, fill: '#00D4AA', stroke: '#0B1222', strokeWidth: 2 }}
            isAnimationActive
            animationDuration={800}
            animationEasing="ease-in-out"
            style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,170,0.2))' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default function Overview() {
  const [kpis, setKpis] = useState(BASE_KPI)
  const [shimmer, setShimmer] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setShimmer(false), 1300)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const tick = () => {
      setKpis((prev) => prev.map((k) => {
        if (k.id === 'events') {
          const factor = 1 + (Math.random() * 0.04 - 0.02)
          return { ...k, val: Math.max(8000, Math.round(k.val * factor)) }
        }
        if (k.id === 'alerts') {
          const delta = Math.random() > 0.5 ? 1 : -1
          return { ...k, val: Math.max(1, k.val + delta) }
        }
        return k
      }))
      const nextDelay = 5000 + Math.floor(Math.random() * 3000)
      timer = setTimeout(tick, nextDelay)
    }

    let timer = setTimeout(tick, 5200)
    return () => clearTimeout(timer)
  }, [])

  const okN = useMemo(() => INTG.filter((i) => i.s === 'ok').length, [])
  const warnN = useMemo(() => INTG.filter((i) => i.s === 'warn').length, [])

  return (
    <div className="anim" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {kpis.map((k, i) => (
          <div key={k.id} className="card card-h" style={{ padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
            {shimmer && <div className="shimmer-bg" style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none' }} />}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.07em' }}>
                {k.label}
              </span>
              {k.up !== null && (
                <span
                  className={k.up ? 'pill badge-success' : 'pill badge-error'}
                  style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10.5, fontWeight: 700, padding: '2px 8px' }}
                >
                  <FontAwesomeIcon icon={k.up ? faArrowDown : faArrowUp} style={{ fontSize: 8 }} />
                  {k.delta}
                </span>
              )}
            </div>
            <span className="metric-value" style={{ fontSize: 32, color: 'var(--text-1)', lineHeight: 1, display: 'block', position: 'relative', zIndex: 1 }}>
              <AnimatedMetric value={k.val} format={k.format} />
            </span>
            {k.up === null && <span style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3, display: 'block', position: 'relative', zIndex: 1 }}>{k.delta}</span>}
            <Spark data={k.spark} color={k.color} format={k.format} />
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 296px', gap: 14 }}>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>Integration Health</h2>
              <p style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>15 platforms connected</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="pill badge-success"><div className="dot dot-ok" style={{ width: 5, height: 5 }} />{okN} OK</span>
              <span className="pill badge-warning"><div className="dot dot-warn" style={{ width: 5, height: 5 }} />{warnN} Degraded</span>
              <span className="pill" style={{ background: 'var(--raised)', color: 'var(--text-3)', border: '1px solid var(--border)' }}>
                <div className="dot dot-off" style={{ width: 5, height: 5 }} />1 Offline
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {INTG.map((g) => (
              <div
                key={g.n}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9, padding: '10px 12px', borderRadius: 10,
                  border: '1px solid var(--border)', background: 'var(--surface)', opacity: g.s === 'off' ? 0.45 : 1,
                  cursor: 'pointer', transition: 'all .18s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border2)'
                  e.currentTarget.style.background = 'var(--raised)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'var(--surface)'
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 7, flexShrink: 0, background: 'var(--raised)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: 'var(--text-2)', fontFamily: 'monospace' }}>{g.ab}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: DOT_C[g.s], flexShrink: 0 }} />
                    <span style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--text-1)' }} className="trunc">{g.n}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faBrain} style={{ fontSize: 14, color: '#0B1222' }} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>AI Insights</p>
              <p style={{ fontSize: 10.5, color: 'var(--accent)', fontWeight: 600 }}>3 new findings</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {INSIGHTS.map((ins, i) => (
              <div
                key={i}
                style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--raised)', cursor: 'pointer', transition: 'all .18s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-b)'
                  e.currentTarget.style.background = 'var(--accent-s)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'var(--raised)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '.07em', color: 'var(--accent)', background: 'var(--accent-s)', border: '1px solid var(--accent-b)', padding: '1px 7px', borderRadius: 4 }}>{ins.tag}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)' }}>{ins.conf}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.4 }}>{ins.title}</p>
                <button style={{ marginTop: 6, fontSize: 11, fontWeight: 600, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 3 }}>
                  View analysis <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 9 }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>Activity</h2>
          <span className="pill badge-success" style={{ fontSize: 10.5, fontWeight: 700, padding: '3px 10px' }}>
            <div className="dot dot-ok" style={{ width: 5, height: 5 }} />LIVE
          </span>
        </div>

        {ACTIVITY.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: 'var(--raised)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon icon={a.icon} style={{ fontSize: 12, color: a.c }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="trunc" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{a.text}</p>
              <p className="trunc" style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{a.sub}</p>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-3)', flexShrink: 0, paddingTop: 1 }}>{a.t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
