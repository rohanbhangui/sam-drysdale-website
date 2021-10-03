import React from "react"
import styled from "styled-components"

const Album = ({ img, title, subtitle, url }) => {
  return (
    <Container>
      <AlbumCover src={img} />
      <Content href={url}>
        <div className="inner">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <ion-icon name="arrow-forward-circle"></ion-icon>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 0.5rem;

  &:hover {
    ion-icon {
      opacity: 1;
    }
  }
`

const AlbumCover = styled.img`
  width: 15rem;
  height: 15rem;
  object-fit: cover;
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
    }

    p {
      color: rgba(255, 255, 255, 0.33);
      margin-top: 0;
    }
  }

  ion-icon {
    font-size: 2rem;
    opacity: 0;
  }
`

export default Album
