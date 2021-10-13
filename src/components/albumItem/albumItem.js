import React from "react"
import styled from "styled-components"

const Album = (props) => {
  const {
    item: { img, title, subtitle, url },
    player,
    toggle,
  } = props

  return (
    <Container>
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
      <Content href={url}>
        <div className="inner">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="go">
          <ion-icon name="arrow-forward-circle" />
        </div>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 0.5rem;
`

const dimension = "15rem"
const mobileDimensions = "18rem"
const AudioPlayer = styled.div`
  background: url(${({ background }) => background});
  background-size: cover;
  width: ${mobileDimensions};
  height: ${mobileDimensions};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media ${({ theme }) => theme.mediaQuery.medium} {
    width: ${dimension};
    height: ${dimension};
  }

  &:hover,
  &.isPlaying {
    button {
      opacity: 1;
    }
  }
`

const size = "4rem"
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

const Content = styled.a`
  display: block;
  padding: 0.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;

  .inner {
    flex: 1 1 auto;
    h3 {
      margin: 0;
      margin-bottom: 0.5rem;

      @media ${({ theme }) => theme.mediaQuery.medium} {
        margin: 0;
      }
    }

    p {
      color: rgba(255, 255, 255, 0.33);
      margin-top: 0;
    }
  }

  .go {
    ion-icon {
      font-size: 2rem;
      opacity: 0;
    }
  }

  &:hover {
    .go {
      ion-icon {
        opacity: 1;
      }
    }
  }
`

export default Album
