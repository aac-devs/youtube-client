import styled, { css } from 'styled-components';
import { Button } from '../../global-styles';

export const Container = styled.nav`
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 64px;
  min-height: 64px;
  background-color: ${({ theme }) => theme.appBar.backgroundColor};
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-areas: 'search login';
  border-bottom: ${({ theme }) => theme.border};
  @media (max-width: 960px) {
    grid-template-columns: 100%;
    grid-template-areas: 'search';
  }
  .search-section {
    grid-area: search;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;
  }
  .login-section {
    grid-area: login;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    p {
      color: ${({ theme }) => theme.appBar.text};
      margin-left: 5px;
    }
  }
`;

export const RoundButton = styled(Button)`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  border: none;
  padding: 0;
  margin: 0 20px;
  ${({ url }) =>
    url
      ? css`
          background-image: url(${(props) => props.url});
          /* max-height: 100%; */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        `
      : css`
          background-color: transparent;
          color: ${({ theme }) => theme.appBar.iconColor};
          transition: background-color 0.3s ease-in-out;
          &:hover {
            background-color: ${({ theme }) => theme.hoverColor};
          }
        `}
`;
