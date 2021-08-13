import styled, { css } from 'styled-components';

export const Container = styled.ul`
  min-width: 300px;
  ${({ display }) =>
    display === 'grid'
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
