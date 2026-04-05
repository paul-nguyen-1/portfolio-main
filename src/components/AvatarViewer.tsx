import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface AvatarViewerProps {
  width?: number
  height?: number
  walk?: boolean
}

export default function AvatarViewer({ width = 360, height = 480, walk = false }: AvatarViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.01, 100)
    camera.position.set(0, 1.1, 5.5)
    camera.lookAt(0, 0.9, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 2.2))
    const key = new THREE.DirectionalLight(0xfff8f0, 2.0)
    key.position.set(3, 6, 5)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xddeeff, 1.0)
    fill.position.set(-4, 2, 3)
    scene.add(fill)

    const mat = (color: number) => new THREE.MeshToonMaterial({ color })

    const C = {
      skin:     0xf2b07a,
      skindark: 0xd9956a,
      hair:     0x1a0d08,
      hoodie:   0xd0cbc4,
      pants:    0x2a55cc,
      shoe:     0xf0ece2,
      white:    0xffffff,
      pupil:    0x111111,
      lip:      0xd4735a,
      ear:      0xe8a06a,
      cap:      0x2a2a2a,
      capbrim:  0x222222,
    }

    const char = new THREE.Group()
    if (walk) char.rotation.y = Math.PI / 2
    scene.add(char)

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.52, 48, 48), mat(C.skin))
    head.position.y = 1.72
    char.add(head)

    for (const s of [-1, 1] as const) {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), mat(C.ear))
      ear.scale.z = 0.5
      ear.position.set(s * 0.52, 1.68, 0)
      char.add(ear)
    }

    for (const s of [-1, 1] as const) {
      const white = new THREE.Mesh(new THREE.SphereGeometry(0.105, 20, 20), mat(C.white))
      white.scale.z = 0.42
      white.position.set(s * 0.185, 1.755, 0.465)
      char.add(white)

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.062, 14, 14), mat(C.pupil))
      pupil.scale.z = 0.3
      pupil.position.set(s * 0.185, 1.755, 0.488)
      char.add(pupil)

      const shine = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), mat(C.white))
      shine.scale.z = 0.25
      shine.position.set(s * 0.198, 1.77, 0.496)
      char.add(shine)

      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.036, 0.036), mat(C.hair))
      brow.position.set(s * 0.185, 1.86, 0.458)
      brow.rotation.z = s * -0.2
      char.add(brow)
    }

    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), mat(C.skindark))
    nose.scale.set(0.85, 0.62, 0.72)
    nose.position.set(0, 1.648, 0.508)
    char.add(nose)

    const smile = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.022, 8, 20, Math.PI), mat(C.lip))
    smile.position.set(0, 1.558, 0.494)
    smile.rotation.z = Math.PI
    char.add(smile)

    const teeth = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.03), mat(C.white))
    teeth.position.set(0, 1.564, 0.502)
    char.add(teeth)

    const crown = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 40, 20, 0, Math.PI * 2, 0, Math.PI * 0.5),
      mat(C.cap),
    )
    crown.position.y = 1.78
    char.add(crown)

    const capBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.555, 0.555, 0.06, 40, 1, true),
      mat(C.cap),
    )
    capBase.position.y = 1.78
    char.add(capBase)

    const brim = new THREE.Mesh(
      new THREE.CylinderGeometry(0.58, 0.58, 0.04, 40, 1, false, -Math.PI * 0.62, Math.PI * 1.24),
      mat(C.capbrim),
    )
    brim.position.set(0, 1.74, 0.22)
    brim.rotation.x = -0.18
    char.add(brim)

    const snapStrap = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.02), mat(C.cap))
    snapStrap.position.set(0, 1.73, -0.54)
    char.add(snapStrap)

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.21, 0.24, 20), mat(C.skin))
    neck.position.y = 1.18
    char.add(neck)

    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.38, 0.78, 20), mat(C.hoodie))
    torso.position.y = 0.66
    char.add(torso)

    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.27, 0.13, 16), mat(C.hoodie))
    collar.position.y = 1.055
    char.add(collar)

    const armGroups: THREE.Group[] = []
    for (const s of [-1, 1] as const) {
      const grp = new THREE.Group()
      grp.position.set(s * 0.44, 0.9, 0)
      char.add(grp)
      armGroups.push(grp)

      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.46, 14), mat(C.hoodie))
      upper.position.set(s * 0.16, -0.24, 0)
      upper.rotation.z = s * 0.3
      grp.add(upper)

      const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.36, 14), mat(C.hoodie))
      lower.position.set(s * 0.29, -0.52, 0.06)
      lower.rotation.z = s * 0.45
      lower.rotation.x = 0.15
      grp.add(lower)

      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14), mat(C.skin))
      hand.position.set(s * 0.38, -0.7, 0.1)
      grp.add(hand)
    }
    const [leftArm, rightArm] = armGroups

    const hip = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.3, 0.2, 16), mat(C.pants))
    hip.position.y = 0.19
    char.add(hip)

    const legGroups: THREE.Group[] = []
    for (const s of [-1, 1] as const) {
      const grp = new THREE.Group()
      grp.position.set(s * 0.17, 0.19, 0)
      char.add(grp)
      legGroups.push(grp)

      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.15, 0.38, 14), mat(C.pants))
      thigh.position.y = -0.27
      grp.add(thigh)

      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.44, 14), mat(C.pants))
      shin.position.y = -0.67
      grp.add(shin)

      const shoe = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), mat(C.shoe))
      shoe.scale.set(1, 0.55, 1.4)
      shoe.position.set(0, -0.94, 0.06)
      grp.add(shoe)
    }
    const [leftLeg, rightLeg] = legGroups

    const noOutline = new Set<THREE.Object3D>([crown, capBase, brim])
    const outlineMat = new THREE.MeshBasicMaterial({ color: 0x080808, side: THREE.BackSide })
    const toOutline: THREE.Mesh[] = []
    char.traverse((obj) => {
      if (obj instanceof THREE.Mesh && !noOutline.has(obj)) toOutline.push(obj)
    })
    toOutline.forEach((obj) => {
      const o = new THREE.Mesh(obj.geometry, outlineMat)
      o.scale.setScalar(1.05)
      obj.add(o)
    })

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.ShadowMaterial({ opacity: 0.18 }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.92
    floor.receiveShadow = true
    scene.add(floor)

    const baseY = char.position.y
    let dragging = false, prevX = 0, prevY = 0, velX = 0, velY = 0

    if (!walk) {
      const onDown = (e: PointerEvent) => {
        dragging = true; velX = 0; velY = 0
        prevX = e.clientX; prevY = e.clientY
        mount.setPointerCapture(e.pointerId)
        mount.style.cursor = 'grabbing'
      }
      const onMove = (e: PointerEvent) => {
        if (!dragging) return
        velX = (e.clientX - prevX) * 0.012
        velY = (e.clientY - prevY) * 0.012
        char.rotation.y += velX
        char.rotation.x = Math.max(-0.55, Math.min(0.55, char.rotation.x + velY))
        prevX = e.clientX; prevY = e.clientY
      }
      const onUp = () => { dragging = false; mount.style.cursor = 'grab' }
      mount.addEventListener('pointerdown', onDown)
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      mount.style.cursor = 'grab'
    }

    let scrollProgress = 0
    let currentSpeed = 0
    let phase = 0

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
    }
    if (walk) window.addEventListener('scroll', onScroll, { passive: true })

    const clock = new THREE.Clock()
    let frameId: number
    const tick = () => {
      frameId = requestAnimationFrame(tick)
      const delta = clock.getDelta()
      const t = clock.elapsedTime

      if (walk) {
        let targetSpeed: number
        if (scrollProgress < 0.02) {
          targetSpeed = 0
        } else if (scrollProgress <= 0.5) {
          targetSpeed = 3.5 + ((scrollProgress - 0.02) / 0.48) * 2.5
        } else {
          targetSpeed = 6 + ((scrollProgress - 0.5) / 0.5) * 7
        }

        currentSpeed += (targetSpeed - currentSpeed) * 0.1
        phase += currentSpeed * delta

        const swing = Math.sin(phase)
        const amp = Math.min(currentSpeed / 10, 1)
        leftLeg.rotation.x  =  swing * 0.6 * amp
        rightLeg.rotation.x = -swing * 0.6 * amp
        leftArm.rotation.x  = -swing * 0.5 * amp
        rightArm.rotation.x =  swing * 0.5 * amp
        char.position.y = baseY + Math.abs(swing) * 0.03 * amp

        char.rotation.z = -currentSpeed * 0.008
      } else {
        char.position.y = baseY + Math.sin(t * 1.4) * 0.025
        if (!dragging) {
          char.rotation.y += velX
          char.rotation.x = Math.max(-0.55, Math.min(0.55, char.rotation.x + velY))
          velX *= 0.88; velY *= 0.88
        }
      }

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(frameId)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      if (walk) window.removeEventListener('scroll', onScroll)
    }
  }, [width, height, walk])

  return <div ref={mountRef} style={{ width, height }} />
}
