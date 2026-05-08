import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════
   PARTICLE CANVAS BACKGROUND
══════════════════════════════════════════ */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.alpha})`;
        ctx.fill();
      });
      particles.forEach((a, i) => particles.slice(i + 1).forEach(b => {
        const dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }));
      animId = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
}

/* ══════════════════════════════════════════
   3D TILT CARD
══════════════════════════════════════════ */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    const rx = ((y - cy) / cy) * -8;
    const ry = ((x - cx) / cx) * 8;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    const gx = (x / r.width) * 100, gy = (y / r.height) * 100;
    el.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(139,92,246,0.08) 0%, transparent 60%), var(--card-bg, transparent)`;
  }, []);
  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.background = "";
  }, []);
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      className={`transition-transform duration-200 ease-out ${className}`}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   GLITCH TEXT
══════════════════════════════════════════ */
function GlitchText({ text, className = "" }) {
  return (
    <span className={`relative inline-block ${className}`} style={{ fontFamily: "inherit" }}>
      <span className="relative z-10">{text}</span>
      <span aria-hidden className="absolute inset-0 text-violet-400 opacity-0 hover:opacity-100 transition-opacity" style={{ clipPath: "inset(30% 0 50% 0)", transform: "translateX(-2px)", transition: "none" }}>{text}</span>
    </span>
  );
}

