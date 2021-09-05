import styled, { css } from 'styled-components';

export const StyledList = styled.ul`
  min-width: 300px;
  ${({ display }) =>
    display === 'home'
      ? css`
          display: grid;
          grid-template-columns: repeat(auto-fit, 300px);
          grid-column-gap: 15px;
          grid-row-gap: 30px;
          justify-content: center;
        `
      : css`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        `}
`;
// : display === 'related'
// ? css`
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;
//   `
