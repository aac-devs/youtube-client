import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery, Switch } from '@material-ui/core';
import {
  HomeOutlined,
  FavoriteBorder,
  WbSunnyOutlined,
  Brightness2,
  Person,
} from '@material-ui/icons';
import SearchBox from './SearchBox';
import YoutubeLogo from '../YoutubeLogo';
import AppContext from '../../context/app-context';
import AuthContext from '../../context/auth-context';
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

const AppBar = () => {
  const history = useHistory();
  const matches = useMediaQuery('(max-width:960px)');
  const ctx = useContext(AppContext);
  const authContext = useContext(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const [showRightMenu, setShowRightMenu] = useState(false);
  const [showLeftMenu, setShowLeftMenu] = useState(false);

  const { pathname } = history.location;

  // Menus:
  const goToPageHandler = (page) => {
    history.push(page);
    setShowRightMenu(false);
    setShowLeftMenu(false);
  };

  const showRightMenuHandler = () => {
    setShowRightMenu(true);
  };

  const showLeftMenuHandler = () => {
    setShowLeftMenu(true);
  };

  // Login Modal:
  const showModal = () => {
    setShowLeftMenu(false);
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
  const authLoginHandler = ({ ok, user, error }) => {
    if (ok && user) {
      authContext.login(user);
    } else if (ok && !user) {
      authContext.logout();
    } else {
      authContext.setError('Authentication error', error);
    }
    hideModal();
  };

  const userSignUpHandler = async (signUpUser) => {
    authContext.resetError();
    authLoginHandler(await sighUpWithEmailAndPassword(signUpUser));
  };

  const userSignInHandler = async (signInUser) => {
    authContext.resetError();
    authLoginHandler(await signInWithEmailAndPassword(signInUser));
  };

  const googleSignInHandler = async () => {
    authContext.resetError();
    authLoginHandler(await signInWithGoogle());
  };

  const userSignOutHandler = async () => {
    authLoginHandler(await signOut());
    setShowRightMenu(false);
    setShowLeftMenu(false);
  };

  const closeErrorHandler = () => {
    authContext.resetError();
  };

  // Theme:
  const changeThemeHandler = (event) => {
    ctx.changeAppTheme(event.target.checked);
  };

  const changeThemeFromLeftMenuHandler = (value) => {
    ctx.changeAppTheme(value);
    setShowLeftMenu(false);
  };

  const themeModeText =
    ctx.appTheme === types.theme.light ? <p>Light mode</p> : <p>Dark mode</p>;
  let swTheme = false;
  if (ctx.appTheme === types.theme.light) {
    swTheme = true;
  }

  const source = authContext.user?.photoURL || loggedIcon;

  return (
    <Container>
      {authContext.error && (
        <ErrorCard onClose={closeErrorHandler} {...authContext.error} />
      )}
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
          onClick={matches ? showLeftMenuHandler : () => goToPageHandler('/videos')}
        />
        <SearchBox />
        {showLeftMenu && (
          <div
            role="button"
            data-testid="backdrop-left-menu"
            className="backdrop-left-menu"
            onClick={() => setShowLeftMenu(false)}
          />
        )}
        <div
          className={`left-menu-items ${
            showLeftMenu ? 'show-left-menu' : 'hide-left-menu'
          }`}
        >
          {authContext.user && (
            <RoundButton
              style={{ alignSelf: 'flex-end', marginRight: '0px', marginBottom: '10px' }}
              type="button"
              url={authContext.user ? source : null}
            >
              {!authContext.user}
            </RoundButton>
          )}
          {pathname !== '/videos' && (
            <div role="button" type="button" onClick={() => goToPageHandler('/videos')}>
              <HomeOutlined />
              &nbsp;Home
            </div>
          )}
          {authContext.user && pathname !== '/favorites' && (
            <div
              role="button"
              type="button"
              onClick={() => goToPageHandler('/favorites')}
            >
              <FavoriteBorder />
              &nbsp;Favorites
            </div>
          )}
          {ctx.appTheme === types.theme.light && (
            <div role="button" onClick={() => changeThemeFromLeftMenuHandler(false)}>
              <Brightness2 />
              &nbsp;Change to dark mode
            </div>
          )}
          {ctx.appTheme === types.theme.dark && (
            <div role="button" onClick={() => changeThemeFromLeftMenuHandler(true)}>
              <WbSunnyOutlined />
              &nbsp;Change to light mode
            </div>
          )}
          {!authContext.user && (
            <div onClick={showModal} role="button">
              Sign In
            </div>
          )}
          {authContext.user && (
            <div role="button" onClick={userSignOutHandler}>
              Sign Out
            </div>
          )}
        </div>
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
            onClick={authContext.user ? showRightMenuHandler : showModal}
            type="button"
            data-testid={
              authContext.user ? `login-btn-${authContext.user.uid}` : 'login-btn'
            }
            url={authContext.user ? source : null}
          >
            {!authContext.user && <Person data-testid="no-logged-user" />}
          </RoundButton>
          {showRightMenu && (
            <div
              role="button"
              className="backdrop-right-menu"
              onClick={() => setShowRightMenu(false)}
            />
          )}
          <div
            className={`right-menu-items ${
              showRightMenu ? 'show-right-menu' : 'hide-right-menu'
            }`}
          >
            {pathname !== '/videos' && (
              <div role="button" type="button" onClick={() => goToPageHandler('/videos')}>
                <HomeOutlined />
                &nbsp;Home
              </div>
            )}
            {pathname !== '/favorites' && (
              <div
                role="button"
                type="button"
                data-testid='menu-fav-right-btn'
                onClick={() => goToPageHandler('/favorites')}
              >
                <FavoriteBorder />
                &nbsp;Favorites
              </div>
            )}
            <div role="button" type="button" onClick={userSignOutHandler}>
              Sign Out
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AppBar;
