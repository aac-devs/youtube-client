import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Backdrop, Card } from './auth/AuthModal.styles';

const errorModalRoot = document.createElement('div');
errorModalRoot.setAttribute('id', 'error-root');
document.body.appendChild(errorModalRoot);

const ErrorCard = (props) => {
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    errorModalRoot.appendChild(el);
    return () => errorModalRoot.removeChild(el);
  }, [el]);

  const clickHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={() => props.onClose()} data-testid="error-backdrop">
          <Card onClick={clickHandler}>
            <h3 data-testid="error-card-title">{props.title}</h3>
            <p>{props.message}</p>
            <button
              data-testid="error-card-button"
              type="button"
              onClick={() => props.onClose()}
            >
              Acept
            </button>
          </Card>
        </Backdrop>,
        el
      )}
    </>
  );
};

export default ErrorCard;
