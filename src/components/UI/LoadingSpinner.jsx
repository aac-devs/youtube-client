import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
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
    border-color: #07e4d9 transparent #07e4d9 transparent;
    animation: ${spinner} 1s linear infinite;
  }
`;

const spinnerRoot = document.createElement('div');
spinnerRoot.setAttribute('id', 'spinner-root');
document.body.appendChild(spinnerRoot);

const LoadingSpinner = () => {
  const el = document.createElement('div');

  useEffect(() => {
    spinnerRoot.appendChild(el);
    return () => spinnerRoot.removeChild(el);
  });

  return (
    <>
      {ReactDOM.createPortal(
        <Container data-testid="spinner-backdrop">
          <Spinner data-testid="spinner" />
        </Container>,
        el
      )}
    </>
  );
};

export default LoadingSpinner;
