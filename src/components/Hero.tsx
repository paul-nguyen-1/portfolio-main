import { memo } from 'react'
import { useParticles } from '../hooks/useParticles'

const Hero = memo(function Hero() {
  const canvasRef = useParticles(60)

  return (
    <section id="hero" className="hero">
      <div className="hero-bg" aria-hidden />
      <div className="hero-grid" aria-hidden />
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden />
      <div>
        <div className="hero-content">
          <p className="hero-tag">
            Masters, Computer Science &nbsp;·&nbsp; UIUC
          </p>
          <h1>
            PAUL
            <br />
            <em>NGUYEN</em>
          </h1>
          <p className="hero-title">Software Engineer</p>
          <p className="hero-desc">
            Building fast, scalable systems from the ground up.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#experience" className="btn-secondary">
              Experience
            </a>
          </div>
        </div>

        <aside className="hero-stats" aria-label="Key stats">
          <StatBadge value="10+" label="Projects" />
          <StatBadge value="4.0" label="GPA · UIUC" />
          <StatBadge value="3+" label="Internships" />
        </aside>
      </div>
    </section>
  )
})

const StatBadge = memo(function StatBadge({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="stat-badge">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
})

export default Hero
