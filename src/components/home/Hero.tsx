import Link from 'next/link'
import { Arrow } from '../Icon'
import { NeuralCanvas } from './NeuralCanvas'
import { Typewriter } from './Typewriter'
import { IntroFlag } from './IntroFlag'
import type { Home } from '@/lib/home'

/** Plays the intro only on the first homepage visit of a browser session. */
const introScript = `try{if(sessionStorage.getItem('ai742-intro'))document.documentElement.classList.add('intro-seen');else sessionStorage.setItem('ai742-intro','1')}catch(e){}`

function Core() {
  return (
    <svg viewBox="0 0 520 520" className="core-svg" aria-hidden="true">
      <defs>
        <radialGradient id="coreG" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" /><stop offset=".25" stopColor="#00E5FF" />
          <stop offset=".6" stopColor="#2563EB" stopOpacity=".55" /><stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ringG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563EB" /><stop offset=".5" stopColor="#00E5FF" /><stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <g className="spin-60">
        <circle cx="260" cy="260" r="236" fill="none" stroke="url(#ringG)" strokeWidth="1.2" strokeDasharray="2 10" opacity=".8" />
        <circle cx="260" cy="24" r="6" fill="#00E5FF" filter="url(#glow)" />
        <circle cx="496" cy="260" r="5" fill="#8B5CF6" filter="url(#glow)" />
        <circle cx="93" cy="427" r="5" fill="#2563EB" filter="url(#glow)" />
      </g>
      <g className="spin-rev-36">
        <ellipse cx="260" cy="260" rx="190" ry="68" fill="none" stroke="url(#ringG)" strokeWidth="1.4" opacity=".6" transform="rotate(-24 260 260)" />
        <ellipse cx="260" cy="260" rx="190" ry="68" fill="none" stroke="url(#ringG)" strokeWidth="1.4" opacity=".6" transform="rotate(28 260 260)" />
        <circle cx="91" cy="183" r="6" fill="#050505" stroke="#00E5FF" strokeWidth="2" />
        <circle cx="430" cy="340" r="6" fill="#050505" stroke="#8B5CF6" strokeWidth="2" />
      </g>
      <g className="spin-22">
        <circle cx="260" cy="260" r="130" fill="none" stroke="rgba(0,229,255,.45)" strokeWidth="1.2" strokeDasharray="60 14 4 14" />
        <path d="M260 130 L373 325 L147 325 Z" fill="none" stroke="url(#ringG)" strokeWidth="1.2" opacity=".6" strokeDasharray="6 8" className="dash" />
        <circle cx="260" cy="130" r="7" fill="#00E5FF" filter="url(#glow)" />
        <circle cx="373" cy="325" r="7" fill="#8B5CF6" filter="url(#glow)" />
        <circle cx="147" cy="325" r="7" fill="#2563EB" filter="url(#glow)" />
      </g>
      <circle cx="260" cy="260" r="104" fill="url(#coreG)" opacity=".7" className="pulse-c" />
      <circle cx="260" cy="260" r="60" fill="#080D1A" stroke="url(#ringG)" strokeWidth="2.5" />
      <circle cx="260" cy="260" r="48" fill="none" stroke="rgba(255,255,255,.14)" />
      <text x="260" y="271" textAnchor="middle" fontFamily="Space Grotesk Variable, Space Grotesk, sans-serif" fontWeight="700" fontSize="32" fill="#fff">742</text>
    </svg>
  )
}

