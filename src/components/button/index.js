import Link from "next/link"

const sharedClasses =
  "inline-flex mt-6 text-base medium:text-[0.8rem] font-[550] tracking-[-0.01rem] no-underline py-1.5 px-6 medium:py-1.5 medium:px-5 active:relative active:top-[0.08rem] [&_ion-icon]:pr-4 [&_ion-icon]:pl-2 [&_ion-icon]:text-[1.3rem] medium:[&_ion-icon]:pl-2 medium:[&_ion-icon]:pr-3 medium:[&_ion-icon]:text-base"

const typeClasses = {
  default: "text-light bg-primary",
  outline: "text-light border-2 border-primary",
  "outline-invert": "text-primary border-2 border-white",
  "outline-invert-pure": "text-light border-2 border-white",
}

const Button = ({
  linkto,
  onClick,
  type = "default",
  className = "",
  label,
  hasicon = "",
  disabled = false,
}) => {
  const classes = `${sharedClasses} ${typeClasses[type] ?? ""} ${
    hasicon !== "" ? "py-2.5 pl-5 pr-0 medium:py-2.5 medium:pl-4 medium:pr-0" : ""
  } ${disabled ? "saturate-0 opacity-50 pointer-events-none" : ""} ${className}`.trim()

  const content = (
    <>
      {label}
      {hasicon !== "" && <ion-icon name={hasicon} />}
    </>
  )

  if (linkto) {
    if (/(http(s?)):\/\//i.test(linkto)) {
      return (
        <a className={classes} href={linkto} aria-disabled={disabled}>
          {content}
        </a>
      )
    }

    return (
      <Link className={classes} href={linkto} aria-disabled={disabled}>
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  )
}

export default Button
