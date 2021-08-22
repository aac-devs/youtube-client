import React, { useEffect, useMemo } from 'react';
// import { useMemo } from 'react';
import ReactDOM from 'react-dom';
import youtubeLogo from '../../../assets/youtube.png';
import { Backdrop, Card } from './Modal.styles';

const loginModalRoot = document.createElement('div');
loginModalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(loginModalRoot);

const Modal = (props) => {
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    loginModalRoot.appendChild(el);
    return () => loginModalRoot.removeChild(el);
  }, [el]);

  const clickHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={() => props.onClose()}>
          <Card onClick={clickHandler}>
            <div className="image-area">
              <img src={youtubeLogo} alt="logo" />
            </div>
            {props.children}
          </Card>
        </Backdrop>,
        el
      )}
    </>
  );
};

export default Modal;
