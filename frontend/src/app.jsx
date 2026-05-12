import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Building2,
  CloudRain,
  Gauge,
  MapPinned,
  RadioTower,
  ShieldAlert,
  Sparkles,
  TrainFront,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const boroughs = [
  { name: "Manhattan", score: 86, status: "Critical" },
  { name: "Brooklyn", score: 71, status: "Elevated" },
  { name: "Queens", score: 64, status: "Moderate" },
  { name: "Bronx", score: 58, status: "Stable" },
  { name: "Staten Island", score: 42, status: "Low" },
];

const pulseData = [
  { time: "8 AM", stress: 42, transit: 48 },
  { time: "10 AM", stress: 51, transit: 56 },
  { time: "12 PM", stress: 63, transit: 61 },
  { time: "2 PM", stress: 68, transit: 66 },
  { time: "4 PM", stress: 76, transit: 82 },
  { time: "6 PM", stress: 84, transit: 91 },
  { time: "8 PM", stress: 69, transit: 72 },
];

const scenarios = {
  "Heavy Rain + Rush Hour": {
    transit: 34,
    flood: 46,
    crowd: 22,
    response: 18,
    score: 89,
  },
  "Subway Line Shutdown": {
    transit: 51,
    flood: 4,
    crowd: 39,
    response: 27,
    score: 92,
  },
  "Major Event at MSG": {
    transit: 29,
    flood: 2,
    crowd: 48,
    response: 21,
    score: 84,
  },
  "Bridge Traffic Incident": {
    transit: 21,
    flood: 0,
    crowd: 18,
    response: 43,
    score: 87,
  },
};

const infrastructureCards = [
  {
    title: "MTA Subway Network",
    metric: "A C E · B D F M · N Q R W · 1 2 3 · 4 5 6 7 · L",
    status: "Subway line pressure + station crowding",
    image:
      "https://static1.thetravelimages.com/wordpress/wp-content/uploads/2024/05/screenshot-2024-05-30-at-4-23-39-pm.png",
  },
  {
    title: "Midtown Pedestrian Flow",
    metric: "Times Square · Penn Station · MSG",
    status: "Crowd movement + event pressure",
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "DOT Bridge & Road Grid",
    metric: "Brooklyn Bridge · Manhattan Bridge · FDR",
    status: "Bridge/tunnel chokepoints + traffic routing",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "NYC Flood & Weather Risk",
    metric: "Lower Manhattan · Queens · Coastal roads",
    status: "Rainfall + roadway flooding layer",
    image:
      "",
  },
];

