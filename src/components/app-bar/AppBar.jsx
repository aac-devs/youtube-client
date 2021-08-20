import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Switch from '@material-ui/core/Switch';
import PersonIcon from '@material-ui/icons/Person';
import SearchBox from '../search-box/SearchBox';
import YoutubeLogo from '../UI/YoutubeLogo';
import AppContext from '../../context/app-context';
import AuthContext from '../../context/auth-context';
import { Container, RoundButton } from './AppBar.styles';
import { types } from '../../types/types';
import loggedIcon from '../../assets/logged.png';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import Modal from '../UI/modal/Modal';
import {
  sighUpWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
} from '../../lib/firebase-api';

const AppBar = () => {
  const history = useHistory();
  const matches = useMediaQuery('(max-width:960px)');
  const ctx = useContext(AppContext);
  const authContext = useContext(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);

  console.log(authContext);

  const gotoHomeClickHandler = () => {
    history.push('/videos');
  };

  const changeThemeHandler = (event) => {
    ctx.changeAppTheme(event.target.checked);
  };

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

  const userSignUpHandler = async (signUpUser) => {
    const { ok, user, error } = await sighUpWithEmailAndPassword(signUpUser);
    if (ok) {
      authContext.login(user);
    } else {
      console.log(error);
    }
    hideModal();
  };

  const userSignInHandler = async (signInUser) => {
    const { ok, user, error } = await signInWithEmailAndPassword(signInUser);
    if (ok) {
      authContext.login(user);
    } else {
      console.log(error);
    }
    hideModal();
  };

  const googleSignInHandler = async () => {
    const { ok, user, error } = await signInWithGoogle();
    if (ok) {
      authContext.login(user);
    } else {
      console.log(error);
    }
    hideModal();
  };

  const userSignOutHandler = async () => {
    const { ok, error } = await signOut();
    if (ok) {
      authContext.logout();
    } else {
      console.log(error);
    }
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
        <YoutubeLogo withText={!matches} onClick={gotoHomeClickHandler} />
        <SearchBox />
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
            onClick={showModal}
            type="button"
            data-testid="login-btn"
            url={authContext.user ? source : null}
          >
            {!authContext.user && <PersonIcon />}
          </RoundButton>
          <button type="button" onClick={userSignOutHandler}>
            Logout
          </button>
        </div>
      )}
    </Container>
  );
};

export default AppBar;
