import type { ElementType, ReactNode } from "react"

/*
  The one place sizes are chosen.

  Every step maps to a Tailwind theme token in globals.css, and all of those
  interpolate along a single ramp that tops out at 1440px. So the whole scale
  moves together: retuning the ramp retunes every heading and every block of
  copy at once, and nothing keeps growing on an ultrawide display.

  Pick a step by the role it plays on the page, not by the size you want.
*/
export type DisplayStep =
  /** The homepage H1. One per site. */
  | "hero"
  /** Interior page H1s, and the full-bleed single. */
  | "title"
  /** Major section headings inside a page. */
  | "section"
  /** Secondary section headings — merch, sign-up. */
  | "feature"
  /** Sub-headings within a section. */
  | "sub"
  /** Card and caption headings. */
  | "card"

type DisplayProps = {
  as?: ElementType
  step: DisplayStep
  className?: string
  children: ReactNode
}

const displayClass: Record<DisplayStep, string> = {
  hero: "text-display-hero leading-[0.88] tracking-[-0.015em]",
  title: "text-display-title leading-[0.9] tracking-[-0.015em]",
  section: "text-display-section leading-[0.9]",
  feature: "text-display-feature leading-[0.92]",
  sub: "text-display-sub leading-[0.92]",
  card: "text-display-card leading-none",
}

/**
 * Worldstar, uppercase, off the shared ramp. Display type only — never below
 * the `card` step, and never for body copy.
 */
export const Display = ({
  as: Tag = "h2",
  step,
  className,
  children,
}: DisplayProps) => (
  <Tag
    className={`m-0 font-display font-normal uppercase ${displayClass[step]}${className ? ` ${className}` : ""}`}
  >
    {children}
  </Tag>
)

export type TextStep =
  /** Wide-tracked uppercase label above a heading. */
  | "eyebrow"
  /** Uppercase supporting line — dates, formats. */
  | "meta"
  /** Opening paragraph of a prose column. */
  | "lead"
  /** Body paragraph. */
  | "body"
  /** Small uppercase disclaimer. */
  | "caption"

const textClass: Record<TextStep, string> = {
  eyebrow: "m-0 text-[11px] font-medium tracking-[0.28em] uppercase",
  meta: "m-0 text-row font-light tracking-[0.14em] uppercase text-[rgba(20,18,13,0.68)]",
  lead: "m-0 text-lead font-light leading-[1.55] [text-wrap:pretty]",
  body: "m-0 text-body font-light leading-[1.7] text-[rgba(20,18,13,0.72)] [text-wrap:pretty]",
  caption:
    "m-0 text-[10px] font-normal tracking-[0.2em] uppercase text-[rgba(20,18,13,0.45)]",
}

type TextProps = {
  as?: ElementType
  step: TextStep
  className?: string
  children: ReactNode
}

/**
 * Ballinger Mono, off the same ramp. Everything that isn't display type —
 * labels, supporting lines and prose.
 */
export const Text = ({
  as: Tag = "p",
  step,
  className,
  children,
}: TextProps) => (
  <Tag
    className={`${textClass[step]}${className ? ` ${className}` : ""}`}
  >
    {children}
  </Tag>
)
