import { memo } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface School {
  name: string
  degree: string
  dates: string
  location: string
  gpa: string
  segments: number
  segColor: 'red' | 'gold'
  tags: string[]
}

const schools: School[] = [
  {
    name: 'University of Illinois\nUrbana-Champaign',
    degree: 'Master of Science — Computer Science',
    dates: 'Aug 2025 – Dec 2026',
    location: 'Champaign, IL',
    gpa: '4.0 / 4.0',
    segments: 10,
    segColor: 'red',
    tags: ['Database Systems', 'Text Info Systems', 'Data Curation', 'Machine Learning'],
  },
  {
    name: 'Oregon State\nUniversity',
    degree: 'Bachelor of Science — Computer Science',
    dates: 'Jan 2022 – Aug 2025',
    location: 'Corvallis, OR',
    gpa: '3.8 / 4.0',
    segments: 9,
    segColor: 'gold',
    tags: ['CodePath', 'App Dev Club', 'Hackathon Club'],
  },
]

const Education = memo(function Education() {
  const headRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="education" className="section section--alt">
      <div ref={headRef} className="section-head reveal">
        <p className="section-tag">01 — Academic</p>
        <h2>
          Edu<em>cation</em>
        </h2>
      </div>
      <div className="edu-grid">
        {schools.map((s) => (
          <EduCard key={s.name} school={s} />
        ))}
      </div>
    </section>
  )
})

const EduCard = memo(function EduCard({ school: s }: { school: School }) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="edu-card reveal">
      <h3 className="edu-school">
        {s.name.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i === 0 && <br />}
          </span>
        ))}
      </h3>
      <p className="edu-degree">{s.degree}</p>
      <div className="edu-meta">
        <span className="edu-chip">{s.dates}</span>
        <span className="edu-chip">{s.location}</span>
      </div>
      <span className="gpa-badge">GPA &nbsp;{s.gpa}</span>
      <div className="energy-bar" aria-label={`GPA bar: ${s.segments}/10`}>
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={`seg ${i < s.segments ? `seg--${s.segColor}` : ''}`}
          />
        ))}
      </div>
      <div className="tag-group">
        {s.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
})

export default Education
