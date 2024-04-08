import React from "react"
import styled, { css } from "styled-components"

import { Link as _Link } from "react-router-dom"

const Button = ({
  linkto,
  onClick,
  type = "default",
  className,
  label,
  hasicon = "",
  disabled,
}) => {
  if (linkto) {
    if (/(http(s?)):\/\//i.test(linkto)) {
      return (
        <ExternalLink
          hasicon={hasicon}
          className={`${className ? `${className} ` : ""}${type}`}
          href={linkto}
          disabled={disabled}
        >
          {label}
          {hasicon !== "" && <ion-icon name={hasicon} />}
        </ExternalLink>
      )
    }

    return (
      <Link
        hasicon={hasicon}
        className={`${className} ${type}`}
        to={linkto}
        disabled={disabled}
      >
        {label}
        {hasicon !== "" && <ion-icon name={hasicon} />}
      </Link>
    )
  }

  return (
    <Action
      hasicon={hasicon}
      className={`${className} ${type}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {hasicon !== "" && <ion-icon name={hasicon} />}
    </Action>
  )
}

const sharedStyle = css`
  padding: 0.4rem 1.5rem;
  display: inline-flex;
  font-weight: 550;
  font-size: 1rem;
  margin-top: 1.5rem;
  text-decoration: none;
  letter-spacing: -0.01rem;

  ${({ hasicon }) =>
    hasicon !== "" &&
    `
    padding: 0.6rem 0 0.6rem 1.25rem;
  `}

  @media ${({ theme }) => theme.mediaQuery.medium} {
    font-size: 0.8rem;
    padding: 0.4rem 1.25rem;

    ${({ hasicon }) =>
      hasicon !== "" &&
      `
    padding: 0.6rem 0 0.6rem 1rem;
  `}
  }

  ion-icon {
    padding-right: 1rem;
    padding-left: 0.5rem;
    font-size: 1.3rem;

    @media ${({ theme }) => theme.mediaQuery.medium} {
      padding-left: 0.5rem;
      padding-right: 0.75rem;
      font-size: 1rem;
    }
  }

  &:active {
    position: relative;
    top: 0.08rem;
  }

  &.disabled {
    opacity: 0.66;
    pointer-events: none;
  }

  &.default {
    color: white;
    background: ${({ theme }) => theme.colors.primary};
  }

  &.outline {
    color: white;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  &.outline-invert {
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid white;
  }

  &.outline-invert-pure {
    color: white;
    border: 2px solid white;
  }
`

const Action = styled.button`
  ${sharedStyle}
`
const Link = styled(_Link)`
  ${sharedStyle}
`
const ExternalLink = styled.a`
  ${sharedStyle}
`

export default Button