/* ══════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════ */
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [disp, setDisp] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx];
    let t;
    if (!del && disp.length < word.length) {
      t = setTimeout(() => setDisp(word.slice(0, disp.length + 1)), 80);
    } else if (!del && disp.length === word.length) {
      t = setTimeout(() => setDel(true), 1800);
    } else if (del && disp.length > 0) {
      t = setTimeout(() => setDisp(disp.slice(0, -1)), 45);
    } else if (del && disp.length === 0) {
      setDel(false); setIdx((idx + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [disp, del, idx, words]);
  return (
    <span className="text-violet-400 font-black">
      {disp}<span className="animate-pulse">|</span>
    </span>
  );
}

/* ══════════════════════════════════════════
   FLOATING ORBS
══════════════════════════════════════════ */
const Orb = ({ className }) => (
  <div className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`} />
);

/* ══════════════════════════════════════════
   NAV
══════════════════════════════════════════ */
const NAV = [
  { label: "Home", id: "home" }, { label: "About", id: "about" },
  { label: "Skills", id: "skills" }, { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
};

function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/70 backdrop-blur-2xl border-b border-white/[0.06]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        <button onClick={() => scrollTo("home")} className="font-black text-xl tracking-tight text-white hover:text-violet-400 transition-colors">
          B<span className="text-violet-400">.</span>
        </button>
        <div className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full px-2 py-1.5 backdrop-blur-sm">
          {NAV.map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${active === id ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30" : "text-zinc-400 hover:text-white"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="https://github.com/bharath-mnr" target="_blank" rel="noreferrer"
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">GitHub ↗</a>
          <button onClick={() => scrollTo("contact")}
            className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold px-5 py-2 rounded-full transition-all shadow-lg shadow-violet-600/20 hover:-translate-y-0.5">
            Hire Me
          </button>
        </div>
        <button onClick={() => setOpen(p => !p)} className="md:hidden text-zinc-300 w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
          <div className="space-y-1.5 w-4">
            {[0,1,2].map(i => (
              <div key={i} className={`h-0.5 bg-current rounded-full transition-all duration-300 ${open && i===0?"rotate-45 translate-y-2":open&&i===1?"opacity-0":open&&i===2?"-rotate-45 -translate-y-2":""}`} />
            ))}
          </div>
        </button>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-black/90 backdrop-blur-2xl px-5 pb-5 pt-2 space-y-1">
          {NAV.map(({ label, id }) => (
            <button key={id} onClick={() => { scrollTo(id); setOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
              {label}
            </button>
          ))}
          <button onClick={() => { scrollTo("contact"); setOpen(false); }}
            className="w-full bg-violet-600 text-white font-bold text-sm py-3 rounded-xl mt-2">
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════
   SKILL CHIP
══════════════════════════════════════════ */
const SKILL_COLORS = {
  violet: "bg-violet-500/10 border-violet-500/25 text-violet-300 hover:bg-violet-500/20 hover:border-violet-400/40",
  blue:   "bg-blue-500/10 border-blue-500/25 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/40",
  amber:  "bg-amber-500/10 border-amber-500/25 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/40",
  emerald:"bg-emerald-500/10 border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400/40",
  pink:   "bg-pink-500/10 border-pink-500/25 text-pink-300 hover:bg-pink-500/20 hover:border-pink-400/40",
  cyan:   "bg-cyan-500/10 border-cyan-500/25 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/40",
  indigo: "bg-indigo-500/10 border-indigo-500/25 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400/40",
  orange: "bg-orange-500/10 border-orange-500/25 text-orange-300 hover:bg-orange-500/20 hover:border-orange-400/40",
  rose:   "bg-rose-500/10 border-rose-500/25 text-rose-300 hover:bg-rose-500/20 hover:border-rose-400/40",
  teal:   "bg-teal-500/10 border-teal-500/25 text-teal-300 hover:bg-teal-500/20 hover:border-teal-400/40",
};
const SkillChip = ({ label, icon = "", color = "violet", size = "md" }) => (
  <div className={`inline-flex items-center gap-2 border rounded-xl font-semibold transition-all duration-200 cursor-default select-none ${SKILL_COLORS[color]} ${size === "lg" ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs"}`}>
    {icon && <span className="text-base leading-none">{icon}</span>}
    {label}
  </div>
);

/* ══════════════════════════════════════════
   SECTION HDR
══════════════════════════════════════════ */
const SectionHdr = ({ eyebrow, title, sub, light = false }) => (
  <div className="text-center mb-16 px-4">
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase mb-5 ${light ? "bg-white/5 border-white/10 text-violet-300" : "bg-violet-500/10 border-violet-500/20 text-violet-400"}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
      {eyebrow}
    </div>
    <h2 className={`text-3xl sm:text-5xl font-black mb-4 tracking-tight leading-tight ${light ? "text-white" : "text-white"}`}>{title}</h2>
    {sub && <p className="text-zinc-400 text-base max-w-2xl mx-auto leading-relaxed">{sub}</p>}
  </div>
);

/* ══════════════════════════════════════════
   PROJECT DATA
══════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "midi-v1",
    badge: "Featured",
    emoji: "🎹",
    num: "01",
    title: "AI MIDI Generation Platform",
    subtitle: "Text → Professional MIDI files via a custom symbolic format",
    period: "Aug 2025 – Nov 2025",
    tags: [
      { label: "Java", color: "amber" }, { label: "Spring Boot", color: "emerald" },
      { label: "Node.js", color: "teal" }, { label: "React", color: "cyan" },
      { label: "PostgreSQL", color: "indigo" }, { label: "Gemini AI", color: "violet" },
    ],
    cardGradient: "from-amber-500/15 via-orange-500/5 to-purple-500/10",
    numColor: "text-amber-500/30",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/20",
    glowColor: "shadow-amber-500/10",
    dotColor: "bg-amber-400",
    problem: "Musicians with strong theoretical knowledge but no instrumental proficiency have no programmatic path to realize their ideas.",
    solution: "A full-stack platform bridging natural language and music production. Describe a composition in plain English — receive a production-ready .mid file powered by Google Gemini, a custom symbolic intermediate format, and a strict validation engine.",
    demo: "https://midi-generator-seven.vercel.app/",
    demoOpen: "https://ai-midi-generator-six.vercel.app/",
    github: "https://github.com/bharath-mnr/midi-generator",
    highlights: [
      { icon: "🏗️", title: "Custom Symbolic Format", body: "Designed from scratch — LLM-friendly, token-efficient, structurally constrained. No existing format (LilyPond, MusicXML, ABC) was designed for LLM generation." },
      { icon: "⚙️", title: "MIDI Parser from Spec", body: "Complete binary MIDI parser and converter in Node.js: VLQ-encoded delta times, multi-track polyphonic reconstruction, 480 TPQ. Zero third-party MIDI libraries." },
      { icon: "🛡️", title: "Validation Engine", body: "Rule-based validator catches subdivision count errors, orphaned sustains, and velocity violations — with error messages fed back as retry prompts." },
      { icon: "🔐", title: "Auth & Race-Safe Quotas", body: "JWT auth + pessimistic write lock (SELECT FOR UPDATE + retry) in a Spring transaction. Solved a double-decrement race condition." },
      { icon: "📉", title: "65% → 8% Rejection Rate", body: "3 weeks of prompt engineering, explicit counting examples, and validator feedback loops dropped LLM rejection from ~65% to ~8%." },
      { icon: "🎼", title: "45-Bar Cinematic Output", body: "Generated a piece with 15-voice polyphony, 7-octave span, and a parabolic velocity arc from pp (vel 45) to fff (vel 127) and back." },
    ],
    stack: [
      { layer: "Frontend", items: "React 18 · Vite · Tailwind CSS · Vercel" },
      { layer: "Backend", items: "Spring Boot 3 · JWT · JPA · REST API · Render" },
      { layer: "MIDI Engine", items: "Node.js · Custom Parser · Validator · Converter" },
      { layer: "AI", items: "Google Gemini API · Prompt Engineering" },
      { layer: "Database", items: "PostgreSQL 15 — users, history, quotas" },
    ],
  },
  {
    id: "midi-v2",
    badge: "Active",
    emoji: "🧠",
    num: "02",
    title: "MIDI AI v2 — RAG Style Learning",
    subtitle: "Multi-section generation + MIDI style cloning with vector search",
    period: "Jan 2026 – Present",
    tags: [
      { label: "Node.js", color: "emerald" }, { label: "Express", color: "blue" },
      { label: "React", color: "cyan" }, { label: "Pinecone", color: "violet" },
      { label: "Gemini AI", color: "indigo" }, { label: "RAG", color: "pink" },
    ],
    cardGradient: "from-violet-500/15 via-indigo-500/5 to-cyan-500/10",
    numColor: "text-violet-500/30",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/20",
    glowColor: "shadow-violet-500/10",
    dotColor: "bg-violet-400",
    problem: "Same core gap as v1 — extended to adapt to any user's knowledge level. A music theorist gets richer, precise results; a complete beginner describing a mood still gets a coherent piece.",
    solution: "Extended the platform with a RAG pipeline trained on real MIDI files, vector-indexed domain chunks (melody, harmony, bass, structure, metadata, style guide), and a JSON schema validation loop with automatic error-feedback re-prompting.",
    demo: "https://midi-generator-v2.vercel.app/",
    github: "https://github.com/bharath-mnr/midi-generator-v2",
    highlights: [
      { icon: "🔄", title: "Bidirectional JSON↔MIDI Codec", body: "Built from the MIDI 1.0 specification with zero third-party libraries — precise control over pitch, velocity, timing, and resolution per bar." },
      { icon: "🎵", title: "6-Domain Semantic Chunking", body: "Each uploaded MIDI splits into 6 domain chunks: melody, harmony, bass, structure, metadata, and style guide — embedded into vectors in Pinecone." },
      { icon: "🔬", title: "Music-Theory Analysis", body: "Key detection, chord identification, and melodic contour analysis per chunk — real music-theory features driving retrieval, not raw bytes." },
      { icon: "🔁", title: "Error-Feedback Loop", body: "JSON schema validation with automatic re-prompting on failure. The model receives its own errors and self-corrects — closed-loop generation." },
      { icon: "📐", title: "Multi-Section Stitching", body: "Extended compositions generated section-by-section with automatic bar renumbering and seamless merging — no manual stitching required." },
      { icon: "✏️", title: "Alter Feature", body: "Upload any MIDI + describe additions in natural language. AI generates new note layers merged bar-by-bar into the original without overwriting existing content." },
    ],
    stack: [
      { layer: "Frontend", items: "React 18 · Vite · Tailwind CSS · Vercel" },
      { layer: "Backend", items: "Node.js · Express.js · REST API" },
      { layer: "RAG Pipeline", items: "Pinecone Vector DB · Semantic Chunking · Similarity Retrieval" },
      { layer: "MIDI Engine", items: "Custom JSON↔MIDI Binary Codec (MIDI 1.0 Spec)" },
      { layer: "AI", items: "Google Gemini API · JSON Schema Validation Loop" },
    ],
  },
];

/* ══════════════════════════════════════════
   PROJECT DETAIL PAGE
══════════════════════════════════════════ */
function ProjectPage({ project: p, onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-[#050508] text-white relative overflow-x-hidden">
      <ParticleCanvas />
      {/* Back bar */}
      <div className="sticky top-0 z-40 bg-black/70 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium group">
            <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-500/20 group-hover:border-violet-500/30 transition-all">←</span>
            Back to Portfolio
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-12">
        {/* Hero Banner */}
        <div className={`relative rounded-3xl overflow-hidden border ${p.borderColor} mb-10`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${p.cardGradient}`} />
          <Orb className="w-96 h-96 bg-violet-600/20 -top-20 -right-20" />
          <Orb className="w-64 h-64 bg-indigo-600/15 bottom-0 left-0" />
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${p.borderColor} ${p.accentColor} bg-black/30`}>
                <span className={`w-1.5 h-1.5 rounded-full ${p.dotColor} animate-pulse`} />
                {p.badge}
              </span>
              <span className="text-zinc-500 text-xs font-mono bg-black/30 px-3 py-1 rounded-full border border-white/5">{p.period}</span>
            </div>
            <div className="text-6xl mb-5 float-anim">{p.emoji}</div>
            <h1 className="text-3xl sm:text-5xl font-black mb-3 leading-tight">{p.title}</h1>
            <p className={`text-base md:text-lg font-semibold mb-6 ${p.accentColor}`}>{p.subtitle}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {p.tags.map(t => <SkillChip key={t.label} label={t.label} color={t.color} size="md" />)}
            </div>
            <div className="flex flex-wrap gap-3">
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all shadow-xl shadow-violet-600/25 hover:-translate-y-0.5">
                  🚀 Authenticated Demo
                </a>
              )}
              {p.demoOpen && (
                <a href={p.demoOpen} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-6 py-3 rounded-2xl text-sm border border-white/15 transition-all hover:-translate-y-0.5">
                  🌐 Open Demo
                </a>
              )}
              <a href={p.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-2xl text-sm border border-white/10 transition-all hover:-translate-y-0.5">
                ⭐ GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Problem / Solution */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <div className="bg-rose-500/[0.07] border border-rose-500/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-rose-500/50 to-transparent" />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 text-sm">⚠</div>
              <span className="text-rose-400 font-bold text-sm uppercase tracking-wider">The Problem</span>
            </div>
            <p className="text-zinc-200 text-sm leading-relaxed">{p.problem}</p>
          </div>
          <div className="bg-emerald-500/[0.07] border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent" />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">✓</div>
              <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">My Solution</span>
            </div>
            <p className="text-zinc-200 text-sm leading-relaxed">{p.solution}</p>
          </div>
        </div>

        {/* Highlights */}
        <h2 className="text-2xl font-black mb-6 text-white">Key Technical Achievements</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {p.highlights.map((h, i) => (
            <TiltCard key={h.title}>
              <div className="h-full bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/25 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-2xl mb-3">{h.icon}</div>
                  <div className="text-white font-bold text-sm mb-2">{h.title}</div>
                  <p className="text-zinc-400 text-xs leading-relaxed">{h.body}</p>
                </div>
                <div className={`absolute top-3 right-3 text-xs font-black font-mono opacity-10 group-hover:opacity-20 transition-opacity ${p.accentColor}`}>
                  {String(i+1).padStart(2,"0")}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Stack table */}
        <h2 className="text-2xl font-black mb-6 text-white">Tech Stack</h2>
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden mb-12">
          {p.stack.map((s, i) => (
            <div key={s.layer} className={`flex items-start gap-6 p-5 group hover:bg-white/[0.03] transition-colors ${i < p.stack.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
              <span className="text-zinc-600 text-xs font-mono uppercase tracking-widest w-28 flex-shrink-0 pt-0.5 group-hover:text-zinc-500 transition-colors">{s.layer}</span>
              <span className="text-zinc-200 text-sm">{s.items}</span>
            </div>
          ))}
        </div>

        <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium group">
          <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-500/20 group-hover:border-violet-500/30 transition-all">←</span>
          Back to Portfolio
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (page !== "home") return;
    const fn = () => {
      const ids = ["home", "about", "skills", "projects", "contact"];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) { setActiveSection(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [page]);

  if (page !== "home") {
    const proj = PROJECTS.find(p => p.id === page);
    return proj ? <ProjectPage project={proj} onBack={() => { setPage("home"); setTimeout(() => scrollTo("projects"), 150); }} /> : null;
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; background: #050508; }
        section { scroll-margin-top: 80px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes glow-pulse { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.55;transform:scale(1.08)} }
        @keyframes slide-up { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade-in { from{opacity:0} to{opacity:1} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes border-run { 0%{stroke-dashoffset:1000} 100%{stroke-dashoffset:0} }
        .float-anim { animation: float 5s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 20s linear infinite; }
        .glow-pulse { animation: glow-pulse 7s ease-in-out infinite; }
        .slide-up-1 { animation: slide-up .7s .1s ease forwards; opacity:0; }
        .slide-up-2 { animation: slide-up .7s .25s ease forwards; opacity:0; }
        .slide-up-3 { animation: slide-up .7s .4s ease forwards; opacity:0; }
        .slide-up-4 { animation: slide-up .7s .55s ease forwards; opacity:0; }
        .bg-grid-subtle { background-image: linear-gradient(rgba(139,92,246,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.04) 1px,transparent 1px); background-size:60px 60px; }
        .shimmer-text { background: linear-gradient(90deg, #a78bfa 0%, #e879f9 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 3s linear infinite; }
        .card-3d { transition: transform .25s ease, box-shadow .25s ease; transform-style: preserve-3d; }
        .card-3d:hover { transform: perspective(800px) rotateY(-3deg) rotateX(2deg) translateY(-6px); box-shadow: 0 30px 60px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,.15), 0 0 40px -10px rgba(139,92,246,.15); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(139,92,246,.3); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(139,92,246,.5); }
      `}</style>

      <ParticleCanvas />
      <Nav active={activeSection} />

      {/* ══ HERO ══ */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-5 bg-grid-subtle overflow-hidden">
        <Orb className="w-[600px] h-[600px] bg-violet-700/20 top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 glow-pulse" />
        <Orb className="w-[400px] h-[400px] bg-indigo-700/15 bottom-1/4 right-1/4" />

        <div className="max-w-6xl mx-auto w-full z-10 relative pt-16">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="slide-up-1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-bold tracking-widest uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="text-zinc-300">Full-Stack Developer · AI Systems</span>
              </div>

              <h1 className="slide-up-2 text-5xl sm:text-7xl font-black mb-5 leading-[1.02] tracking-tight">
                <span className="text-white">Hi, I'm </span>
                <span className="shimmer-text">Bharath</span>
              </h1>

              <div className="slide-up-3 text-lg sm:text-xl text-zinc-400 mb-3 h-8 font-medium">
                <Typewriter words={["Java Backend Developer", "AI Systems Builder", "First-Principles Engineer", "Full-Stack Problem Solver"]} />
              </div>

              <p className="slide-up-3 text-zinc-500 text-base mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                I build AI-integrated systems from first principles — including custom MIDI binary parsers, RAG pipelines, and LLM validation engines. Every component, built to spec.
              </p>

              <div className="slide-up-4 flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
                <button onClick={() => scrollTo("projects")}
                  className="group relative overflow-hidden bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all shadow-2xl shadow-violet-600/30 hover:-translate-y-1">
                  <span className="relative z-10 flex items-center gap-2">View My Projects <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600 bg-[length:200%] hover:animate-none" />
                </button>
                <a href="mailto:bharathmnr@outlook.com"
                  className="bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold px-8 py-4 rounded-2xl text-sm border border-white/[0.1] hover:border-violet-500/30 transition-all hover:-translate-y-1">
                  Contact Me
                </a>
              </div>

              {/* Quick stats */}
              {/* <div className="slide-up-4 flex flex-wrap gap-6 justify-center lg:justify-start">
                {[
                  { num: "2", label: "AI Projects Shipped" },
                  { num: "0", label: "Third-Party MIDI Libs" },
                  { num: "65→8%", label: "LLM Error Reduction" },
                ].map(s => (
                  <div key={s.label} className="text-center lg:text-left">
                    <div className="text-2xl font-black text-violet-300">{s.num}</div>
                    <div className="text-zinc-500 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Right — Avatar */}
            <div className="relative flex-shrink-0">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 float-anim">
                {/* Spinning ring */}
                <svg className="absolute inset-0 w-full h-full spin-slow" viewBox="0 0 320 320">
                  <defs>
                    <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  <circle cx="160" cy="160" r="155" fill="none" stroke="url(#ring-grad)" strokeWidth="1.5" strokeDasharray="8 12" />
                </svg>
                {/* Glow */}
                <div className="absolute inset-4 rounded-full bg-violet-600/20 blur-2xl" />
                {/* Photo container */}
                <div className="absolute inset-6 rounded-full overflow-hidden ...">
                  <img
                    src="public/img2.jpeg"
                    alt="Bharath"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating pills */}
              <div className="absolute -left-10 top-1/4 bg-black/80 border border-amber-500/30 rounded-2xl px-4 py-3 backdrop-blur-xl shadow-2xl">
                <div className="text-amber-300 font-bold text-sm">🎹 MIDI AI</div>
                <div className="text-zinc-500 text-xs">Custom Parser Built</div>
              </div>
              <div className="absolute -right-8 top-1/3 bg-black/80 border border-violet-500/30 rounded-2xl px-4 py-3 backdrop-blur-xl shadow-2xl">
                <div className="text-violet-300 font-bold text-sm">☕ Spring Boot</div>
                <div className="text-zinc-500 text-xs">Backend Expert</div>
              </div>
              <div className="absolute left-1/4 -bottom-6 bg-black/80 border border-emerald-500/30 rounded-2xl px-4 py-3 backdrop-blur-xl shadow-2xl">
                <div className="text-emerald-300 font-bold text-sm">🧠 RAG Pipeline</div>
                <div className="text-zinc-500 text-xs">Pinecone + Gemini</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-zinc-700 text-[10px] font-mono tracking-[0.3em] uppercase">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-violet-500/60 to-transparent" />
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="py-28 md:py-36 px-5 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <SectionHdr eyebrow="About Me" title="Who I Am" sub="Builder, problem-solver, and self-taught systems engineer from Kerala, India." />

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-5">
              {[
                "I'm a full-stack developer with deep focus on Java backend systems, AI integration, and building from first principles. When no library exists for what I need, I read the specification and build it — my MIDI binary codecs are direct proof.",
                "My strongest work lives at the intersection of software engineering and domain-specific problem solving. Both my projects required understanding music theory, binary protocols, LLM behavior, and distributed systems concurrency — and I built every layer myself.",
                "Based in Munnar, Kerala. BCA graduate from Bharathiar University, 2024. Actively seeking backend or full-stack engineering roles where I can own meaningful technical challenges end-to-end.",
              ].map((text, i) => (
                <p key={i} className="text-zinc-400 text-base leading-relaxed">{text}</p>
              ))}
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="https://github.com/bharath-mnr" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.07] text-white text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/[0.08] hover:border-violet-500/30 transition-all">
                  ⭐ GitHub Profile
                </a>
                <a href="mailto:bharathmnr@outlook.com"
                  className="flex items-center gap-2 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 text-sm font-semibold px-5 py-2.5 rounded-xl border border-violet-500/25 hover:border-violet-500/40 transition-all">
                  📧 bharathmnr@outlook.com
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              {[
                { icon: "🧠", title: "Independent Learner", desc: "Picks up frameworks directly from documentation. No hand-holding needed." },
                { icon: "🔧", title: "First-Principles", desc: "Reads specs and builds from scratch when no suitable library exists." },
                { icon: "🎯", title: "Ownership", desc: "Full responsibility from design through production debugging." },
                { icon: "📝", title: "Clear Communicator", desc: "Technical docs for both engineering and non-engineering audiences." },
              ].map(c => (
                <TiltCard key={c.title}>
                  <div className="bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/20 rounded-2xl p-5 h-full transition-colors">
                    <div className="text-2xl mb-3">{c.icon}</div>
                    <div className="text-white font-bold text-sm mb-2">{c.title}</div>
                    <p className="text-zinc-500 text-xs leading-relaxed">{c.desc}</p>
                  </div>
                </TiltCard>
              ))}
              {/* Education card */}
              <div className="col-span-2 bg-gradient-to-br from-violet-500/10 to-indigo-500/5 border border-violet-500/20 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500/60 to-transparent" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[["🎓", "BCA", "Computer Applications"], ["🏫", "Bharathiar", "University, Coimbatore"], ["📅", "2024", "Graduated"]].map(([ic, val, sub]) => (
                    <div key={val}>
                      <div className="text-xl mb-1">{ic}</div>
                      <div className="text-white font-black text-sm">{val}</div>
                      <div className="text-zinc-500 text-xs mt-0.5">{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" className="py-28 md:py-36 px-5 relative bg-[#070710]">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <Orb className="w-[500px] h-[500px] bg-indigo-700/10 top-1/2 right-0 translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHdr eyebrow="Technical Skills" title="What I Work With" sub="Languages, frameworks, and CS fundamentals I've used in production systems." />

          {/* Skill groups as chip clouds */}
          <div className="space-y-10">
            {[
              {
                heading: "Languages", icon: "💻",
                skills: [
                  { label: "Java", icon: "☕", color: "amber" }, { label: "JavaScript", icon: "⚡", color: "yellow" },
                  { label: "SQL", icon: "🗄️", color: "blue" }, { label: "HTML5", icon: "🌐", color: "orange" },
                  { label: "CSS3", icon: "🎨", color: "cyan" },
                ],
              },
              {
                heading: "Backend & APIs", icon: "⚙️",
                skills: [
                  { label: "Spring Boot", icon: "🌱", color: "emerald" }, { label: "Node.js", icon: "🟢", color: "teal" },
                  { label: "Express.js", icon: "🚂", color: "zinc" }, { label: "RESTful API Design", icon: "🔗", color: "blue" },
                  { label: "JWT Auth", icon: "🔐", color: "rose" }, { label: "JPA / Hibernate", icon: "🗃️", color: "amber" },
                  { label: "Spring Security", icon: "🛡️", color: "emerald" },
                ],
              },
              {
                heading: "Frontend", icon: "⚛️",
                skills: [
                  { label: "React 18", icon: "⚛️", color: "cyan" }, { label: "Vite", icon: "⚡", color: "violet" },
                  { label: "Tailwind CSS", icon: "🎨", color: "teal" }, { label: "Responsive Design", icon: "📱", color: "pink" },
                ],
              },
              {
                heading: "AI & Vector", icon: "🤖",
                skills: [
                  { label: "Gemini API", icon: "🤖", color: "indigo" }, { label: "Prompt Engineering", icon: "✍️", color: "violet" },
                  { label: "RAG Pipeline", icon: "🔍", color: "pink" }, { label: "Pinecone Vector DB", icon: "🌲", color: "emerald" },
                  { label: "LLM Integration", icon: "🧠", color: "violet" }, { label: "JSON Schema Validation", icon: "✅", color: "teal" },
                ],
              },
              {
                heading: "Databases & Tools", icon: "🛠️",
                skills: [
                  { label: "PostgreSQL", icon: "🐘", color: "blue" }, { label: "SQLite", icon: "📦", color: "indigo" },
                  { label: "Git / GitHub", icon: "🐙", color: "violet" }, { label: "Postman", icon: "📬", color: "orange" },
                  { label: "Vercel", icon: "▲", color: "zinc" }, { label: "Render", icon: "🚀", color: "teal" },
                  { label: "SendGrid", icon: "📧", color: "cyan" },
                ],
              },
            ].map(group => (
              <div key={group.heading} className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-white/[0.1] transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
                    <span>{group.icon}</span> {group.heading}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map(s => (
                      <SkillChip key={s.label} label={s.label} icon={s.icon} color={s.color} size="lg" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* OOP + DSA */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {/* OOP */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 md:p-8 hover:border-violet-500/20 transition-colors">
              <h3 className="text-white font-bold text-base mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400">📐</span>
                Object-Oriented Programming
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "🔷", name: "Encapsulation", tags: ["private fields", "controlled access"] },
                  { icon: "🔶", name: "Inheritance", tags: ["extends", "class hierarchy"] },
                  { icon: "🔸", name: "Polymorphism", tags: ["overloading", "overriding"] },
                  { icon: "🔹", name: "Abstraction", tags: ["abstract class", "interface"] },
                  { icon: "📋", name: "SOLID Principles", tags: ["SRP", "OCP", "DIP"] },
                  { icon: "🏗️", name: "Design Patterns", tags: ["Repository", "Factory", "Builder"] },
                ].map(c => (
                  <div key={c.name} className="bg-[#050508] border border-white/[0.06] rounded-xl p-4 hover:border-violet-500/20 transition-all group">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{c.icon}</span>
                      <span className="text-white text-sm font-semibold">{c.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map(t => (
                        <span key={t} className="text-[10px] bg-violet-500/10 text-violet-400 border border-violet-500/15 px-2 py-0.5 rounded-full font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DSA */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 md:p-8 hover:border-amber-500/20 transition-colors">
              <h3 className="text-white font-bold text-base mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">🧮</span>
                Data Structures & Algorithms
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "📦", name: "Arrays & Strings", tags: ["two-pointer", "sliding window"] },
                  { icon: "🔗", name: "Linked Lists", tags: ["reversal", "cycle detect"] },
                  { icon: "🌳", name: "Trees & Graphs", tags: ["BFS", "DFS", "BST"] },
                  { icon: "📚", name: "Stacks & Queues", tags: ["monotonic stack", "priority queue"] },
                  { icon: "🔍", name: "Binary Search", tags: ["lower bound", "sorted search"] },
                  { icon: "💡", name: "Recursion & DP", tags: ["memoization", "tabulation"] },
                ].map(c => (
                  <div key={c.name} className="bg-[#050508] border border-white/[0.06] rounded-xl p-4 hover:border-amber-500/20 transition-all group">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{c.icon}</span>
                      <span className="text-white text-sm font-semibold">{c.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map(t => (
                        <span key={t} className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/15 px-2 py-0.5 rounded-full font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" className="py-28 md:py-36 px-5 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <SectionHdr eyebrow="Projects" title="Things I've Built" sub="Real problems solved with real working systems — shipped and deployed." />

          <div className="grid lg:grid-cols-2 gap-8">
            {PROJECTS.map(p => (
              <div key={p.id} className={`card-3d bg-[#0c0c18] border ${p.borderColor} rounded-3xl overflow-hidden relative group`}>
                {/* Top gradient strip */}
                <div className={`h-1 w-full bg-gradient-to-r ${p.id === "midi-v1" ? "from-amber-500 via-orange-400 to-yellow-400" : "from-violet-500 via-indigo-400 to-cyan-400"}`} />

                <div className={`absolute inset-0 bg-gradient-to-br ${p.cardGradient} opacity-70`} />
                <Orb className="w-64 h-64 bg-white/[0.015] -top-10 -right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10 p-7 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border bg-black/40 ${p.borderColor} ${p.accentColor} mb-3`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.dotColor} animate-pulse`} />
                        {p.badge}
                      </span>
                      <div className="text-4xl">{p.emoji}</div>
                    </div>
                    <div className={`text-6xl font-black font-mono ${p.numColor} leading-none`}>{p.num}</div>
                  </div>

                  <h3 className="text-xl font-black text-white mb-2 leading-tight">{p.title}</h3>
                  <p className={`text-sm font-semibold mb-5 ${p.accentColor}`}>{p.subtitle}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">{p.solution.slice(0, 140)}…</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map(t => <SkillChip key={t.label} label={t.label} color={t.color} />)}
                  </div>

                  {/* Highlight bullets */}
                  <ul className="space-y-2 mb-8">
                    {p.highlights.slice(0, 3).map(h => (
                      <li key={h.title} className="flex gap-3 text-sm">
                        <span className="text-emerald-400 flex-shrink-0 mt-0.5 font-bold">→</span>
                        <span className="text-zinc-300 leading-relaxed">
                          <span className="text-white font-semibold">{h.title}:</span>{" "}
                          <span className="text-zinc-400">{h.body.slice(0, 70)}…</span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Period */}
                  <div className="text-zinc-600 text-xs font-mono mb-6">{p.period}</div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => { setPage(p.id); window.scrollTo(0, 0); }}
                      className="flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] text-white font-bold px-5 py-2.5 rounded-xl text-sm border border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5">
                      View Details →
                    </button>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-violet-600/20 hover:-translate-y-0.5">
                        🚀 Demo
                      </a>
                    )}
                    <a href={p.github} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold px-5 py-2.5 rounded-xl text-sm border border-white/[0.07] transition-all hover:-translate-y-0.5">
                      ⭐ GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="py-28 md:py-36 px-5 relative bg-[#070710]">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <Orb className="w-[400px] h-[400px] bg-violet-700/15 bottom-0 left-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHdr eyebrow="Contact" title="Let's Work Together"/>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { icon: "📧", label: "Email", value: "bharathmnr@outlook.com", href: "mailto:bharathmnr@outlook.com", color: "violet" },
              { icon: "📞", label: "Phone", value: "+91-7034264195", href: "tel:+917034264195", color: "indigo" },
              { icon: "⭐", label: "GitHub", value: "github.com/bharath-mnr", href: "https://github.com/bharath-mnr", color: "amber" },
              { icon: "🌐", label: "Portfolio", value: "bharath-portfolio-new.vercel.app", href: "https://bharath-portfolio-new.vercel.app", color: "emerald" },
            ].map(c => (
              <TiltCard key={c.label}>
                <a href={c.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-5 bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/25 rounded-2xl p-6 transition-all group block">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{c.icon}</div>
                  <div className="min-w-0">
                    <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1 font-mono">{c.label}</div>
                    <div className="text-white font-semibold text-sm truncate group-hover:text-violet-300 transition-colors">{c.value}</div>
                  </div>
                  <span className="ml-auto text-zinc-700 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0">→</span>
                </a>
              </TiltCard>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="inline-flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-7 py-4">
              <span className="text-2xl">📍</span>
              <div>
                <div className="text-zinc-500 text-xs">Based in</div>
                <div className="text-white font-semibold text-sm">BTM,  Bangalore</div>
              </div>
              <div className="w-px h-8 bg-white/10 mx-1" />
              <div>
                <div className="text-zinc-500 text-xs">Open to</div>
                <div className="text-emerald-400 font-semibold text-sm">Remote / Relocate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-sm">
          <div>Built by <span className="text-violet-400 font-semibold">Bharath</span> · React · Tailwind CSS · Particle Canvas</div>
          <div className="flex flex-wrap gap-5 justify-center">
            {[["⭐ GitHub", "https://github.com/bharath-mnr"], ["🎹 MIDI v1", "https://midi-generator-seven.vercel.app/"], ["🧠 MIDI v2", "https://midi-generator-v2.vercel.app/"]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="hover:text-violet-400 transition-colors">{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}