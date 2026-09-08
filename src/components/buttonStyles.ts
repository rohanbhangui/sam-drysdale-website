const base =
  "inline-flex cursor-pointer items-center gap-3 whitespace-nowrap rounded-full border-0 text-xs font-medium tracking-[0.2em] uppercase transition-[transform,background] duration-600 ease-cove hover:-translate-y-0.5 active:scale-[0.98]"

export const buttonStyles = {
  primary: `${base} bg-ink py-3 pr-3 pl-6 text-sand hover:text-sand [&>span]:bg-[rgba(239,232,217,0.16)]`,
  primaryLight: `${base} bg-bone py-3 pr-3 pl-6 text-ink hover:text-ink [&>span]:bg-[rgba(20,18,13,0.09)]`,
  outline: `${base} border border-[rgba(20,18,13,0.28)] bg-transparent px-6 py-3 text-ink hover:translate-y-0 hover:bg-[rgba(20,18,13,0.06)] hover:text-ink`,
  outlineLight: `${base} border border-[rgba(247,243,233,0.5)] bg-transparent px-6 py-3 text-bone hover:translate-y-0 hover:bg-[rgba(247,243,233,0.12)] hover:text-bone`,
} as const
