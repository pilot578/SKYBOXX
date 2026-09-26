import { OrbitSystem } from '@/components/skybox/orbit-system'
import { MechanicalGauge } from '@/components/skybox/mechanical'
import { Panel, Readout, StatusIndicator, TechnicalLabel } from '@/components/skybox/primitives'
import { getSystem, getEvents } from '@/lib/server/store'

export default async function OverviewPage() {
  const SYSTEM = await getSystem()
  const EVENTS = await getEvents()

  const LEFT = [
    { label: 'System Health', value: SYSTEM.health, display: `${SYSTEM.health}%`, sub: 'HEALTH-01' },
    { label: 'Active Nodes', value: SYSTEM.activeNodes, max: 12, display: String(SYSTEM.activeNodes), sub: '12 / 12 ONLINE' },
    { label: 'Objects', value: 78, display: SYSTEM.objects.toLocaleString(), sub: 'OBJ-INDEX' },
  ]
  const RIGHT = [
    { label: 'Storage', value: 4.8, max: 6, display: `${SYSTEM.storageTb} TB`, sub: '80% OF 6 TB' },
    { label: 'Replication', value: 3, max: 3, display: `${SYSTEM.replication}×`, sub: 'FACTOR' },
    { label: 'Recovery', value: 0, display: '0', sub: 'INCIDENTS' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <header className="relative overflow-hidden rounded-2xl border border-line bg-card/80 px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_50px_-28px_rgba(239,68,68,0.6)] backdrop-blur-sm md:px-10 md:py-10">
        <span aria-hidden className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-petal blur-3xl anim-pulse-soft" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <TechnicalLabel className="rounded-sm border border-line bg-petal px-1.5 py-0.5 text-blush">
                M-00
              </TechnicalLabel>
              <span aria-hidden className="h-px w-12 bg-rose/60" />
              <TechnicalLabel>SYS-01 / DISTRIBUTED OBJECT STORE</TechnicalLabel>
            </div>
            <h1 className="flex items-baseline gap-1 font-fun text-[clamp(2.75rem,10vw,6rem)] font-bold leading-[0.9] tracking-tight text-foreground">
              SKY<span className="text-rose">BOX</span>
              <span aria-hidden className="ml-1 inline-block size-3 translate-y-[-0.6em] rounded-full bg-rose led md:size-4" />
            </h1>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
              Live mechanical view of the SKYBOX distributed object store. Twelve nodes orbit the core while data particles replicate across the mesh.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <Readout label="Latency" value="12ms" />
            <Readout label="I/O" value="84MB/s" />
            <Readout label="Uptime" value="412d 06h" />
          </div>
        </div>
      </header>

      <section className="grid items-center gap-6 lg:grid-cols-[220px_1fr_220px]">
        <div className="order-2 grid grid-cols-3 gap-3 lg:order-1 lg:grid-cols-1">
          {LEFT.map((g) => (
            <Panel key={g.label} className="flex justify-center p-3">
              <MechanicalGauge {...g} size={140} />
            </Panel>
          ))}
        </div>

        <div className="relative order-1 flex justify-center lg:order-2">
          <TechnicalLabel className="absolute left-0 top-0">X 000 · Y 000</TechnicalLabel>
          <TechnicalLabel className="absolute right-0 top-0">ORBIT-R 218</TechnicalLabel>
          <TechnicalLabel className="absolute bottom-0 left-0">NODE MESH · 12</TechnicalLabel>
          <TechnicalLabel className="absolute bottom-0 right-0">REV 0.5 RPM</TechnicalLabel>
          <OrbitSystem />
        </div>

        <div className="order-3 grid grid-cols-3 gap-3 lg:grid-cols-1">
          {RIGHT.map((g) => (
            <Panel key={g.label} className="flex justify-center p-3">
              <MechanicalGauge {...g} size={140} />
            </Panel>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Panel title="Event Stream" code="LOG-01" className="md:col-span-2">
          <ul className="flex flex-col divide-y divide-line">
            {EVENTS.map((e) => (
              <li key={e.t} className="flex items-center gap-4 py-2 font-mono text-xs">
                <span className="tabular-nums text-muted-foreground">{e.t}</span>
                <StatusIndicator />
                <span className="flex-1 text-foreground">{e.msg}</span>
                <TechnicalLabel>{e.code}</TechnicalLabel>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Zones" code="GEO-04">
          <ul className="flex flex-col gap-3">
            {['EU-W1', 'EU-C2', 'US-E1', 'US-W2', 'AP-S1', 'AP-N1'].map((z, i) => (
              <li key={z} className="flex items-center justify-between font-mono text-xs">
                <span className="text-foreground">{z}</span>
                <span className="flex gap-1">
                  {[0, 1].map((k) => (
                    <span key={k} className={`h-2 w-5 rounded-sm ${i === 4 && k === 0 ? 'bg-[#f6d9a8]' : 'bg-blush'}`} />
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </div>
  )
}
