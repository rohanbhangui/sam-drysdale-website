"use client"

import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { useInView } from "react-intersection-observer"

import { ALBUMS, CONCERT_LIST, SOCIALS, VIDEOS } from "@/utils/data"

import AlbumItem from "@/components/albumItem"
import Button from "@/components/button"

const Home = () => {
  const {
    ref: bigTextRef,
    inView: bigTextInView,
    entry: bigTextEntry,
  } = useInView({
    threshold: 1,
    rootMargin: "75px 0px",
  })

  useEffect(() => {
    if (bigTextInView && bigTextEntry && bigTextRef) {
      bigTextEntry.target.querySelectorAll(".big").forEach((val, ind) => {
        setTimeout(() => {
          val.classList.add("active")
        }, ind * 400)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bigTextInView])

  const [albumsArr] = useState(
    ALBUMS.map((item) => ({
      ...item,
      id: uuid(),
    })),
  )

  return (
    <div className="scrollbars">
      <div className="max-w-[1600px] w-full mx-auto">
        <div className="block w-full pt-[75%] -mb-[15%] relative mt-12 medium:pt-[50%] medium:mt-24">
          <img
            src="/img/cover-image-3.webp"
            alt=""
            width="320"
            height="320"
            className="absolute object-cover h-full w-full top-0"
          />
        </div>
        <div className="big-text" ref={bigTextRef}>
          <h1 className="h1 big reveal ml-[5%] text-secondary">Sam</h1>
          <h1 className="h1 big reveal ml-[5%] text-secondary">Drysdale</h1>
        </div>
      </div>

      <div id="about" className="flex my-24 flex-wrap medium:flex-nowrap medium:w-[90%] medium:items-stretch xlarge:my-48 xxlarge:items-start">
        <div className="relative flex-[1_1_100%] mb-[15%] medium:mb-16">
          <h2 className="h1 absolute bottom-[5%] left-4 z-[3] text-white medium:right-[10%] medium:left-auto">
            Biography
          </h2>
          <div className="h-full w-full aspect-[2732/2096]">
            <img
              src="/img/biography-2.webp"
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <img
              src="/img/biography-2.webp"
              alt=""
              className="absolute top-[15%] right-[15%] w-[90%] h-[90%] object-cover object-center"
            />
            <img
              src="/img/biography-2.webp"
              alt=""
              className="absolute z-[2] top-[30%] right-[30%] w-4/5 h-4/5 object-cover object-center"
            />
          </div>
        </div>
        <div className="w-80 p-4 flex-[1_1_100%] medium:flex-[1_0_auto] medium:mt-8 medium:p-[1rem_1rem_1rem_3rem] medium:sticky medium:top-8 xlarge:mt-0 xxlarge:mt-8">
          <p className="!mt-0">
            Sam Drysdale is a singer-songwriter from Toronto, Ontario, known
            for his emotionally rich storytelling and a sound that blends
            folk, Americana, and acoustic-driven pop. After spending several
            years crafting alternative-pop music, Sam returned to his roots
            with the release of his third EP, Bonnie&apos;s Sad Songs, at the
            end of 2024. The project marked a significant artistic shift,
            showcasing a more organic and introspective sonic direction
            influenced by artists like John Mayer, Neil Young, Hozier, Dallas
            Green, and Bruce Springsteen.
          </p>
          <p>
            Following the EP&apos;s release, Sam began rolling out a series of
            singles that continue to explore themes of love, heartbreak, and
            resilience. One standout track from Bonnie&apos;s Sad Songs,
            titled &quot;Only The Strong Survive,&quot; resonated deeply with
            audiences. It has earned over 3,000,000 streams on Spotify and
            generated more than 15,000,000 views on TikTok. The viral success
            of the song introduced Sam to a wider global audience and helped
            establish him as one of Canada&apos;s most promising emerging
            voices in the folk and Americana space.
          </p>
          <p>
            Looking ahead, Sam plans to release more music throughout 2025 as
            he works toward his first full-length album, expected in 2026.
            With each new release, he continues to carve out a distinct space
            in the modern singer-songwriter landscape. His music honors the
            warmth and soul of traditional folk while pushing lyrical
            boundaries and emotional depth.
          </p>
        </div>
      </div>

      <div id="listen" className="pt-8 flex flex-wrap">
        <div className="max-w-[1200px] w-full mx-auto order-2 mt-8 medium:order-1 medium:mt-0">
          <div className="flex flex-wrap p-4 medium:flex-nowrap medium:p-0 medium:mb-12">
            <h2 className="h1 flex-1 mb-4 medium:text-right medium:mb-0">
              Listen
            </h2>
            <div className="medium:w-[70%] medium:columns-2 medium:pl-12" />
          </div>
        </div>
        <img
          src="/img/listen-5.webp"
          alt=""
          className="w-[90%] h-auto block ml-auto mr-0 min-h-[20rem] object-cover object-[center_70%] order-1 aspect-[2460/1080] medium:order-2"
        />
        <div className="max-w-[1440px] w-full mx-auto order-3">
          <div className="flex mt-16 overflow-auto">
            {albumsArr.map((item) => (
              <AlbumItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div id="watch" className="max-w-[1440px] w-full mx-auto">
        <div className="flex flex-wrap my-16 gap-x-8 medium:flex-nowrap medium:my-32 medium:items-start">
          <div className="flex-[1_1_100%] order-2 mb-16 medium:flex-1 medium:order-1 medium:mb-0">
            {VIDEOS.map((video) => (
              <div
                key={uuid()}
                className="flex items-center justify-center h-60 my-4 small:h-[17rem] large:h-80 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${video.img})`,
                }}
              >
                <div className="text-center">
                  <h3 className="h2 text-white">{video.name}</h3>
                  <Button
                    linkto={video.link}
                    label="WATCH"
                    type="outline-invert-pure"
                    className="mt-3!"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 flex-[1_1_100%] order-1 medium:w-80 medium:flex-none medium:p-4 medium:mt-16 medium:sticky medium:top-8 medium:order-2">
            <h2 className="h1">Watch</h2>
            <a
              href={SOCIALS["youtube"].url}
              className="h-6 w-auto mx-[0.4rem] inline-block mt-2 [&_ion-icon]:text-[2.4rem] [&_ion-icon]:opacity-[0.33] [&_ion-icon]:transition-opacity [&_ion-icon]:duration-300 hover:[&_ion-icon]:opacity-100"
            >
              <ion-icon name={SOCIALS["youtube"].icon} />
            </a>
          </div>
        </div>
      </div>

      <div id="shows" className="max-w-[1024px] w-full mx-auto">
        <div className="my-32 mb-16 medium:my-32">
          <h2 className="h1 text-center mb-8">Shows</h2>
          <div>
            {CONCERT_LIST.map(({ title, details, img }) => (
              <div key={title}>
                {img ? (
                  <img
                    className="w-full h-auto object-cover object-center mb-4"
                    src={img}
                    alt=""
                  />
                ) : null}
                <div className="flex flex-col gap-8 max-w-[1024px] mx-auto medium:gap-2">
                  {details.map(({ date, location, link, linkText }) => (
                    <div
                      key={date}
                      className="text-center grid grid-cols-1 items-start gap-x-2 gap-y-1 medium:gap-y-0 medium:grid-cols-3"
                    >
                      <div className="col-start-1 font-semibold medium:row-start-1 medium:self-center medium:justify-self-center">
                        {date}
                      </div>
                      <div className="col-start-1 font-medium medium:col-start-2 medium:row-start-1 medium:self-center medium:justify-self-center">
                        {location}
                      </div>
                      <div className="col-start-1 medium:col-start-3 medium:row-start-1 medium:self-center medium:justify-self-center">
                        <Button
                          className={`mt-2! medium:mt-0! ${linkText === "" ? "saturate-0 opacity-50 pointer-events-none" : ""}`}
                          linkto={link}
                          label={linkText || "Coming Soon"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-4 medium:mx-12 xlarge:mx-20">
        <div className="max-w-[1440px] w-full mx-auto">
          <div className="w-full grid grid-cols-1">
            <img
              className="col-start-1 col-end-2 row-start-1 z-10 self-center w-[70%] justify-self-center"
              src="/img/cursive-logo.svg"
              alt=""
            />
            <img
              className="col-start-1 col-end-2 row-start-1 w-full h-auto justify-self-center self-center object-contain medium:w-[80%]"
              src="/img/collage-2.webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
