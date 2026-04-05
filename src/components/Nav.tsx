import { memo } from 'react'
import AvatarViewer from './AvatarViewer'

const links = [
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#footer' },
]

const Nav = memo(function Nav() {
  return (
    <nav className="nav">
      <a href="#hero" className="nav-logo">
        <AvatarViewer width={52} height={52} walk />
      </a>
      <ul className="nav-links" role="list">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
})

export default Nav
