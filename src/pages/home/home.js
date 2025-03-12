import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { v4 as uuid } from "uuid"

import { useInView } from "react-intersection-observer"

import { XXXL, XXL, XLG, LG } from "../../utils/variables"

//data imports
import {
  ALBUMS,
  CONCERT_LIST,
  SOCIALS,
  VIDEOS,
} from "../../utils/data"

import IntroShotImg from "../../assets/img/cover-image-3.webp"
import BiographyImg from "../../assets/img/biography-2.webp"
import ListenImg from "../../assets/img/listen-5.webp"
import CollageImg from "../../assets/img/collage-2.webp"
import SignatureImg from "../../assets/img/cursive-logo.svg"

import Album from "../../components/albumItem"
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

  const [albumsArr] = useState(
    ALBUMS.map((item) => {
      return {
        ...item,
        id: uuid(),
      }
    }),
  )

  return (
    <ScrollBars>
      <RestrictContainer dimension={XXXL}>
        {/* <Intro ref={introTitlesRef}>
          <LowKey className="low-key">A reimagination.</LowKey>
          <LowKey className="low-key">A new musical era.</LowKey>
          <HighKey className="high-key">Sam Drysdale.</HighKey>
        </Intro> */}
        <IntroShot>
          <img src={IntroShotImg} alt="" width="320" height="320" />
        </IntroShot>
        <div className="big-text" ref={bigTextRef}>
          <Name className="big">Sam</Name>
          <Name className="big">Drysdale</Name>
        </div>
      </RestrictContainer>
      <Biography id="about">
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
            The rising singer-songwriter is the 4:00am bourbon soaked
            evolution of the highschool kid that just liked to play
            guitar in his bedroom. Raised in a home filled with music,
            Sam started writing and playing guitar at a young age.
            Over the past few years, he has released multiple projects
            that trace the evolution of his distinctive voice and
            lyrical storytelling.
          </p>
          <p>
            Sam is currently wrapping up his latest project titled
            “Bonnie&apos;s Sad Songs,” as he strives to strip things
            back to the core of his songwriting, channeling the raw
            emotionality he discovered early on through the artists he
            grew up admiring. Paring things back to their essence and
            focusing on potent lyrics and intimate melodies, Sam uses
            his talent for crafting compelling narratives and connects
            with the passion that first inspired his musical journey.
          </p>
        </BiographyText>
      </Biography>
      <Listen id="listen">
        <RestrictContainer dimension={XLG} id="listen-restrict">
          <div className="content-container">
            <h2 className="h1">Listen</h2>
            <div className="content">
              {/* <p>
                A reintroduction to the world of Sam Drysdale
                following his 2019 debut "Vicelove". A new sonic
                environment richer in major-driven pop sentiments
                whilst maintaining focus on lyrical depth and growth.
              </p>
              <p>
                A more explorative production endeavor with styles
                ranging in influence from bubblegum to blues.
              </p> */}
            </div>
          </div>
        </RestrictContainer>
        <ListenHeroImage src={ListenImg} alt="" />
        <RestrictContainer dimension={XXL} id="album-restrict">
          <AlbumGroup>
            {albumsArr.map((item) => (
              <Album key={item.id} item={item} />
            ))}
          </AlbumGroup>
        </RestrictContainer>
        {/* <ListenBadges xs={1}>
          <a href={SOCIALS["apple music"].url}>
            <img src={AppleBadge} />
          </a>
          <a href={SOCIALS["spotify"].url}>
            <img src={SpotifyBadge} />
          </a>
        </ListenBadges> */}
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
            {/* <p>
              Testarossa seeks to be more than just a sonic
              experience. A complete aesthetic overall, it strives to
              be a fully realized and calculated artistic offering
              across all platforms. An inviting new landscape to
              accompany the music. All visual elements are co-produced
              and designed by Sam in tandem with his creative partner
              Helder Matias (SunflowerPrince Creative).
            </p> */}

            {/* <h3 className="h2">See More</h3> */}
            <MusicIcon
              className="watch-link"
              href={SOCIALS["youtube"].url}
            >
              <ion-icon name={SOCIALS["youtube"].icon} />
            </MusicIcon>
          </div>
        </Watch>
      </RestrictContainer>
      <Concert id="shows">
        <RestrictContainer dimension={LG}>
          <h2 className="h1">Shows</h2>
          <div className="concert-list">
            {CONCERT_LIST.map(({ title, details, img }) => (
              <div className="tour-block" key={title}>
                {/* <div className="name">{title}</div> */}
                {img ? (
                  <img className="tour-img" src={img} alt="" />
                ) : null}
                <div className="details">
                  {details.map(
                    ({ date, location, link, linkText }) => (
                      <div className="list-item" key={date}>
                        <div className="date">{date}</div>
                        <div className="location">{location}</div>
                        <div className="link">
                          <Button
                            className={
                              linkText == "" ? "disabled" : ""
                            }
                            linkto={link}
                            label={linkText || "Coming Soon"}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* <div className="flex-container">
            <div className="flex-content">
              <h3 className="h2">Live At The El Mocambo</h3>
              <p>
                Sam Drysdale and The El Mocambo present the official
                release show and afterparty for Sam's new album
                “Testarossa: Fully Loaded.” In his first official show
                since the beginning of the pandemic, Sam will be
                joined by Toronto's own Eric Punzo for what is sure to
                be an explosive celebration and opening to his
                Testarossa era. We hope you like champagne
              </p>
              <Button
                linkto={
                  "https://www.ticketweb.ca/event/sam-drysdale-the-testarossa-fully-under-the-neon-palms-at-tickets/11928605?pl=elmocambo"
                }
                label="BUY TICKETS"
                type="outline-invert-pure"
              />
            </div>
            <div className="flex-img">
              <img src={ConcertImg} alt="" />
              <img id="vip-img" src={ConcertImg2} alt="" />
            </div>
          </div> */}
        </RestrictContainer>
      </Concert>
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

// const LowKey = styled.h1`
//   color: ${({ theme }) => theme.colors.text};

//   transform: translateY(5rem);
//   opacity: 0;
//   transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1),
//     transform 1s cubic-bezier(0.77, 0, 0.175, 1);
//   font-size: 3.2rem;

//   @media ${({ theme }) => theme.mediaQuery.large} {
//     font-size: 4rem;
//   }

//   @media ${({ theme }) => theme.mediaQuery.xlarge} {
//     font-size: 5rem;
//   }

//   &.active {
//     opacity: 0.33;
//     transform: translateY(0);
//   }
// `

// const HighKey = styled.h1`
//   color: ${({ theme }) => theme.colors.primary};

//   transform: translateY(5rem);
//   opacity: 0;
//   transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1),
//     transform 1s cubic-bezier(0.77, 0, 0.175, 1);
//   font-size: 3.2rem;

//   @media ${({ theme }) => theme.mediaQuery.large} {
//     font-size: 4rem;
//   }

//   @media ${({ theme }) => theme.mediaQuery.xlarge} {
//     font-size: 5rem;
//   }

//   &.active {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `

// const Intro = styled.div`
//   width: 100%;
//   padding: 6rem 1rem;
// `

const IntroShot = styled.div`
  display: block;
  width: 100%;
  padding-top: 75%;
  margin-bottom: -15%;
  position: relative;
  margin-top: 3rem;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    padding-top: 50%;
    margin-top: 6rem;
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
  color: ${({ theme }) => theme.colors.secondary};

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
    aspect-ratio: 2732/2096;

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
    color: white;

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
  object-position: center 70%;
  order: 1;
  aspect-ratio: 2460/1080;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    order: 2;
  }
`

const AlbumGroup = styled.div`
  display: flex;
  margin-top: 4rem;
  overflow: auto;
`

// const ListenBadges = styled(RestrictContainer)`
//   display: flex;
//   align-items: center;
//   margin: 4rem auto;
//   padding: 0 1rem;
//   justify-content: center;
//   order: 4;

//   a {
//     display: inline-block;
//   }

//   img {
//     height: 3.5rem;
//     width: auto;
//     margin: 0 0.5rem;

//     @media ${({ theme }) => theme.mediaQuery.medium} {
//       height: 3rem;
//     }
//   }
// `

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

const Watch = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 4rem 0;
  gap: 0 2rem;

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
      padding: 1rem 1rem 1rem 1rem;
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
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
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

    h3.h2 {
      color: white;
    }

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

const Concert = styled.div`
  margin: 8rem 0 4rem;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    margin: 8rem 0;
  }

  .h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .flex-container {
    flex-wrap: wrap;
    display: flex;

    @media ${({ theme }) => theme.mediaQuery.medium} {
      flex-wrap: nowrap;
      align-items: flex-start;
    }

    .flex-content {
      flex: 0 0 100%;
      padding: 2rem;
      order: 2;
      position: relative;
      top: 0;

      @media ${({ theme }) => theme.mediaQuery.medium} {
        flex: 0 0 40%;
        order: 1;
        position: sticky;
        top: 0;
      }
    }

    .flex-img {
      flex: 0 0 100%;
      order: 1;
      // padding: 1rem;

      @media ${({ theme }) => theme.mediaQuery.medium} {
        flex: 0 0 60%;
        order: 2;
      }

      img {
        padding: 1rem;

        &#vip-img {
          width: 80%;
          min-width: 25rem;
          // border: 1px solid red;
          position: relative;
          top: -7rem;
          padding: 0;
          margin: 0 auto -7rem;
          display: block;

          @media ${({ theme }) => theme.mediaQuery.medium} {
            width: 100%;
            padding: 1rem;
            margin: 0;
          }
        }
      }
    }
  }

  .concert-list {
    .tour-block {
      .tour-img {
        width: 100%;
        height: auto;
        object-fit: cover;
        object-position: center center;
        margin-bottom: 1rem;
      }

      .details {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: ${LG}px;
        margin: 0 auto;

        @media ${({ theme }) => theme.mediaQuery.medium} {
          gap: 0.5rem;
        }
      }

      .list-item {
        text-align: center;
        display: grid;
        grid-template-columns: 1fr;
        align-items: start; /* Align items to the start of the grid area */
        gap: 0.25rem 0.5rem; /* Space between grid items */

        @media ${({ theme }) => theme.mediaQuery.medium} {
          grid-template-columns: 1fr 1fr 1fr; /* Three columns for date/name, location, and link */
          grid-template-rows: auto; /* Two rows to accommodate date and name stacking */
          gap: 0rem 0.5rem;
        }
      }
    }

    .date {
      grid-column: 1;
      font-weight: 600;
      @media ${({ theme }) => theme.mediaQuery.medium} {
        grid-row: 1;
        align-self: center;
        justify-self: center;
      }
    }

    .name {
      grid-column: 1;
      font-weight: 500;

      @media ${({ theme }) => theme.mediaQuery.medium} {
        grid-column: 1;
        grid-row: 1;
      }
    }

    .location {
      grid-column: 1;
      font-weight: 500;

      @media ${({ theme }) => theme.mediaQuery.medium} {
        grid-column: 2;
        grid-row: 1; /* Align location with the name vertically */
        align-self: center; /* Vertically center location within its grid area */
      }
    }

    .link {
      grid-column: 1;

      @media ${({ theme }) => theme.mediaQuery.medium} {
        grid-column: 3;
        grid-row: 1; /* Span across both rows */
        align-self: center; /* Vertically center link within its grid area */
        justify-self: center;
      }

      a {
        margin-top: 0.5rem;
        @media ${({ theme }) => theme.mediaQuery.medium} {
          margin-top: 0;
        }
      }
    }
  }
`

export default Home
