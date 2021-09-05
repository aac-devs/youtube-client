import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
// import ErrorIcon from '@material-ui/icons/Error';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Backdrop } from './auth/AuthModal.styles';
import Card from './ErrorCard.styles';

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
            <div className="error-header">
              <HighlightOffIcon style={{ fontSize: '70px' }} />
            </div>
            <div className="error-body">
              <div className="error-title" data-testid="error-card-title">
                {props.title}
              </div>
              <div className="error-description">{props.message}</div>
              <button
                data-testid="error-card-button"
                type="button"
                onClick={() => props.onClose()}
              >
                Ok
              </button>
            </div>
          </Card>
        </Backdrop>,
        el
      )}
    </>
  );
};

export default ErrorCard;
