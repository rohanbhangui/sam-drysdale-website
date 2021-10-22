import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { v4 as uuid } from "uuid"

import { useInView } from "react-intersection-observer"

import { XXXL, XXL, XLG } from "../../utils/variables"
import useMultiAudio from "../../utils/hooks/useMultiAudio"

//data imports
import { ALBUMS, SOCIALS, SONGS, VIDEOS } from "../../utils/data"

import IntroShotImg from "../../assets/img/cover-image.jpg"
import BiographyImg from "../../assets/img/biography.png"
import ListenImg from "../../assets/img/listen-2.png"
import CollageImg from "../../assets/img/collage.png"
import SignatureImg from "../../assets/img/cursive-logo.svg"

import AppleBadge from "../../assets/img/listen-apple-music-badge.svg"
import SpotifyBadge from "../../assets/img/spotify-badge.png"

import Album from "../../components/albumItem"
import SongListItem from "../../components/songListItem/songListItem"
import Button from "../../components/button"

const Home = () => {
  // for intro content loading
  const {
    ref: introTitlesRef,
    inView: introTitlesInView,
    entry: introTitlesEntry,
  } = useInView({
    /* Optional options */
    threshold: 0.2,
  })

  //projects come into view
  useEffect(() => {
    if (introTitlesInView && introTitlesEntry && introTitlesRef) {
      introTitlesEntry.target
        .querySelectorAll(".low-key")
        .forEach((val, ind) => {
          setTimeout(() => {
            val.classList.add("active")
          }, ind * 400)
        })

      setTimeout(() => {
        introTitlesEntry.target
          .querySelector(".high-key")
          .classList.add("active")
      }, 2000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introTitlesInView])

  // for big sam drysdale text
  const {
    ref: bigTextRef,
    inView: bigTextInView,
    entry: bigTextEntry,
  } = useInView({
    /* Optional options */
    threshold: 1,
    rootMargin: "75px 0px",
  })

  //projects come into view
  useEffect(() => {
    if (bigTextInView && bigTextEntry && bigTextRef) {
      bigTextEntry.target
        .querySelectorAll(".big")
        .forEach((val, ind) => {
          setTimeout(() => {
            val.classList.add("active")
          }, ind * 400)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bigTextInView])

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
        <Intro ref={introTitlesRef}>
          <LowKey className="low-key">A reimagination.</LowKey>
          <LowKey className="low-key">A new musical era.</LowKey>
          <HighKey className="high-key">Testarossa.</HighKey>
        </Intro>
        <IntroShot>
          <img src={IntroShotImg} alt="" />
        </IntroShot>
        <div className="big-text" ref={bigTextRef}>
          <Name className="big">Sam</Name>
          <Name className="big">Drysdale</Name>
        </div>
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
            The rising Toronto based singer-songwriter is the 4:00AM,
            bourbon soaked evolution of a high school kid who just
            liked to play guitar in his bedroom. Raw lyrics and a
            velvet grit voice accompany a hybrid sound of modern
            low-fi pop production with hints of R&amp;B and blues
            mixed in the haze. The darkest parts of youth, substance,
            and relationships are his biggest fears, but also his
            muse.
          </p>
          <p>
            Following 2019’s VICELOVE, Sam is currently in the process
            of rolling out his sophomore EP “Testarossa,” due January
            2021. Led by the addictive singles “Dream About A Girl,”
            and “Shitty Famous,” Sam promises his next musical era to
            not disappoint.
          </p>
        </BiographyText>
      </Biography>
      <Listen id="listen">
        <RestrictContainer dimension={XLG} id="listen-restrict">
          <div className="content-container">
            <h2 className="h1">Listen</h2>
            <div className="content">
              <p>
                A reintroduction to the world of Sam Drysdale
                following his 2019 debut "Vicelove". A new sonic
                environment richer in major-driven pop sentiments
                whilst maintaining focus on lyrical depth and growth.
              </p>
              <p>
                A more explorative production endeavor with styles
                ranging in influence from bubblegum to blues.
              </p>
            </div>
          </div>
        </RestrictContainer>
        <ListenHeroImage src={ListenImg} alt="" />
        <RestrictContainer dimension={XXL} id="album-restrict">
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
              Testarossa strives to be more than just a sonic
              experience. It strives to be a fully realized and
              calculated artistic offering across all platforms.
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
      <Collage>
        <RestrictContainer>
          <div className="grid-overlay">
            <img className="signature" src={SignatureImg} alt="" />
            <img className="collage" src={CollageImg} />
          </div>
        </RestrictContainer>
      </Collage>
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

  transform: translateY(5rem);
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1),
    transform 1s cubic-bezier(0.77, 0, 0.175, 1);
  font-size: 3.2rem;

  @media ${({ theme }) => theme.mediaQuery.large} {
    font-size: 4rem;
  }

  @media ${({ theme }) => theme.mediaQuery.xlarge} {
    font-size: 5rem;
  }

  &.active {
    opacity: 1;
    transform: translateY(0);
  }
`

const HighKey = styled.h1`
  color: ${({ theme }) => theme.colors.primary};

  transform: translateY(5rem);
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1),
    transform 1s cubic-bezier(0.77, 0, 0.175, 1);
  font-size: 3.2rem;

  @media ${({ theme }) => theme.mediaQuery.large} {
    font-size: 4rem;
  }

  @media ${({ theme }) => theme.mediaQuery.xlarge} {
    font-size: 5rem;
  }

  &.active {
    opacity: 1;
    transform: translateY(0);
  }
`

const Intro = styled.div`
  width: 100%;
  padding: 6rem 1rem;
`

const IntroShot = styled.div`
  display: block;
  width: 100%;
  padding-top: 75%;
  margin-bottom: -15%;
  position: relative;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    padding-top: 50%;
  }

  img {
    position: absolute;
    object-fit: cover;
    height: 100%;
    width: 100%;
    top: 0;
  }
`

const Name = styled.h1`
  margin-left: 5%;

  transform: translateY(5rem);
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1),
    transform 1s cubic-bezier(0.77, 0, 0.175, 1);

  &.active {
    opacity: 1;
    transform: translateY(0);
  }
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
  display: flex;
  flex-wrap: wrap;

  #listen-restrict {
    order: 2;
    margin-top: 2rem;

    @media ${({ theme }) => theme.mediaQuery.medium} {
      order: 1;
      margin-top: 0;
    }
  }

  #album-restrict {
    order: 3;
  }

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
  min-height: 20rem;
  object-fit: cover;
  object-position: 30% center;
  order: 1;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    order: 2;
  }
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
  order: 4;

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
    order: 2;
    margin-bottom: 4rem;

    @media ${({ theme }) => theme.mediaQuery.medium} {
      flex: 1 1 auto;
      order: 1;
      margin-bottom: 0rem;
    }
  }

  .content {
    padding: 1rem;
    flex: 1 1 100%;
    order: 1;

    @media ${({ theme }) => theme.mediaQuery.medium} {
      width: 20rem;
      flex: 0 0 auto;
      padding: 1rem 1rem 1rem 3rem;
      margin-top: 4rem;
      position: sticky;
      top: 2rem;
      order: 2;
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

const Collage = styled.div`
  margin: 0 1rem;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    margin: 0 3rem;
  }

  @media ${({ theme }) => theme.mediaQuery.xlarge} {
    margin: 0 5rem;
  }

  .grid-overlay {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);

    .signature {
      grid-column: 1 / 2;
      grid-row: 1;
      z-index: 10;
      align-self: center;
      width: 70%;
      justify-self: center;
    }

    .collage {
      opacity: 0.75;
      grid-column: 1 / 2;
      grid-row: 1;
      width: 100%;
      height: auto;
      justify-self: center;
      align-self: center;
      object-fit: contain;

      @media ${({ theme }) => theme.mediaQuery.medium} {
        width: 80%;
      }
    }
  }
`

export default Home
