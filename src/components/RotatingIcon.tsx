import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface RotatingIconProps {
  imageSrc: string
  size?: number
}

export default function RotatingIcon({ imageSrc, size = 320 }: RotatingIconProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(size, size)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    mount.appendChild(renderer.domElement)

    const RADIUS = 1
    const texture = new THREE.TextureLoader().load(imageSrc)
    texture.colorSpace = THREE.SRGBColorSpace
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS, 64, 64),
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.6, metalness: 0.1 }),
    )
    sphere.castShadow = true
    scene.add(sphere)

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.ShadowMaterial({ opacity: 0.25 }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -2.05
    floor.receiveShadow = true
    scene.add(floor)

    scene.add(new THREE.AmbientLight(0xffffff, 1.2))
    const key = new THREE.DirectionalLight(0xffffff, 1.8)
    key.position.set(4, 6, 5)
    key.castShadow = true
    scene.add(key)
    const fill = new THREE.DirectionalLight(0x88aaff, 0.4)
    fill.position.set(-4, 2, 3)
    scene.add(fill)

    const halfH = 5 * Math.tan((45 / 2) * (Math.PI / 180)) // ~2.07
    const BOUND_X = halfH - RADIUS
    const BOUND_Y_TOP = halfH - RADIUS
    const BOUND_Y_BOT = -halfH + RADIUS
    const GRAVITY = -0.006
    const BOUNCE = 0.55
    const FRICTION = 0.985

    let px = 0, py = 0.5
    let vx = (Math.random() - 0.5) * 0.06
    let vy = 0

    const rotAxis = new THREE.Vector3()

    let dragging = false
    let dragZ = 0
    let dragVx = 0, dragVy = 0

    const toWorld = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect()
      const ndcX = ((clientX - rect.left) / size) * 2 - 1
      const ndcY = -((clientY - rect.top) / size) * 2 + 1
      const vec = new THREE.Vector3(ndcX, ndcY, dragZ)
      vec.unproject(camera)
      return vec
    }

    const onPointerDown = (e: PointerEvent) => {
      const world = toWorld(e.clientX, e.clientY)
      const dx = world.x - px, dy = world.y - py
      if (Math.sqrt(dx * dx + dy * dy) > RADIUS * 1.5) return
      dragging = true
      dragZ = new THREE.Vector3(px, py, 0).project(camera).z
      dragVx = 0; dragVy = 0
      vx = 0; vy = 0
      mount.setPointerCapture(e.pointerId)
      mount.style.cursor = 'grabbing'
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const world = toWorld(e.clientX, e.clientY)
      dragVx = world.x - px
      dragVy = world.y - py
      px = Math.max(-BOUND_X, Math.min(BOUND_X, world.x))
      py = Math.max(BOUND_Y_BOT, Math.min(BOUND_Y_TOP, world.y))
    }

    const onPointerUp = () => {
      if (!dragging) return
      dragging = false
      vx = dragVx * 0.9
      vy = dragVy * 0.9
      mount.style.cursor = 'grab'
    }

    mount.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    mount.style.cursor = 'grab'

    let frameId: number
    const animate = () => {
      frameId = requestAnimationFrame(animate)

      if (!dragging) {
        vy += GRAVITY
        px += vx
        py += vy

        if (px > BOUND_X) { px = BOUND_X; vx = -Math.abs(vx) * BOUNCE }
        if (px < -BOUND_X) { px = -BOUND_X; vx = Math.abs(vx) * BOUNCE }
        if (py < BOUND_Y_BOT) {
          py = BOUND_Y_BOT; vy = Math.abs(vy) * BOUNCE
          vx *= FRICTION
        }
        if (py > BOUND_Y_TOP) {
          py = BOUND_Y_TOP; vy = -Math.abs(vy) * BOUNCE
        }
      }

      sphere.position.set(px, py, 0)

      const speed = Math.sqrt(vx * vx + vy * vy)
      if (speed > 0.0001) {
        rotAxis.set(vy, -vx, 0).normalize()
        sphere.rotateOnWorldAxis(rotAxis, speed / RADIUS)
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      mount.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [imageSrc, size])

  return <div ref={mountRef} style={{ width: size, height: size }} />
}
