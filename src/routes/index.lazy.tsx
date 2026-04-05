import { createLazyFileRoute } from '@tanstack/react-router'
import Hero from '../components/Hero'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Footer from '../components/Footer'
import Divider from '../components/Divider'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <main>
      <Hero />
      <Divider />
      <Education />
      <Divider />
      <Experience />
      <Divider />
      <Projects />
      <Divider />
      <Footer />
    </main>
  )
}
