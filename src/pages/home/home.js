import React, { useState } from "react"
import styled from "styled-components"
import { v4 as uuid } from "uuid"

import { XXXL, XXL, XLG } from "../../utils/variables"
import useMultiAudio from "../../utils/hooks/useMultiAudio"

//data imports
import { ALBUMS, SOCIALS, SONGS, VIDEOS } from "../../utils/data"

import IntroShotImg from "../../assets/img/intro-shot.png"
import BiographyImg from "../../assets/img/biography.png"
import ListenImg from "../../assets/img/listen.png"

import AppleBadge from "../../assets/img/listen-apple-music-badge.svg"
import SpotifyBadge from "../../assets/img/spotify-badge.png"

import Album from "../../components/albumItem"
import SongListItem from "../../components/songListItem/songListItem"
import Button from "../../components/button"

const Home = () => {
  const [songsArr] = useState(
    SONGS.map((item) => {
      return {
        ...item,
        id: uuid(),
      }
    }),
  )

  const [albumsArr] = useState(
    ALBUMS.map((item) => {
      return {
        ...item,
        id: uuid(),
      }
    }),
  )

  const [players, toggle] = useMultiAudio(
    songsArr.map((item) => item.audio),
  )

  const [albumPlayers, albumToggle] = useMultiAudio(
    albumsArr.map((item) => item.audio),
  )

  return (
    <ScrollBars>
      <RestrictContainer dimension={XXXL}>
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
          <div className="biography-img-stack">
            <img className="smallest" src={BiographyImg} alt="" />
            <img className="smaller" src={BiographyImg} alt="" />
            <img className="" src={BiographyImg} alt="" />
          </div>
        </BiographyImage>
        <BiographyText>
          <p>
            He's that kid we all know. The one who teaches himself
            Wonderwall on the guitar so he can impress his high school
            friends. But turns out we don't really know him at all.
            Because when he graduates real life shows up. He moves to
            LA. Wakes up. Gets inspired. Gets his heart broken. Grows
            up in a hurry. Discovers Hendrix, The Weeknd and the
            blues. Gets soaked in a barrel of bourbon and Sam Drysdale
            the musician is born. Velvet grit. Urban surfer.
            Undefinable yet true to the bone.
          </p>
          <p>
            Sam Drysdale is Toronto bred with time in Nashville and LA
            colouring the mix. A world-traveling musical anomaly
            fusing urban blues with hip hop, R&amp;B with a modern pop
            sensibility; a singer-songwriter with a voice to stop you
            in your tracks. Sam Cooke, John Mayer, The Weeknd, Adele,
            Jay-Z ... you'll find flashes of them all in Sam's music.
          </p>
          <p>
            Anomaly yes, and that is what makes Sam so unique. He is a
            neon-lit west ender who loves Hawaiian shirts and combat
            boots. Raw and honest, surprising and evocative. Ditching
            cliches and bringing on the truth in all its mysterious
            glory. Meet Sam Drysdale.
          </p>
        </BiographyText>
      </Biography>
      <Listen id="listen">
        <RestrictContainer dimension={XLG}>
          <div className="content-container">
            <h2 className="h1">Listen</h2>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt
                in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
          </div>
        </RestrictContainer>
        <ListenHeroImage src={ListenImg} alt="" />
        <RestrictContainer dimension={XXL}>
          <AlbumGroup>
            {albumsArr.map((item, index) => (
              <Album
                key={item.id}
                item={item}
                player={albumPlayers[index]}
                toggle={albumToggle(index)}
              />
            ))}
          </AlbumGroup>
        </RestrictContainer>
        <ListenBadges xs={1}>
          <a href={SOCIALS["apple music"].url}>
            <img src={AppleBadge} />
          </a>
          <a href={SOCIALS["spotify"].url}>
            <img src={SpotifyBadge} />
          </a>
        </ListenBadges>
        <SongReleases dimension={XXL}>
          <SongReleasesTitle>
            <h2>Latest Releases</h2>
            <MusicIcon href={SOCIALS["apple music"].url}>
              <ion-icon src={SOCIALS["apple music"].icon} />
            </MusicIcon>
            <MusicIcon href={SOCIALS["spotify"].url}>
              <ion-icon src={SOCIALS["spotify"].icon} />
            </MusicIcon>
          </SongReleasesTitle>
          <SongsList>
            {songsArr.map((item, index) => (
              <SongListItem
                key={item.id}
                item={item}
                player={players[index]}
                toggle={toggle(index)}
              />
            ))}
          </SongsList>
        </SongReleases>
      </Listen>
      <RestrictContainer dimension={XXL} id="watch">
        <Watch>
          <div className="videos">
            {VIDEOS.map((video) => (
              <Video key={uuid()} cover={video.img}>
                <div className="video-content">
                  <h3 className="h2">{video.name}</h3>
                  <Button
                    linkto={video.link}
                    label="WATCH"
                    type="outline-invert-pure"
                  />
                </div>
              </Video>
            ))}
          </div>
          <div className="content">
            <h2 className="h1">Watch</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <h3 className="h2">See More</h3>
            <MusicIcon
              className="watch-link"
              href={SOCIALS["youtube"].url}
            >
              <ion-icon name={SOCIALS["youtube"].icon} />
            </MusicIcon>
          </div>
        </Watch>
      </RestrictContainer>
    </ScrollBars>
  )
}

