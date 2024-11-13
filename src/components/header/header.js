import React, { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { NavHashLink as _NavHasLink } from "react-router-hash-link"

import styled, { css } from "styled-components"
import { secondary } from "../../assets/styles/typography"

import LogoImg from "../../assets/img/logo.svg"
import { XXXL } from "../../utils/variables"

const Header = () => {
  const location = useLocation()

  const [isMobileOpen, setIsMobileOpen] = useState("close")

  const toggleOpen = () => {
    setIsMobileOpen((prev) => {
      if (prev === "open") return "close"

      return "open"
    })
  }

  useEffect(() => {
    setIsMobileOpen("close")
  }, [location])

  return (
    <HeaderContainer mobileopen={isMobileOpen}>
      <nav>
        <Link to="/" className="logo-link">
          <Logo src={LogoImg} alt="" />
        </Link>
        <ion-icon
          name={
            isMobileOpen === "close"
              ? "menu-outline"
              : "close-outline"
          }
          onClick={toggleOpen}
        ></ion-icon>
        <ul>
          <NavItem>
            <NavHashLink to="/#listen" activeClassName="selected">
              Listen
            </NavHashLink>
          </NavItem>
          <NavItem>
            <NavHashLink to="/#watch" activeClassName="selected">
              Watch
            </NavHashLink>
          </NavItem>
          <NavItem>
            <NavHashLink to="/#shows" activeClassName="selected">
              Shows
            </NavHashLink>
          </NavItem>
          <NavItem>
            <NavHashLink to="/#about" activeClassName="selected">
              About
            </NavHashLink>
          </NavItem>
          <NavItem>
            <NavHashLink to="/#social" activeClassName="selected">
              Social
            </NavHashLink>
          </NavItem>
          <NavItem>
            <StoreLink
              to="https://shop.samdrysdalemusic.com"
              activeClassName="selected"
            >
              Store
            </StoreLink>
          </NavItem>
        </ul>
      </nav>
    </HeaderContainer>
  )
}

export const HeaderHeight = "4rem"

const HeaderContainer = styled.header`
  height: ${HeaderHeight};
  z-index: 100;
  position: relative;
  margin: 0.5rem 0;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    margin: 0;
  }

  ${({ mobileopen }) =>
    mobileopen === "open" &&
    `
    @media ${({ theme }) => theme.mediaQuery.medium} {
      position: fixed;
      width: 100%;
    }
  `}

  nav {
    justify-content: space-between;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    max-width: ${XXXL}px;
    width: 100%;
    margin: 0 auto;

    @media ${({ theme }) => theme.mediaQuery.medium} {
      justify-content: space-between;
    }

    .logo-link {
      ${({ mobileopen }) =>
        mobileopen === "open" &&
        `
        position: fixed;
        // top: 0.7rem;
      `}
    }

    ul {
      opacity: 0;
      pointer-events: none;
      position: fixed;
      top: 50vh;
      transform: translateY(-50%);
      transition: 0.3s all ease;

      @media ${({ theme }) => theme.mediaQuery.medium} {
        transition: none;
        opacity: 1;
        pointer-events: auto;
        position: relative;
        top: auto;
        transform: none;
      }

      ${({ mobileopen }) =>
        mobileopen === "open" &&
        `
        opacity: 1;
        pointer-events: auto;
      `}
    }

    ion-icon {
      position: relative;
      z-index: 30;
      font-size: 2.25rem;
      transition: 0.3s all ease;

      @media ${({ theme }) => theme.mediaQuery.medium} {
        display: none;
        transition: none;
      }

      ${({ mobileopen }) =>
        mobileopen === "open" &&
        `
        color: white;
        position: fixed;
        top: 1.4rem;
        right: 0.5rem;
      `}
    }

    &:before {
      content: "";
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.7);
      opacity: 0;
      pointer-events: none;
      transition: 0.3s all ease;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      height: 100vh;

      ${({ mobileopen }) =>
        mobileopen === "open" &&
        `
        opacity: 1;
        pointer-events: auto;
      `}

      @media ${({ theme }) => theme.mediaQuery.medium} {
        content: none;
        display: none;
      }
    }
  }
`

const Logo = styled.img`
  width: 4rem;
`

const NavItem = styled.li`
  display: block;
  vertical-align: middle;
  margin: 0 0.8rem;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    display: inline-block;
  }

  a {
    display: inline-block;
  }
`

const NavLinkStyles = css`
  font-size: 2.2rem;
  ${secondary}
  text-transform: uppercase;
  text-decoration: none;
  opacity: 0.33;
  color: white;
  font-weight: 550;
  transition: all 0.15s cubic-bezier(0.77, 0, 0.175, 1);

  @media ${({ theme }) => theme.mediaQuery.medium} {
    font-size: 0.75rem;
    color: black;
  }

  &:visited,
  &:active {
    opacity: 1;

    @media ${({ theme }) => theme.mediaQuery.medium} {
      opacity: 1;
    }
  }

  &:hover {
    opacity: 1;
  }
`

// const NavLink = styled(_NavLink)`
//   ${NavLinkStyles}
// `

const StoreLink = styled(Link)`
  ${NavLinkStyles}
`

const NavHashLink = styled(_NavHasLink)`
  ${NavLinkStyles}
`

export default Header
