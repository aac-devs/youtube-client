import styled, { keyframes } from 'styled-components';
import { BackDrop } from '../../global-styles';

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled(BackDrop)`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const Spinner = styled.div`
  width: 80px;
  height: 80px;

  :after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid teal;
    border-color: ${({ theme }) => theme.spinnerColor} transparent
      ${({ theme }) => theme.spinnerColor} transparent;
    animation: ${spinner} 1s linear infinite;
  }
`;
