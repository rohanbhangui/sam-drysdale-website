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
        className="signup-form"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="field">
          <label htmlFor="sd-email">Email</label>
          <input
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
          className="signup-btn"
          type="submit"
        >
          Join
        </button>
      </form>
      <p
        className="signup-success"
        hidden={!submitted}
        role="status"
      >
        You are on the list.
      </p>
    </>
  )
}

export default SignupForm
