import React from "react"
import styled, { css } from "styled-components"
import { v4 as uuid } from "uuid"

import { SOCIALS } from "../../utils/data"
import { XLG } from "../../utils/variables"

const Footer = ({ id }) => {
  return (
    <FooterContainer id={id}>
      <Socials>
        {Object.keys(SOCIALS)
          .filter(
            (item) => !["apple music", "spotify"].includes(item),
          )
          .map((socialKey) => {
            const { url, icon, name } = SOCIALS[socialKey]

            return (
              <li key={uuid()}>
                {url && (
                  <Link href={url} className="h2">
                    {(socialKey === "apple music" ||
                      socialKey === "spotify") && (
                      <ion-icon src={icon}></ion-icon>
                    )}
                    {socialKey !== "apple music" &&
                      socialKey !== "spotify" && (
                        <ion-icon name={icon}></ion-icon>
                      )}
                  </Link>
                )}
                {!url && <Text className="h2">{name}</Text>}
              </li>
            )
          })}
      </Socials>
      <Copyright>
        Sam Drysdale &copy; Copyright {new Date().getFullYear()}
      </Copyright>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  width: 100%;
  margin: 8rem auto 0;
  padding: 1rem;
  position: relative;
  text-align: center;
  max-width: ${XLG}px;

  h1 {
    color: white;
    text-align: center;
    margin-bottom: 1.5rem;
  }
`

const Socials = styled.ul`
  display: flex;
  list-style: none;
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`

const LinkStyles = css`
  margin: 0 0.1rem;
  padding: 0.1rem;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.33);
  transition: 0.3s color ease;
  text-transform: normal;
  font-weight: 600;
  text-transform: initial !important;

  ion-icon {
    font-size: 2.4rem;
    margin: 0 0.3rem;
  }
`

const Link = styled.a`
  ${LinkStyles}

  &:hover {
    color: black;
  }
`

const Text = styled.div`
  ${LinkStyles}
  font-size: 3rem !important;
  font-weight: 200;
`

const Copyright = styled.div`
  margin-top: 8rem;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: calc(0.5rem + env(safe-area-inset-bottom));
`

export default Footer
