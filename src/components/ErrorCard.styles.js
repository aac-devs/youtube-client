import styled from 'styled-components';

const Card = styled.div`
  width: 300px;
  min-width: 300px;
  max-width: 300px;
  background-color: #fff;
  /* padding: 20px; */
  border-radius: 10px;

  .error-header {
    background-color: red;
    color: #fff;
    padding: 15px 0 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .error-body {
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .error-title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .error-description {
    font-size: 13px;
    margin-bottom: 15px;
    text-align: center;
  }

  button {
    background-color: #3d3daf;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    padding: 5px 10px;
    align-self: stretch;
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #4b4bbe;
    }

    &:active {
      background-color: #2f2fbb;
    }
  }
`;

export default Card;
