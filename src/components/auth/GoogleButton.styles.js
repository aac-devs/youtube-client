import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 1px;
  outline: 0;
  border: none;
  cursor: pointer;
  width: 100%;
  height: 52px;
  background-color: #4285f4;
  border-radius: 5px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  transition: box-shadow 0.3s ease;

  .google-icon-wrapper {
    width: 50px;
    height: 50px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .google-icon {
    width: 18px;
    height: 18px;
  }
  .btn-text {
    flex-grow: 1;
    color: #fff;
    font-size: 16px;
    letter-spacing: 0.2px;
  }
  &:hover {
    box-shadow: 0 0 6px #4285f4;
  }
  &:active {
    background: #1669f2;
  }
`;

export default StyledButton;