function MetricCard({ icon: Icon, title, value, subtitle, trend }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between">
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-cyan-200">
          <Icon size={22} />
        </div>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          {trend}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-sm text-slate-400">{title}</p>
        <h3 className="mt-1 text-4xl font-semibold tracking-tight text-white">
          {value}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [scenario, setScenario] = useState("Heavy Rain + Rush Hour");
  const sim = scenarios[scenario];
  const [page, setPage] = useState("home");

  const avgStress = useMemo(() => {
    return Math.round(
      boroughs.reduce((sum, b) => sum + b.score, 0) / boroughs.length
    );
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#020817] text-slate-100">
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=2400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/75 via-[#020817]/88 to-[#020817]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(124,58,237,.18),transparent_30%)]" />
      </div>

      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-300/15 p-2 text-cyan-200 ring-1 ring-cyan-200/20">
            <MapPinned size={24} />
          </div>

          <div>
            <p className="text-lg font-semibold text-white">RealityTwin NYC</p>
            <p className="text-xs text-slate-400">
              DOT + MTA Infrastructure Intelligence
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a href="#dashboard" className="hover:text-white">
            Dashboard
          </a>
          <a href="#pulse-section" className="hover:text-white">
          <a href="#pulse-section" className="hover:text-white">
          NYC Pulse
            </a>

          <a href="#simulator-section" className="hover:text-white">
         Simulator
          </a>
          </a>
          <button className="rounded-full bg-white px-5 py-2 font-medium text-slate-950">
            Launch Demo
          </button>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 pb-14 pt-8 lg:grid-cols-2 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
            <Sparkles size={16} /> Smart operations layer for NYC transit and roads
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl">
            Simulate NYC transit, roads, and infrastructure before disruption spreads.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            RealityTwin NYC models MTA subway pressure, DOT bridge and roadway
            chokepoints, pedestrian crowding, weather risk, and emergency
            response sensitivity into one urban operations intelligence platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">


          <button
  onClick={() => {
    document
      .getElementById("pulse-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 shadow-2xl shadow-cyan-400/20 transition hover:scale-105"
>
  Explore NYC Pulse
</button>

<button
  onClick={() => {
    document
      .getElementById("simulator-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
>
  Run What-If Simulation
</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Current NYC Operations Stress Score
              </p>
              <h2 className="mt-2 text-6xl font-semibold tracking-tight text-white">
                {avgStress}
              </h2>
            </div>

            <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
              Elevated Pressure
            </div>
          </div>

          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pulseData}>
                <defs>
                  <linearGradient id="stress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#020817",
                    border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: 16,
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="stress"
                  stroke="#22d3ee"
                  fill="url(#stress)"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="transit"
                  stroke="#a78bfa"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">
              NYC Infrastructure Operations Layer
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Transit, bridges, roads, and weather risk under live simulation
            </h2>
          </div>

          <div className="hidden rounded-full border border-emerald-300/20 bg-emerald-400/10 px-5 py-2 text-sm text-emerald-100 md:block">
            DOT / MTA Systems Online
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {infrastructureCards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-cyan-950/20"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-110 group-hover:opacity-80"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/55 to-transparent" />

              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100 backdrop-blur-xl">
                  Active Layer
                </span>
                <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-300 shadow-lg shadow-emerald-300/40" />
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-sm text-slate-200">{card.status}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-cyan-100">{card.metric}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">
              MTA Transit Intelligence
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Live subway network pulse
            </h2>
          </div>

          <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-2 text-sm text-cyan-100">
            MTA Simulation Active
          </div>
        </div>

        <div className="relative h-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#04111f] p-8 shadow-2xl shadow-cyan-950/30">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:36px_36px]" />

          <div className="absolute left-[10%] top-[20%] h-1 w-[65%] rounded-full bg-cyan-400">
            <div className="absolute left-[20%] top-[-5px] h-4 w-4 rounded-full bg-white shadow-lg shadow-cyan-300/40"></div>
          </div>

          <div className="absolute left-[20%] top-[45%] h-1 w-[55%] rounded-full bg-yellow-400">
            <div className="absolute left-[60%] top-[-5px] h-4 w-4 rounded-full bg-white shadow-lg shadow-yellow-300/40"></div>
          </div>

          <div className="absolute left-[30%] top-[70%] h-1 w-[45%] rounded-full bg-emerald-400">
            <div className="absolute left-[30%] top-[-5px] h-4 w-4 rounded-full bg-white shadow-lg shadow-emerald-300/40"></div>
          </div>

          <div className="absolute left-[50%] top-[12%] h-[220px] w-[4px] rounded-full bg-violet-400"></div>

          <div className="absolute left-[48%] top-[28%] h-4 w-4 rounded-full bg-white shadow-lg shadow-violet-300/40"></div>
          <div className="absolute left-[48%] top-[52%] h-4 w-4 rounded-full bg-white shadow-lg shadow-violet-300/40"></div>

          <div className="absolute left-[12%] top-[12%] rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30">
            A/C/E
          </div>

          <div className="absolute left-[68%] top-[38%] rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-yellow-400/30">
            Q/R/W
          </div>

          <div className="absolute left-[34%] top-[78%] rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/30">
            L Line
          </div>

          <div className="absolute right-10 top-10 max-w-[280px] rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">
              AI Transit Insight
            </p>

            <h3 className="mt-3 text-xl font-semibold text-white">
              Midtown congestion spike predicted
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Increased passenger density projected between Penn Station and
              Times Square after 5 PM.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-3 w-3 animate-pulse rounded-full bg-red-400"></span>
              <p className="text-sm text-red-200">
                Elevated transit stress detected
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">
          Command Dashboard
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
          Live NYC Operational Pulse
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <MetricCard
            icon={TrainFront}
            title="MTA Transit Stress"
            value="84%"
            trend="+12%"
            subtitle="Subway and transfer corridors under elevated pressure."
          />
          <MetricCard
            icon={Building2}
            title="DOT Infrastructure"
            value="71%"
            trend="+8%"
            subtitle="Bridge, road, and corridor pressure indicates rising strain."
          />
          <MetricCard
            icon={CloudRain}
            title="Weather Risk"
            value="68%"
            trend="+16%"
            subtitle="Rain layer increasing disruption risk on roadways."
          />
          <MetricCard
            icon={Activity}
            title="Crowd Pressure"
            value="76%"
            trend="+21%"
            subtitle="Event and rush-hour movement creating bottlenecks."
          />
          <MetricCard
            icon={RadioTower}
            title="Emergency Routing"
            value="62%"
            trend="+6%"
            subtitle="Response routing may slow near bridge and tunnel chokepoints."
          />
        </div>
      </section>

      <section id="pulse-section" className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-blue-950/40">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-10 top-10 h-56 w-56 rounded-full bg-cyan-500 blur-[90px]" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-600 blur-[110px]" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">
                Live City Layer
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                NYC Borough Stress Map
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
              Live Simulation
            </div>
          </div>

          <div className="relative z-10 mt-8 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-cyan-300/10 bg-[#06111f] p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.16),transparent_28%)]" />

              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />

              {boroughs.map((b, index) => (
                <div
                  key={b.name}
                  className="absolute rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-md"
                  style={{
                    left: `${18 + index * 15}%`,
                    top: `${18 + (index % 3) * 22}%`,
                    boxShadow: `0 0 ${b.score / 2}px rgba(34, 211, 238, .45)`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300/20 text-sm font-bold text-cyan-100">
                      {b.score}
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-white">{b.name}</p>
                      <p className="text-xs text-slate-300">{b.status} pressure</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {boroughs.map((b) => (
                <div
                  key={b.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">{b.name}</p>
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-100">
                      {b.status}
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
                      style={{ width: `${b.score}%` }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Urban stress index: {b.score}/100
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="simulator-section"
        className="relative z-10 mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-2"
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-violet-400/10 p-3 text-violet-200 ring-1 ring-violet-200/20">
              <Zap size={22} />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-violet-200/80">
                Simulation Engine
              </p>
              <h2 className="text-2xl font-semibold text-white">
                What-If Scenario
              </h2>
            </div>
          </div>

          <p className="mt-5 leading-7 text-slate-300">
            Select a disruption scenario and RealityTwin estimates how pressure
            spreads across transit, roadway flow, flood risk, crowd movement,
            and emergency routing.
          </p>

          <div className="mt-6 space-y-4">
            <label className="text-sm font-medium text-slate-300">
              Scenario
            </label>

            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none"
            >
              {Object.keys(scenarios).map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">
                Predicted Impact
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-white">
                Urban stress rises to {sim.score}/100
              </h2>
            </div>

            <Gauge className="text-cyan-200" size={34} />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {[
              ["Transit", sim.transit],
              ["Flood", sim.flood],
              ["Crowd", sim.crowd],
              ["Response", sim.response],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-center"
              >
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-1 text-3xl font-semibold text-white">
                  +{value}%
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={boroughs}>
                <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#020817",
                    border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: 16,
                    color: "#fff",
                  }}
                />
                <Bar dataKey="score" radius={[12, 12, 0, 0]}>
                  {boroughs.map((b) => (
                    <Cell
                      key={b.name}
                      fill={
                        b.score > 80
                          ? "#f87171"
                          : b.score > 65
                          ? "#fbbf24"
                          : "#22d3ee"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">
                AI Operations Insights
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-white">
                Recommended agency actions
              </h2>
            </div>

            <AlertTriangle className="text-amber-200" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
              <TrainFront className="text-cyan-200" size={24} />
              <h3 className="mt-4 font-semibold text-white">
                Transit pressure rising
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Midtown subway corridors show a projected evening congestion
                spike near Penn Station and Times Square.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
              <CloudRain className="text-cyan-200" size={24} />
              <h3 className="mt-4 font-semibold text-white">
                Roadway flood sensitivity active
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Lower Manhattan and parts of Queens show elevated roadway flood
                sensitivity during rainfall events.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
              <ShieldAlert className="text-cyan-200" size={24} />
              <h3 className="mt-4 font-semibold text-white">
                Emergency delay sensitivity
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Bridge and tunnel chokepoints may slow emergency response routing
                during peak evening congestion.
              </p>
            </div>
          </div>
        </div>
      </section>
        {page !== "home" && (
        <button
    onClick={() => setPage("home")}
    className="fixed left-6 top-6 z-50 rounded-full bg-white px-5 py-2 font-semibold text-slate-950"
  >
    ← Back Home
  </button>
)}
{page === "home" && (
  <>
    {/* hero section + infrastructure cards */}
  </>
)}

{page === "dashboard" && (
  <>
    {/* dashboard + NYC map sections */}
  </>
)}

{page === "simulator" && (
  <>
    {/* simulator section */}
  </>
)}
    </main>
      
  );
}