import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.login.container.background};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 10;
  padding-top: 150px;
`;

export const Card = styled.div`
  position: relative;
  width: 300px;
  background-color: ${({ theme }) => theme.login.card.background};
  color: ${({ theme }) => theme.login.card.color};
  padding: 20px;
  padding-top: 50px;
  border: none;
  box-shadow: ${({ theme }) => theme.login.card.shadow};
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  .image-area {
    position: absolute;
    top: -60px;
    left: 96px;
    height: 126px;
    width: 108px;
    margin-right: 2px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  h5 {
    font-size: 24px;
    text-align: center;
  }

  form {
    padding: 25px 0;
    display: flex;
    flex-direction: column;

    input {
      font-size: 16px;
      border: none;
      outline: none;
      border-bottom: ${({ theme }) => theme.login.input.border};
      padding: 7px 10px;
      margin-bottom: 12px;
      background-color: ${({ theme }) => theme.login.input.background};
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      color: ${({ theme }) => theme.login.input.color};

      ::placeholder {
        color: ${({ theme }) => theme.login.input.placeholder};
      }
    }
    button {
      margin-top: 5px;
      background-color: #f66;
      border: none;
      outline: none;
      border-radius: 20px;
      font-size: 20px;
      font-weight: bold;
      padding: 5px;
      color: #fff;
      cursor: pointer;
      transition: box-shadow 0.3s ease;

      &:hover {
        box-shadow: 0px 0px 6px #f00;
        // background-color: #f00;
      }

      &:active {
        background: #f00;
      }
    }
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    text-decoration: underline;
    color: ${({ theme }) => theme.login.p.color};
    cursor: pointer;
  }
`;
