"use client"

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import Image from "next/image"

import Arrow from "@/components/Arrow"
import ExternalLink from "@/components/ExternalLink"
import { Display, Text } from "@/components/Type"
import { album, links } from "@/lib/site"
import { buttonStyles } from "@/components/buttonStyles"
import styles from "./Hero.module.css"

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"
const SMALL_SCREEN = "(max-width: 768px)"

/* 1080p ~2.1MB with audio; 720p ~565KB, silent. Both cut from the 4K master. */
const HERO_VIDEO = "/assets/hero.mp4"
const HERO_VIDEO_SMALL = "/assets/hero-mobile.mp4"

/*
  Which loop this visitor gets, or none at all.

  Read through useSyncExternalStore rather than an effect so the server
  snapshot is always null: no video is in the SSR markup, and the browser only
  fetches one once the client has decided which. Phones get the smaller cut —
  they are the ones on cellular data, and a 1080p loop on a 390px screen is
  mostly pixels nobody sees.
*/
const subscribeToVideoSource = (onChange: () => void) => {
  const queries = [
    window.matchMedia(REDUCED_MOTION),
    window.matchMedia(SMALL_SCREEN),
  ]
  queries.forEach((query) =>
    query.addEventListener("change", onChange),
  )
  return () =>
    queries.forEach((query) =>
      query.removeEventListener("change", onChange),
    )
}

const getVideoSource = () => {
  if (window.matchMedia(REDUCED_MOTION).matches) return null
  // Data Saver / metered connection — a decorative loop is not worth it.
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection
  if (connection?.saveData) return null
  return window.matchMedia(SMALL_SCREEN).matches
    ? HERO_VIDEO_SMALL
    : HERO_VIDEO
}

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

  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const videoSrc = useSyncExternalStore(
    subscribeToVideoSource,
    getVideoSource,
    () => null,
  )

  /*
    Safari, iOS especially, only honours autoplay when the element is muted at
    the moment play() is called — and React sets `muted` as a DOM property, so
    the attribute alone is not enough. Setting it imperatively and then calling
    play() ourselves covers that. play() rejects rather than throws when the
    browser declines, so the catch is required or it surfaces as an unhandled
    rejection; if it does decline we simply keep showing the still.
  */
  const onCanPlay = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    void video.play().then(
      () => setVideoReady(true),
      () => {},
    )
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return

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
        (Math.abs(current.x - previousX) +
          Math.abs(current.y - previousY)) *
          26,
      )
      wobble += (speed - wobble) * 0.09

      frame += 1
      // Every third frame only — the SVG filter is expensive.
      if (frame % 3 === 0 && noiseRef.current && dispRef.current) {
        const t = frame * 0.0022
        const fx = 0.0125 + Math.sin(t) * 0.0035
        const fy = 0.03 + Math.cos(t * 0.78) * 0.008
        noiseRef.current.setAttribute(
          "baseFrequency",
          `${fx.toFixed(5)} ${fy.toFixed(5)}`,
        )
        dispRef.current.setAttribute(
          "scale",
          (roughness + wobble * roughness * 1.9).toFixed(2),
        )
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

    window.addEventListener("pointermove", onPointerMove, {
      passive: true,
    })
    window.addEventListener("pointerleave", onPointerLeave, {
      passive: true,
    })
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
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
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

      <section className={styles.hero} data-screen-label="01 Hero">
        <div className={styles.image} ref={imgRef}>
          {/* Frame 0 of hero.mp4, not a separate photograph. The old still
              was the same location but a different framing — the cave mouth
              sat lower in the frame — so no single object-position could line
              the two layers up and the crossfade visibly jumped. Taking the
              poster from the loop's own first frame makes them identical by
              construction. */}
          <Image
            src="/assets/hero-poster.jpg"
            alt="Purgatory Cove"
            fill
            sizes="108vw"
            priority
          />
          {/* Same shot as the still above, so the crossfade is seamless.
              Decorative and silent, so it is hidden from assistive tech and
              taken out of the tab order. */}
          {videoSrc && (
            <video
              className={`${styles.video} ${videoReady ? styles.videoReady : ""}`}
              ref={videoRef}
              src={videoSrc}
              // Same frame again, in case the element paints before the fade.
              poster="/assets/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              onCanPlay={onCanPlay}
            />
          )}
        </div>

        <div className={styles.copy} ref={copyRef}>
          <Text
            as="span"
            step="eyebrow"
            className="text-[rgba(247,243,233,0.72)]"
          >
            The debut album
          </Text>
          <Display as="h1" step="hero" className={styles.title}>
            Purgatory
            <br />
            Cove
          </Display>
          <p className="m-0 text-row font-light tracking-[0.12em] text-[rgba(239,232,217,0.86)] uppercase">
            {album.releaseDate}
          </p>
          <div className="flex flex-wrap gap-3">
            <ExternalLink
              className={buttonStyles.primaryLight}
              href={links.album}
            >
              Pre-order
              <Arrow />
            </ExternalLink>
            <ExternalLink
              className={buttonStyles.outlineLight}
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
