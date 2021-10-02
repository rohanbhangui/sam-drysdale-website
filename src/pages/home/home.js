import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { Grid } from "../../assets/styles/grid"
import { XXXL, XXL, XLG } from "../../utils/variables"

import IntroShotImg from "../../assets/img/intro-shot.png";
import BiographyImg from "../../assets/img/biography.png";
import ListenImg from "../../assets/img/listen.png";

const Home = () => {
  return (
    <>
      <RestrictContainer dimension={XXL}>
        <Intro>
          <LowKey>Velvet Grit.</LowKey>
          <LowKey>Urban Surfer.</LowKey>
          <HighKey>True to the Bone.</HighKey>
        </Intro>
        <IntroShot src={IntroShotImg} />
        <Name className="big">Sam</Name>
        <Name className="big">Drysdale</Name>
      </RestrictContainer>
      <Biography>
        <BiographyImage>
          <h2 className="h1">Biography</h2>
          <img src={BiographyImg} alt="" />
        </BiographyImage>
        <BiographyText>
          <p>He's that kid we all know. The one who teaches himself Wonderwall on the guitar so he can impress his high school friends. But turns out we don't really know him at all. Because when he graduates real life shows up. He moves to LA. Wakes up. Gets inspired. Gets his heart broken. Grows up in a hurry. Discovers Hendrix, The Weeknd and the blues. Gets soaked in a barrel of bourbon and Sam Drysdale the musician is born. Velvet grit. Urban surfer. Undefinable yet true to the bone.</p>
          <p>Sam Drysdale is Toronto bred with time in Nashville and LA colouring the mix. A world-traveling musical anomaly fusing urban blues with hip hop, R&amp;B with a modern pop sensibility; a singer-songwriter with a voice to stop you in your tracks. Sam Cooke, John Mayer, The Weeknd, Adele, Jay-Z ... you'll find flashes of them all in Sam's music.</p>
          <p>Anomaly yes, and that is what makes Sam so unique. He is a neon-lit west ender who loves Hawaiian shirts and combat boots. Raw and honest, surprising and evocative. Ditching cliches and bringing on the truth in all its mysterious glory. Meet Sam Drysdale.</p>
        </BiographyText>
      </Biography>
      <Listen>
        <RestrictContainer dimension={XLG}>
            <div className="content-container">
              <h2 className="h1">Listen</h2>
              <div className="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
        </RestrictContainer>
        <ListenCover src={ListenImg} alt="" />
      </Listen>
    </>
  );
};

const RestrictContainer = styled.div`
  max-width: ${({ dimension }) => dimension || XXL}px;
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
    margin-bottom: -15%;
  }
`

const Name = styled.h1`
  margin-left: 5%;
`

const Biography = styled.div`
  max-width: ${XXXL}px;
  display: flex;
  margin: 6rem auto;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    flex-wrap: nowrap;
  }
`

const BiographyImage =styled.div`
  position: relative;
  flex: 1 1 100%;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    flex: 1 1 calc(100% - 20rem);
  }

  img {
    width: 100%;
    height: auto;
  }

  h2.h1 {
    position: absolute;
    right: 10%;
    bottom: 10%;
  }
`

const BiographyText =styled.div`
  width: 20rem;
  padding: 1rem;
  flex: 1 1 100%;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    flex 1 0 auto;
    margin-top: 4rem;
    padding: 1rem 1rem 1rem 3rem;
  }
`

const Listen = styled.div`
  .content-container {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;

    @media ${({ theme }) => theme.mediaQuery.medium} {
      flex-wrap: nowrap;
      padding: 0;
      margin-bottom: 3rem;
    }

    h2 {
      flex: 1 1 auto;
      margin-bottom: 1rem;

      @media ${({ theme }) => theme.mediaQuery.medium} {
        text-align: right;
        margin-bottom: 0;
      }
    }

    .content {

      @media ${({ theme }) => theme.mediaQuery.medium} {
        width: 70%;
        column-count: 2;
        padding-left: 3rem;
      }

      p {
        margin-top: 0;
      }
    }
  }
`

const ListenCover = styled.img`
  width: 100%;
  height: auto;
  width: 90%;
  position: relative;
  right: 0;
`

export default Home;