export function Hero({ hero }: { hero: Home['hero'] }) {
  const words = (s: string) => s.split(' ').filter(Boolean)
  let w = 0
  const word = (text: string, extra = '', inner?: string) => {
    const delay = `calc(var(--intro) + ${(0.1 + w++ * 0.09).toFixed(2)}s)`
    return (
      <span key={`${text}-${w}`} className={`w ${extra}`} style={{ animationDelay: delay }}>
        {inner ? <span className={inner}>{text}</span> : text}
      </span>
    )
  }
  const join = (nodes: React.ReactNode[]) => nodes.flatMap((n, i) => (i ? [' ', n] : [n]))

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <IntroFlag />
      <div className="intro" aria-hidden="true">
        <svg width="92" height="92" viewBox="0 0 36 36">
          <defs><linearGradient id="lgI" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2563EB" /><stop offset=".5" stopColor="#00E5FF" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient></defs>
          <rect className="d" pathLength={1} x="1" y="1" width="34" height="34" rx="10" fill="none" stroke="url(#lgI)" strokeWidth="1" />
          <path className="d" pathLength={1} d="M11 25 L18 11 L25 25 Z" fill="none" stroke="url(#lgI)" strokeWidth="1" style={{ animationDelay: '.35s' }} />
          <circle className="n" cx="18" cy="11" r="2.4" fill="#00E5FF" style={{ animationDelay: '.7s' }} />
          <circle className="n" cx="11" cy="25" r="2.4" fill="#2563EB" style={{ animationDelay: '.8s' }} />
          <circle className="n" cx="25" cy="25" r="2.4" fill="#8B5CF6" style={{ animationDelay: '.9s' }} />
        </svg>
        <div className="mono-small" style={{ letterSpacing: '.3em' }}>AI 742 · INITIALIZING</div>
        <div className="introbar-track"><div className="introbar" /></div>
      </div>

      <section className="hero" aria-label="Introduction">
        <NeuralCanvas />
        <div className="hero-orb hero-orb--a" aria-hidden="true" />
        <div className="hero-orb hero-orb--b" aria-hidden="true" />

        <div className="hero-inner container">
          <h1 className="hero-badge fade" style={{ animationDelay: 'var(--intro)' }}>
            <span className="badge-dot" aria-hidden="true"><span /><span /></span>
            {hero.badge}
          </h1>
          <p className="h-hero hero-title">
            {join(words(hero.line1).map((t) => word(t)))}
            <br />
            {join(words(hero.line2).map((t) => word(t, 'hero-dim')))}
            <br />
            {join(words(hero.line3).map((t) => word(t, 'glowtext', 'grad')))}
          </p>
          <Typewriter phrases={hero.phrases.map((p) => p.text)} />
          <p className="lead fade hero-sub" style={{ animationDelay: 'calc(var(--intro) + .9s)' }}>{hero.subheadline}</p>
          <div className="hero-ctas fade" style={{ animationDelay: 'calc(var(--intro) + 1.05s)' }}>
            <Link href={hero.primaryHref} className="btn btn-primary magnetic">{hero.primaryLabel}<Arrow size={18} /></Link>
            <Link href={hero.secondaryHref} className="btn btn-ghost magnetic">{hero.secondaryLabel}</Link>
          </div>
          <Link href="/ai-readiness-assessment" className="more fade hero-assess" style={{ animationDelay: 'calc(var(--intro) + 1.2s)' }}>
            Not sure where to start? Take the free AI readiness assessment<Arrow size={14} />
          </Link>
        </div>

        <div className="hero-cards" aria-hidden="true">
          <div className="hcard-pos hcard-pos--l1"><div className="fade" style={{ animationDelay: 'calc(var(--intro) + 1.3s)' }}>
            <div className="hcard float-6">
              <div className="hcard-head"><span>◆ CHAT AGENT</span><span className="live-dot" /></div>
              <div className="hcard-bubble">Can I book a demo this week?</div>
              <div className="hcard-typing"><span /><span /><span /></div>
            </div>
          </div></div>
          <div className="hcard-pos hcard-pos--l2"><div className="fade" style={{ animationDelay: 'calc(var(--intro) + 1.5s)' }}>
            <div className="hcard float-7">
              <div className="hcard-head hcard-head--purple">◆ VOICE AGENT</div>
              <div className="hcard-wave">{Array.from({ length: 16 }, (_, i) => <span key={i} style={{ animationDuration: `${(0.8 + (i % 5) * 0.17).toFixed(2)}s`, animationDelay: `${(-(i * 0.13)).toFixed(2)}s` }} />)}</div>
            </div>
          </div></div>
          <div className="hcard-pos hcard-pos--r1"><div className="fade" style={{ animationDelay: 'calc(var(--intro) + 1.4s)' }}>
            <div className="hcard float-65">
              <div className="hcard-head">◆ WORKFLOW</div>
              <div className="hcard-flow"><i className="ln" /><i className="dotm" />{['6%', '35%', '65%', '94%'].map((l) => <i key={l} className="node" style={{ left: l }} />)}</div>
              <div className="hcard-flow-labels"><span>Inquiry</span><span>Qualify</span><span>CRM</span><span>Book</span></div>
            </div>
          </div></div>
          <div className="hcard-pos hcard-pos--r2"><div className="fade" style={{ animationDelay: 'calc(var(--intro) + 1.6s)' }}>
            <div className="hcard float-75">
              <div className="hcard-head">◆ INSIGHTS</div>
              <svg viewBox="0 0 180 50" className="hcard-spark"><defs><linearGradient id="spk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2563EB" /><stop offset=".5" stopColor="#00E5FF" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient></defs><path pathLength={1} d="M2 44 L24 38 L44 40 L66 28 L88 32 L110 20 L132 22 L154 10 L178 6" fill="none" stroke="url(#spk)" strokeWidth="2" /></svg>
            </div>
          </div></div>
        </div>

        <div className="hero-stage" aria-hidden="true">
          <div className="stage-glow" />
          <div className="stage-core"><div className="stage-core-rise"><Core /></div></div>
          <div className="stage-horizon" />
          <div className="gridbg stage-grid" />
        </div>
        <a href="#trust" className="scroll-cue fade" style={{ animationDelay: 'calc(var(--intro) + 1.7s)' }} aria-label="Scroll to next section"><span /></a>
      </section>
    </>
  )
}
