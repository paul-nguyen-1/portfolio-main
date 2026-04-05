import { memo, useEffect, useState } from 'react'
import AvatarViewer from './AvatarViewer'

const links = [
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact', href: '#footer', id: 'footer' },
]

const Nav = memo(function Nav() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: id === 'footer' ? 0.1 : 0.3 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav className="nav">
      <a href="#hero" className="nav-logo">
        <AvatarViewer width={52} height={52} walk />
      </a>
      <ul className="nav-links" role="list">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className={active === l.id ? 'nav-active' : ''}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
})

export default Nav
