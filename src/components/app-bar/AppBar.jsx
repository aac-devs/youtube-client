import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery, Switch } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import SearchBox from './SearchBox';
import YoutubeLogo from '../YoutubeLogo';
import { useAppContext } from '../../context/app-context';
import { useAuthContext } from '../../context/auth-context';
import { Container, RoundButton } from './AppBar.styles';
import { types } from '../../types/types';
import loggedIcon from '../../assets/logged.png';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import Modal from '../auth/AuthModal';
import {
  sighUpWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
} from '../../lib/firebase-api';
import ErrorCard from '../ErrorCard';
import DropMenu from './DropMenu';

const AppBar = () => {
  const history = useHistory();
  const matches = useMediaQuery('(max-width:960px)');
  const { appTheme, changeAppTheme } = useAppContext();
  const { user, error, login, logout, setError, resetError } = useAuthContext();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuSide, setMenuSide] = useState('');

  const { pathname } = history.location;

  // Login Modal:
  const showModal = () => {
    setShowModalForm(true);
  };

  const hideModal = () => {
    setShowModalForm(false);

    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const showRegisterFormHandler = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const showLoginFormHandler = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  // Authentication:
  const authLoginHandler = ({ ok, user: loginUser, error: loginError }) => {
    resetError();
    if (ok && loginUser) {
      login(loginUser);
    } else if (ok && !loginUser) {
      logout();
    } else {
      setError('Authentication error', loginError);
    }
    hideModal();
  };

  const userSignUpHandler = async (signUpUser) => {
    authLoginHandler(await sighUpWithEmailAndPassword(signUpUser));
  };

  const userSignInHandler = async (signInUser) => {
    authLoginHandler(await signInWithEmailAndPassword(signInUser));
  };

  const googleSignInHandler = async () => {
    authLoginHandler(await signInWithGoogle());
  };

  const userSignOutHandler = async () => {
    authLoginHandler(await signOut());
  };

  const closeErrorHandler = () => {
    resetError();
  };

  // Theme:
  const changeThemeHandler = (event) => {
    if (!event?.target) {
      changeAppTheme(event);
      return;
    }
    if (event.target.checked) {
      changeAppTheme(types.theme.light);
    } else {
      changeAppTheme(types.theme.dark);
    }
  };

  // Menu:
  const menuCloseHandler = (option) => {
    if (option.page) {
      history.push(option.page);
    }
    if (option.user === 'Sign In') {
      showModal();
    }
    if (option.user === 'Sign Out') {
      userSignOutHandler();
    }
    if (option.theme) {
      changeThemeHandler(option.theme);
    }
    setTimeout(() => {
      setShowMenu(false);
    }, 500);
  };

  const menuOpenHandler = (side) => {
    setShowMenu(true);
    setMenuSide(side);
  };

  const themeModeText =
    appTheme === types.theme.light ? <p>Light mode</p> : <p>Dark mode</p>;
  let swTheme = false;
  if (appTheme === types.theme.light) {
    swTheme = true;
  }

  const source = user?.photoURL || loggedIcon;

  return (
    <Container>
      {error && <ErrorCard onClose={closeErrorHandler} {...error} />}
      {showModalForm && (
        <Modal onClose={hideModal}>
          {showLoginForm && (
            <LoginForm
              onOpenRegisterForm={showRegisterFormHandler}
              onGoogleClick={googleSignInHandler}
              onUserSignIn={userSignInHandler}
            />
          )}
          {showRegisterForm && (
            <RegisterForm
              onOpenLoginForm={showLoginFormHandler}
              onUserSignUp={userSignUpHandler}
            />
          )}
        </Modal>
      )}

      <div className="search-section">
        <YoutubeLogo
          withText={!matches}
          onClick={
            matches ? () => menuOpenHandler('left') : () => history.push('/videos')
          }
        />
        <SearchBox />
        {showMenu && menuSide === 'left' && (
          <DropMenu pathname={pathname} side={menuSide} onClose={menuCloseHandler} />
        )}
      </div>

      {!matches && (
        <div className="login-section">
          <Switch
            id="switch-theme"
            onChange={changeThemeHandler}
            checked={swTheme}
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
          />
          {themeModeText}
          <RoundButton
            onClick={user ? () => menuOpenHandler('right') : showModal}
            type="button"
            data-testid={user ? `login-btn-${user.uid}` : 'login-btn'}
            url={user ? source : null}
          >
            {!user && <Person data-testid="no-logged-user" />}
          </RoundButton>
          {showMenu && menuSide === 'right' && (
            <DropMenu pathname={pathname} side={menuSide} onClose={menuCloseHandler} />
          )}
        </div>
      )}
    </Container>
  );
};

export default AppBar;
