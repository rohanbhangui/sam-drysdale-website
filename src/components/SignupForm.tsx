"use client"

import { useState, type FormEvent } from "react"

/*
  TODO: this only fakes success, exactly as the reference build did. Wire it
  to Laylo, Mailchimp, or a route handler before launch — `links.newsletter`
  in lib/site.ts is the Laylo page the header CTA already points at.
*/
const SignupForm = () => {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <>
      <form
        className="grid-signup grid w-full max-w-[620px] items-end gap-3 text-left"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label
            className="text-[10px] font-medium tracking-[0.24em] text-[rgba(239,232,217,0.72)] uppercase"
            htmlFor="sd-email"
          >
            Email
          </label>
          <input
            className="rounded-full border border-[rgba(239,232,217,0.34)] bg-[rgba(239,232,217,0.08)] px-5 py-3.5 text-sm font-light text-bone outline-none placeholder:text-[rgba(239,232,217,0.4)] focus:border-sand"
            id="sd-email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
          />
        </div>
        {/* The reference build padded the button column with an invisible
            spacer label to line the baselines up; the form's `align-items:end`
            does that properly. */}
        <button
          className="cursor-pointer rounded-full border-0 bg-sand px-6 py-3.5 text-xs font-medium tracking-[0.2em] text-ink uppercase transition-transform duration-600 ease-cove hover:-translate-y-0.5 active:scale-[0.98]"
          type="submit"
        >
          Join
        </button>
      </form>
      <p
        className="m-0 text-[11px] font-normal tracking-[0.18em] text-teal-light uppercase"
        hidden={!submitted}
        role="status"
      >
        You are on the list.
      </p>
    </>
  )
}

export default SignupForm
