import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-gap: 0.7rem;

  ${({ xs }) =>
    xs &&
    `
    grid-template-columns: repeat(${xs}, 1fr);
  `}

  ${({ sm, theme }) =>
    sm &&
    `
    @media ${theme && theme.mediaQuery.small} {
      grid-template-columns: repeat(${sm}, 1fr);
    }
  `}

  ${({ md, theme }) =>
    md &&
    `
    @media ${theme && theme.mediaQuery.medium} {
      grid-template-columns: repeat(${md}, 1fr);
    }
  `}

  ${({ lg, theme }) =>
    lg &&
    `
    @media ${theme && theme.mediaQuery.large} {
      grid-template-columns: repeat(${lg}, 1fr);
    }
  `}

  ${({ xl, theme }) =>
    xl &&
    `
    @media ${theme && theme.mediaQuery.xlarge} {
      grid-template-columns: repeat(${xl}, 1fr);
    }
  `}

  ${({ xxl, theme }) =>
    xxl &&
    `
    @media ${theme && theme.mediaQuery.xxlarge} {
      grid-template-columns: repeat(${xxl}, 1fr);
    }
  `}
`;

export { Grid };
