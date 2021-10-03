import React from "react"
import styled from "styled-components"

import useAudio from "../../utils/hooks/useAudio"

const SongListItem = ({ img, title, subtitle, url, audio }) => {
  const [playing, toggle] = useAudio(audio)

  return (
    <Container>
      <div className="flex-container">
        <AudioPlayer
          onClick={toggle}
          background={img}
          className={playing ? "isPlaying" : ""}
        >
          <PlayButton>
            <ion-icon
              name={
                playing ? "pause-circle-sharp" : "play-circle-sharp"
              }
            ></ion-icon>
          </PlayButton>
        </AudioPlayer>
        <AudioText href={url}>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </AudioText>
        <a className="goToSong" href={url}>
          <ion-icon name="chevron-forward-sharp"></ion-icon>
        </a>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: inline-block;
  border-bottom: 1px solid #c9c9c9;
  min-width: 20rem;
  padding: 0 0 1rem;

  .flex-container {
    display: flex;
    align-items: center;

    .goToSong {
      height: 100%;
      opacity: 0;
      display: flex;
      align-items: center;
    }

    &:hover {
      .goToSong {
        opacity: 1;
      }
    }
  }

  &:nth-of-type(4n),
  &:last-child {
    border-bottom: none;
  }
`

const AudioPlayer = styled.div`
  background: url(${({ background }) => background});
  background-size: cover;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover,
  &.isPlaying {
    button {
      opacity: 1;
    }
  }
`

const PlayButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  position: relative;
  z-index: 10;
  opacity: 0;

  ion-icon {
    color: white;
    font-size: 2rem;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.66);
  }
`

const AudioText = styled.a`
  display: block;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  flex: 1 1 auto;

  h3 {
    margin: 0;
  }

  p {
    color: rgba(255, 255, 255, 0.33);
    margin-top: 0;
  }
`

export default SongListItem
