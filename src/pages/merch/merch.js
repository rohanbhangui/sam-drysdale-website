import React from "react"
import styled from "styled-components"
import { Grid } from "../../assets/styles/grid"

import { XXXL, XXL } from "../../utils/variables"

import InPool from "../../assets/img/in-pool-offset.jpg"

const Merch = () => {
  return (
    <ScrollBars>
      <RestrictContainer dimension={XXXL}>
        <PoolContainer xs={1}>
          <div className="image">
            <img src={InPool} alt="" />
          </div>
          <div className="content">
            <div className="inner">
              <h1>Merch</h1>
              <h2>Coming soon!</h2>
            </div>
          </div>
        </PoolContainer>
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
  margin: 1rem auto;
  text-align: center;
  padding: 0 1rem;
`

const PoolContainer = styled(Grid)`
  height: 75vh;
  min-height: 32rem;

  .image,
  .content {
    grid-column: 1 / 2;
    grid-row: 1;
  }

  .image {
    height: inherit;
    width: inherit;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 10% center;
      opacity: 0.8;
    }
  }

  .content {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default Merch
