import React from "react"
import styled from "styled-components"

const SongListItem = (props) => {
  const {
    item: { img, title, subtitle, url },
    player,
    toggle,
  } = props

  return (
    <Container>
      <div className="flex-container">
        <AudioPlayer
          onClick={toggle}
          background={img}
          className={player.playing ? "isPlaying" : ""}
        >
          <PlayButton>
            <ion-icon
              name={
                player.playing
                  ? "pause-circle-sharp"
                  : "play-circle-sharp"
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
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

const dimension = "3.5rem"
const AudioPlayer = styled.div`
  background: url(${({ background }) => background});
  background-size: cover;
  width: ${dimension};
  height: ${dimension};
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

const size = "2rem"
const PlayButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  height: ${size};
  opacity: 0;

  ion-icon {
    color: white;
    font-size: ${size};
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
