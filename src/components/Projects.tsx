import { memo } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface Project {
  num: string
  name: string
  nameAccent: string
  tagline: string
  desc: string
  stack: string[]
  github?: string
  inProgress?: boolean
}

const projects: Project[] = [
  {
    num: 'PROJECT_001',
    name: 'Dash',
    nameAccent: 'Hub',
    tagline: 'CSV-to-Dashboard SaaS with AI Insights',
    desc: 'Upload any CSV and get interactive dashboards with anomaly detection and GPT-4o generated analysis reports. Full-stack SaaS with auth, subscriptions, and a polished React UI built on TanStack Start.',
    stack: ['TanStack Start', 'FastAPI', 'GPT-4o', 'PostgreSQL', 'Recharts', 'Tailwind v4'],
    github: 'https://github.com/paul-nguyen-1',
  },
  {
    num: 'PROJECT_002',
    name: 'Prompt',
    nameAccent: 'Mail',
    tagline: 'AI-Powered Email Assistant',
    desc: 'NestJS backend with OpenAI API that automates email summarization and generates context-aware replies informed by full message history and user writing preferences. Secured with Firebase Auth.',
    stack: ['TypeScript', 'NestJS', 'MongoDB', 'Firebase', 'OpenAI API'],
    github: 'https://github.com/paul-nguyen-1',
  },
  {
    num: 'PROJECT_003',
    name: 'Beavs',
    nameAccent: 'Hub',
    tagline: 'Full-Stack Course Review Platform',
    desc: 'Course review platform adopted by 200+ Oregon State CS students, aggregating 2,200+ peer reviews with real-time difficulty ratings to inform course selection and degree planning.',
    stack: ['React', 'Redux', 'NestJS', 'MongoDB', 'Framer Motion', 'TypeScript'],
    github: 'https://github.com/paul-nguyen-1',
  },
  {
    num: 'PROJECT_004',
    name: 'IBM ',
    nameAccent: 'Notify',
    tagline: 'Unified Webhook Notification System',
    desc: 'Upcoming IBM internship project — unified notification system ingesting webhooks from IBM EWM and routing them via Slack, email, and paging. Java-based with GitHub Enterprise REST APIs.',
    stack: ['Java', 'REST APIs', 'GitHub Enterprise', 'Webhooks'],
    inProgress: true,
  },
]

const GitHubIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const Projects = memo(function Projects() {
  const headRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="projects" className="section section--alt">
      <div ref={headRef} className="section-head reveal">
        <p className="section-tag">03 — Deployed Missions</p>
        <h2>
          Pro<em>jects</em>
        </h2>
      </div>
      <div className="proj-grid">
        {projects.map((p) => (
          <ProjectCard key={p.num} project={p} />
        ))}
      </div>
    </section>
  )
})

const ProjectCard = memo(function ProjectCard({ project: p }: { project: Project }) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="proj-card reveal">
      <p className="proj-num">{p.num}</p>
      <h3 className="proj-name">
        {p.name}
        <em>{p.nameAccent}</em>
      </h3>
      <p className="proj-tagline">{p.tagline}</p>
      <p className="proj-desc">{p.desc}</p>
      <div className="tag-group">
        {p.stack.map((t) => (
          <span key={t} className="ptag">
            {t}
          </span>
        ))}
      </div>
      <div className="proj-links">
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">
            <GitHubIcon />
            GitHub
          </a>
        )}
        {p.inProgress && (
          <span className="proj-link proj-link--dim">In Progress</span>
        )}
      </div>
    </div>
  )
})

export default Projects
