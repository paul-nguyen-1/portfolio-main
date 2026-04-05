import { memo } from 'react'

const contact = [
  { label: 'paul.nguyen.swe@gmail.com', href: 'mailto:paul.nguyen.swe@gmail.com' },
  { label: '281-673-0521', href: 'tel:+12816730521' },
  { label: 'linkedin.com/in/paul-nguyen-swe', href: 'https://linkedin.com/in/paul-nguyen-swe' },
  { label: 'github.com/paul-nguyen-1', href: 'https://github.com/paul-nguyen-1' },
]

const navLinks = [
  { label: 'Top', href: '#hero' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
]

const Footer = memo(function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">
            PAUL <em>NGUYEN</em>
          </p>
          <p className="footer-sub">Software Engineer &nbsp;·&nbsp; Houston, TX</p>
          <ul className="footer-contact" role="list">
            {contact.map((c) => (
              <li key={c.href}>
                <a href={c.href} className="footer-link-contact" target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="footer-nav" role="list">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="footer-nav-link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="footer-copy">© 2025 Paul Nguyen — Built with precision.</p>
    </footer>
  )
})

export default Footer
