// album cover imports
import OneMoreNight from "../assets/img/music/one-more-night.jpg"
import Bonnie from "../assets/img/music/Bonnie-Single-Cover.webp"
import LoveViolence from "../assets/img/music/love-violence-single-cover.webp"
import Testarossa from "../assets/img/music/Testarossa-Album-Artwork.webp"

// audio imports
import WastedClip from "../assets/audio/WastedClip.mp3"
import DreamAboutAGirlClip from "../assets/audio/DreamAboutAGirlClip.mp3"
import ShittyFamousClip from "../assets/audio/ShittyFamousClip.mp3"

import Sample1 from "../assets/audio/ShittyFamousClip.mp3"
import Sample2 from "../assets/audio/LikeAManClip.mp3"

// icon imports
import Spotify from "../assets/img/spotify.svg"
import AppleMusic from "../assets/img/apple-music.svg"

// video cover imports
import NothingOnYouVideo from "../assets/img/videos/nothing-on-you-videocover.jpg"
import BonnieVideo from "../assets/img/videos/bonnie-videocover.webp"
import LoveViolenceVideo from "../assets/img/videos/love-violence-videocover.webp"

export const SOCIALS = {
  "apple music": {
    url: "https://music.apple.com/ca/artist/sam-drysdale/589211182",
    icon: AppleMusic,
    name: "Apple Music",
  },
  spotify: {
    url: "https://open.spotify.com/artist/6zWCrZExrSgGtBjCO1jkjY?si=uo0MJu_ARC2Sag8OFnsRuQ&dl_branch=1",
    icon: Spotify,
    name: "Spotify",
  },
  youtube: {
    url: "https://www.youtube.com/channel/UCnoTxG--1KoEY-zfd5JaqgA",
    icon: "logo-youtube",
    name: "Youtube",
  },
  tiktok: {
    url: "https://www.tiktok.com/@sam.drysdale",
    icon: "logo-tiktok",
    name: "Tiktok",
  },
  instagram: {
    url: "https://www.instagram.com/samdrysdalemusic/?hl=en",
    icon: "logo-instagram",
    name: "Instagram",
  },
  twitter: {
    url: "https://twitter.com/SDrysdaleMusic",
    icon: "logo-twitter",
    name: "Twitter",
  },
  facebook: {
    url: "https://www.facebook.com/SamDrysdaleMusic",
    icon: "logo-facebook",
    name: "Facebook",
  },
}

export const ALBUMS = [
  {
    img: Bonnie,
    title: "Bonnie",
    subtitle: "Single",
    url: "https://linktr.ee/samdrysdale",
    audio: undefined,
  },
  {
    img: LoveViolence,
    title: "Love & Violence",
    subtitle: "Single",
    url: "https://linktr.ee/samdrysdale",
    audio: ShittyFamousClip,
  },
  {
    img: Testarossa,
    title: "Testarossa: Fully Loaded",
    subtitle: "Album",
    url: "https://linktr.ee/samdrysdale",
    audio: DreamAboutAGirlClip,
  },
  {
    img: OneMoreNight,
    title: "ViceLove",
    subtitle: "Album",
    url: "https://linktr.ee/samdrysdale",
    audio: WastedClip,
  },
]

export const SONGS = [
  {
    img: OneMoreNight,
    title: "One More Night 0",
    subtitle: "Lorem ipesum",
    url: "#",
    audio: Sample1,
  },
  {
    img: OneMoreNight,
    title: "One More Night 1",
    subtitle: "Lorem ipesum",
    url: "#",
    audio: Sample2,
  },
  {
    img: OneMoreNight,
    title: "One More Night 2",
    subtitle: "Lorem ipesum",
    url: "#",
    audio: Sample1,
  },
  {
    img: OneMoreNight,
    title: "One More Night 3",
    subtitle: "Lorem ipesum",
    url: "#",
    audio: Sample2,
  },
  {
    img: OneMoreNight,
    title: "One More Night 4",
    subtitle: "Lorem ipesum",
    url: "#",
    audio: Sample1,
  },
  {
    img: OneMoreNight,
    title: "One More Night 5",
    subtitle: "Lorem ipesum",
    url: "#",
    audio: Sample2,
  },
  {
    img: OneMoreNight,
    title: "One More Night 6",
    subtitle: "Lorem ipesum",
    url: "#",
    audio: Sample1,
  },
  {
    img: OneMoreNight,
    title: "One More Night 7",
    subtitle: "Lorem ipesum",
    url: "#",
    audio: Sample2,
  },
  {
    img: OneMoreNight,
    title: "One More Night 8",
    subtitle: "Lorem ipesum",
    url: "#",
    audio: Sample1,
  },
  {
    img: OneMoreNight,
    title: "One More Night 9",
    subtitle: "Lorem ipesum",
    url: "#",
    audio: Sample2,
  },
]
export const VIDEOS = [
  {
    name: "Bonnie",
    link: "https://www.youtube.com/watch?v=VB3vwUU_v7E",
    img: BonnieVideo,
  },
  {
    name: "Love and Violence",
    link: "https://www.youtube.com/watch?v=n7RTYXpMvWc",
    img: LoveViolenceVideo,
  },
  {
    name: "Nothing On You",
    link: "https://www.youtube.com/watch?v=qar8Yhh_6pI",
    img: NothingOnYouVideo,
  },
]

export const CONCERT_LIST = [
  {
    name: "SoFar Sounds",
    date: "Mar 22, 2024",
    location: "Toronto, CA",
    link: "https://www.sofarsounds.com/events/55091",
    linkText: "Sold out",
    linkDisabled: true,
  },
]
