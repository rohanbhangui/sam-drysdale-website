import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { XXL } from "../../utils/variables"

import IntroShotImg from "../../assets/img/intro-shot.png";

const Home = () => {
  return (
    <>
      <RestrictContainer>
        <Intro>
          <LowKey>Velvet Grit.</LowKey>
          <LowKey>Urban Surfer.</LowKey>
          <HighKey>True to the Bone.</HighKey>
        </Intro>
        <IntroShot src={IntroShotImg} />
        <h1 className="big">Sam</h1>
        <h1 className="big">Drysdale</h1>
      </RestrictContainer>
    </>
  );
};

const RestrictContainer = styled.div`
  max-width: ${XXL}px;
  width: 100%;
  margin: 0 auto;

`

const LowKey = styled.h1`
  @supports (-webkit-text-stroke: 1px white) {
    -webkit-text-stroke-color: ${({ theme }) => theme.colors.text};
    -webkit-text-stroke-width: 1px;
    -webkit-text-fill-color: rgba(0, 0, 0, 0);
  }

  @supports not (-webkit-text-stroke: 1px white) {
    color: ${({ theme }) => theme.colors.text}
  }
`

const HighKey = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`

const Intro = styled.div`
  margin: 6rem 0;
  width: 100%;
  padding: 0 1rem;
`

const IntroShot = styled.img`
  display: block;
  width: 100%;
  padding: 0 0.5rem;
  margin-bottom: -15%;

  @media ${({ theme }) => theme.mediaQuery.small} {
    margin-bottom: -20%;
  }
`

export default Home;
