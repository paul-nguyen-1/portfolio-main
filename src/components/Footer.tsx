import { memo, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

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

const ContactForm = memo(function ContactForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, message } = form
    const mailto = `mailto:paul.nguyen.swe@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
    window.location.href = mailto
    setSent(true)
    setTimeout(() => setSent(false), 1000)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <div className="contact-field">
          <label className="contact-label">Name</label>
          <input
            className="contact-input"
            type="text"
            required
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="contact-field">
          <label className="contact-label">Email</label>
          <input
            className="contact-input"
            type="email"
            required
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
      </div>
      <div className="contact-field">
        <label className="contact-label">Message</label>
        <textarea
          className="contact-input contact-textarea"
          required
          placeholder="What's on your mind?"
          rows={9}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
      </div>
      <button className="btn-primary contact-submit" type="submit" disabled={sent}>
        {sent ? 'Opening mail client...' : 'Send Message'}
      </button>
    </form>
  )
})

export const Contact = memo(function Contact() {
  const headRef = useScrollReveal<HTMLDivElement>()
  return (
    <section id="footer" className="section">
      <div ref={headRef} className="section-head reveal">
        <p className="section-tag">04 — Get In Touch</p>
        <h2>Con<em>tact</em></h2>
      </div>
      <ContactForm />
    </section>
  )
})

const Footer = memo(function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">
            PAUL <em>NGUYEN</em>
          </p>
          <p className="footer-sub">Software Engineer &nbsp;·&nbsp; Houston, TX</p>
          <ul className="footer-contact" role="list">
            {contact.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  className="footer-link-contact"
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
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
                <a href={l.href} className="footer-nav-link">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
})

export default Footer
