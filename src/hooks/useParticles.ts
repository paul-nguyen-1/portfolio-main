import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  alpha: number
}

function makeParticle(W: number, H: number): Particle {
  const max = 130 + Math.random() * 170
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    life: Math.floor(Math.random() * max),
    max,
    alpha: 0,
  }
}

export function useParticles(count = 60) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    let W = 0
    let H = 0
    let rafId = 0
    let particles: Particle[] = []

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      // Re-init particles on resize so they stay within bounds
      particles = Array.from({ length: count }, () => makeParticle(W, H))
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const frame = () => {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy

        if (p.life > p.max) {
          particles[i] = makeParticle(W, H)
          continue
        }

        const t = p.life / p.max
        p.alpha = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(196,30,58,${p.alpha * 0.5})`
        ctx.fill()
      }

      // Connections — O(n²) but n is small (60)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 90) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(196,30,58,${((90 - d) / 90) * 0.1})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [count])

  return canvasRef
}
