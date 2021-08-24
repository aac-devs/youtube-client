import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Container, Spinner } from './LoadingSpinner.styles';

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
