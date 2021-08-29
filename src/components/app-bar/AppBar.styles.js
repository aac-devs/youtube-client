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
    position: relative;
    grid-area: search;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;

    .backdrop-left-menu {
      background-color: rgba(0, 0, 0, 0.7);
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }

    .left-menu-items {
      background-color: white;
      position: absolute;
      top: 20px;
      width: 300px;
      padding: 15px 15px 10px 15px;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      box-shadow: 0px 0px 5px #222;
      transition: left 0.2s ease;

      div {
        padding: 4px 10px;
        border-radius: 5px;
        font-size: 22px;
        cursor: pointer;
        margin-bottom: 5px;
        transition: background-color 0.3s ease-in-out;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &:hover {
          background-color: #ccc;
        }
      }
    }

    .show-left-menu {
      left: 10px;
    }

    .hide-left-menu {
      left: -300px;
    }
  }
  .login-section {
    position: relative;
    grid-area: login;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    p {
      color: ${({ theme }) => theme.appBar.text};
      margin-left: 5px;
    }

    .backdrop-right-menu {
      background-color: rgba(0, 0, 0, 0.7);
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }

    .right-menu-items {
      background-color: white;
      position: absolute;
      top: 20px;
      width: 200px;
      padding: 15px 15px 10px 15px;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      box-shadow: 0px 0px 5px #222;
      transition: right 0.2s ease;

      div {
        padding: 4px 10px;
        border-radius: 5px;
        font-size: 22px;
        cursor: pointer;
        margin-bottom: 5px;
        transition: background-color 0.3s ease-in-out;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &:hover {
          background-color: #ccc;
        }
      }
    }

    .show-right-menu {
      right: 10px;
    }

    .hide-right-menu {
      right: -200px;
    }
  }
`;

export const RoundButton = styled(Button)`
  height: 48px;
  width: 48px;
  min-width: 48px;
  border-radius: 50%;
  border: none;
  padding: 0;
  margin: 0 20px;
  ${({ url }) =>
    url
      ? css`
          background-image: url(${(props) => props.url});
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
