import React from "react"
import styled from "styled-components"

const Album = ({ img, title, subtitle, url }) => {
  return (
    <Container>
      <AlbumCover src={img} />
      <Content href={url}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 0.5rem;
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

  h3 {
    margin: 0;
  }

  p {
    color: rgba(255, 255, 255, 0.33);
    margin-top: 0;
  }
`

export default Album