const ScrollBars = styled.div`
  @media (hover: hover) {
    * {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.33) rgba(0, 0, 0, 0);
    }

    *::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    *::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0);
    }

    *::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.33);
      border-radius: 10px;
      border: 0px solid ${({ theme }) => theme.colors.dark};

      &:hover {
        background-color: rgba(255, 255, 255, 0.66);
      }
    }
  }
`

const RestrictContainer = styled.div`
  max-width: ${({ dimension }) => dimension || XXL}px;
  width: 100%;
  margin: 0 auto;
`

const LowKey = styled.h1`
  @supports (-webkit-text-stroke: 1px white) {
    -webkit-text-stroke-color: ${({ theme }) => theme.colors.text};
    -webkit-text-stroke-width: 0.5px;
    -webkit-text-fill-color: rgba(0, 0, 0, 0);
  }

  @supports not (-webkit-text-stroke: 1px white) {
    color: ${({ theme }) => theme.colors.text};
  }

  @media ${({ theme }) => theme.mediaQuery.medium} {
    -webkit-text-stroke-width: 1px;
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
  display: flex;
  margin: 6rem 0;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    flex-wrap: nowrap;
    width: 90%;
    align-items: stretch;
  }

  @media ${({ theme }) => theme.mediaQuery.xlarge} {
    margin: 12rem 0;
  }

  @media ${({ theme }) => theme.mediaQuery.xxlarge} {
    align-items: flex-start;
  }
`

const BiographyImage = styled.div`
  position: relative;
  flex: 1 1 100%;
  margin-bottom: 15%;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    margin-bottom: 4rem;
  }

  @media ${({ theme }) => theme.mediaQuery.large} {
    margin-bottom: 4rem;
  }

  .biography-img-stack {
    height: 100%;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;

      &.smaller {
        position: absolute;
        top: 15%;
        right: 15%;
        width: 90%;
        height: 90%;
      }

      &.smallest {
        position: absolute;
        z-index: 2;
        top: 30%;
        right: 30%;
        width: 80%;
        height: 80%;
      }
    }
  }

  h2.h1 {
    position: absolute;
    bottom: 5%;
    left: 1rem;
    z-index: 3;

    @media ${({ theme }) => theme.mediaQuery.medium} {
      right: 10%;
      left: auto;
    }
  }
`

const BiographyText = styled.div`
  width: 20rem;
  padding: 1rem;
  flex: 1 1 100%;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    flex: 1 0 auto;
    margin-top: 2rem;
    padding: 1rem 1rem 1rem 3rem;
    position: sticky;
    top: 2rem;
  }

  @media ${({ theme }) => theme.mediaQuery.xlarge} {
    margin-top: 0rem;
  }

  @media ${({ theme }) => theme.mediaQuery.xxlarge} {
    margin-top: 2rem;
  }
`

const Listen = styled.div`
  padding-top: 2rem;

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

      p:first-child {
        margin-top: 0;
      }
    }
  }
`

const ListenHeroImage = styled.img`
  width: 100%;
  height: auto;
  width: 90%;
  display: block;
  margin-left: auto;
  margin-right: 0;
`

const AlbumGroup = styled.div`
  display: flex;
  margin-top: 4rem;
  overflow: auto;
`

const ListenBadges = styled(RestrictContainer)`
  display: flex;
  align-items: center;
  margin: 4rem auto;
  padding: 0 1rem;
  justify-content: center;

  a {
    display: inline-block;
  }

  img {
    height: 3.5rem;
    width: auto;
    margin: 0 0.5rem;

    @media ${({ theme }) => theme.mediaQuery.medium} {
      height: 3rem;
    }
  }
`

const SongReleases = styled(RestrictContainer)`
  margin-top: 4rem;
  padding: 0 0.5rem;
  display: none;
`

const SongReleasesTitle = styled.div`
  display: flex;
  align-items: center;

  h2 {
    margin-right: 0.5rem;
    margin-bottom: -0.5rem;
  }
`

const MusicIcon = styled.a`
  height: 1.5rem;
  width: auto;
  margin: 0 0.4rem;
  display: inline-block;

  ion-icon {
    font-size: 2.4rem;
    opacity: 0.33;
    transition: opacity 0.3s cubic-bezier(0.77, 0, 0.175, 1);
  }

  &:hover {
    ion-icon {
      opacity: 1;
    }
  }
`

const SongsList = styled.div`
  overflow: auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-auto-flow: column;
  margin-top: 3rem;
`

const Watch = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 4rem 0;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    flex-wrap: nowrap;
    margin: 8rem 0;
    align-items: start;
  }

  .videos {
    flex: 1 1 100%;

    @media ${({ theme }) => theme.mediaQuery.medium} {
      flex: 1 1 auto;
    }
  }

  .content {
    padding: 1rem;
    flex: 1 1 100%;

    @media ${({ theme }) => theme.mediaQuery.medium} {
      width: 20rem;
      flex: 0 0 auto;
      padding: 1rem 1rem 1rem 3rem;
      margin-top: 4rem;
      position: sticky;
      top: 2rem;
    }

    h3.h2 {
      margin-top: 3rem;
    }

    .watch-link {
      margin: 0.5rem 0 0 0;
    }
  }
`

const Video = styled.div`
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.25)
    ),
    url(${({ cover }) => cover});
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15rem;
  margin: 1rem 0;

  @media ${({ theme }) => theme.mediaQuery.small} {
    height: 17rem;
  }

  @media ${({ theme }) => theme.mediaQuery.large} {
    height: 20rem;
  }

  .video-content {
    text-align: center;

    .outline-invert-pure {
      margin-top: 0.75rem;
    }
  }
`

export default Home
