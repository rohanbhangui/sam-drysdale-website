"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

import Arrow from "@/components/Arrow"
import ExternalLink from "@/components/ExternalLink"
import { Display, Text } from "@/components/Type"
import { album, links } from "@/lib/site"

type HeroProps = {
  /** Displacement scale of the headline roughness, 0–8. */
  roughness?: number
}

/*
  Two effects on one shared requestAnimationFrame loop.

  Everything here writes transforms and SVG attributes directly to the DOM.
  Driving it through React state would re-render the tree sixty times a
  second — this is the one place in the site where refs are the point.
*/
const Hero = ({ roughness = 2.6 }: HeroProps) => {
  const imgRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const noiseRef = useRef<SVGFETurbulenceElement>(null)
  const dispRef = useRef<SVGFEDisplacementMapElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let wobble = 0
    let frame = 0
    let raf = 0

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return
      target.x = (event.clientX / window.innerWidth - 0.5) * 2
      target.y = (event.clientY / window.innerHeight - 0.5) * 2
    }
    // Resets the target so the scene settles home when the cursor leaves.
    const onPointerLeave = () => {
      target.x = 0
      target.y = 0
    }

    const tick = () => {
      const previousX = current.x
      const previousY = current.y
      current.x += (target.x - current.x) * 0.055
      current.y += (target.y - current.y) * 0.055

      // Cursor speed drives the distortion, eased so it settles when you stop.
      const speed = Math.min(
        1,
        (Math.abs(current.x - previousX) + Math.abs(current.y - previousY)) * 26,
      )
      wobble += (speed - wobble) * 0.09

      frame += 1
      // Every third frame only — the SVG filter is expensive.
      if (frame % 3 === 0 && noiseRef.current && dispRef.current) {
        const t = frame * 0.0022
        const fx = 0.0125 + Math.sin(t) * 0.0035
        const fy = 0.03 + Math.cos(t * 0.78) * 0.008
        noiseRef.current.setAttribute("baseFrequency", `${fx.toFixed(5)} ${fy.toFixed(5)}`)
        dispRef.current.setAttribute("scale", (roughness + wobble * roughness * 1.9).toFixed(2))
      }

      // Opposite signs: the photo drifts against the cursor, the type with it.
      // That opposition is what reads as depth.
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(${(current.x * -26).toFixed(2)}px,${(
          current.y * -18
        ).toFixed(2)}px,0)`
      }
      if (copyRef.current) {
        copyRef.current.style.transform = `translate3d(${(current.x * 12).toFixed(2)}px,${(
          current.y * 8
        ).toFixed(2)}px,0)`
      }

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [roughness])

  return (
    <>
      {/* Turbulence displacement on the H1, animated in the loop above so the
          edges read as wet ink rather than a static filter. */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <filter
          id="sd-rough"
          x="-8%"
          y="-8%"
          width="116%"
          height="116%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            ref={noiseRef}
            type="fractalNoise"
            baseFrequency="0.014 0.032"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            ref={dispRef}
            in="SourceGraphic"
            in2="noise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <section
        className="hero on-dark"
        data-screen-label="01 Hero"
      >
        <div
          className="hero-img"
          ref={imgRef}
        >
          <Image
            src="/assets/cove-brighter-3.jpg"
            alt="Purgatory Cove"
            fill
            sizes="108vw"
            priority
          />
        </div>
        <div className="hero-scrim" />

        <div
          className="hero-copy"
          ref={copyRef}
        >
          <Text
            as="span"
            step="eyebrow"
          >
            The debut album
          </Text>
          <Display
            as="h1"
            step="hero"
            className="hero-title"
          >
            Purgatory
            <br />
            Cove
          </Display>
          <p className="hero-date">{album.releaseDate}</p>
          <div className="btn-row">
            <ExternalLink
              className="btn btn-primary-light"
              href={links.album}
            >
              Pre-order
              <Arrow />
            </ExternalLink>
            <ExternalLink
              className="btn btn-outline-light"
              href={links.album}
            >
              Pre-save
            </ExternalLink>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
