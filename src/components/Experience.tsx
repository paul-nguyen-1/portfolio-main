import { memo } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface Job {
  role: string
  company: string
  dates: string
  location: string
  bullets: string[]
  tags: string[]
}

const jobs: Job[] = [
  {
    role: 'Software Engineer Intern',
    company: 'NASA Johnson Space Center',
    dates: 'JAN 2025 – MAY 2025',
    location: 'Houston, TX',
    bullets: [
      'Built Next.js analytics platform for NASAs exercise physiology team, replacing a 12-tab Excel workflow and cutting monthly crew health report generation from 20 hours to 45 minutes.',
      'Engineered D3.js visualization suite on a virtualized React data grid rendering 1M+ PostgreSQL records with a 75× query latency reduction (45s → 600ms).',
      'Built Python/Airflow ETL pipeline eliminating 10+ hours/month of manual file downloads for ARED analysts.',
    ],
    tags: ['Next.js', 'D3.js', 'React', 'PostgreSQL', 'Python', 'Airflow'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Lucid Motors',
    dates: 'MAY 2024 – NOV 2024',
    location: 'Newark, CA',
    bullets: [
      'Discovered and patched a security vulnerability in TypeScript/NestJS, securing 5K workflows from potential data breaches by enforcing proper permission checks.',
      'Built real-time audit log with React, NestJS, and MongoDB change streams across 300+ workflows, enabling resolution of 40+ previously untraceable disputes.',
      'Reduced supplier onboarding regression testing from 8 to 2 hours with 12 Playwright E2E tests, catching 8 critical race conditions in production.',
    ],
    tags: ['TypeScript', 'NestJS', 'React', 'MongoDB', 'Playwright'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Summersalt',
    dates: 'MAY 2023 – MAY 2024',
    location: 'Remote',
    bullets: [
      'Increased add-to-cart rate by 18% with a personalized product carousel, validated via A/B testing across 10K+ monthly users.',
      'Migrated 20+ legacy jQuery components to React, cutting page render time by 25% and cart load time by 1.2s.',
      'Optimized GraphQL queries via batching and caching, reducing latency from 2.1s to 1.3s across 50K+ monthly views.',
    ],
    tags: ['React', 'GraphQL', 'TypeScript', 'A/B Testing'],
  },
]

const Experience = memo(function Experience() {
  const headRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="experience" className="section">
      <div ref={headRef} className="section-head reveal">
        <p className="section-tag">02 — Combat Record</p>
        <h2>
          Experi<em>ence</em>
        </h2>
      </div>
      <div className="timeline">
        {jobs.map((job) => (
          <ExpEntry key={job.company} job={job} />
        ))}
      </div>
    </section>
  )
})

const ExpEntry = memo(function ExpEntry({ job }: { job: Job }) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="exp-entry reveal">
      <div className="exp-card">
        <div className="exp-head">
          <div>
            <h3 className="exp-role">{job.role}</h3>
            <p className="exp-company">{job.company}</p>
            <p className="exp-date">
              {job.dates} &nbsp;·&nbsp; {job.location}
            </p>
          </div>
        </div>
        <ul className="bullets">
          {job.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="tag-group">
          {job.tags.map((t) => (
            <span key={t} className="rtag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
})

export default Experience
