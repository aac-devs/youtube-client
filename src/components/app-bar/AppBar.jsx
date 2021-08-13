import { useContext } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Switch from '@material-ui/core/Switch';
import PersonIcon from '@material-ui/icons/Person';
import SearchBox from '../search-box/SearchBox';
import YoutubeLogo from '../UI/YoutubeLogo';
import AppContext from '../../context/app-context';
import { Container, RoundButton } from './AppBar.styles';
import { types } from '../../types/types';

const AppBar = () => {
  const matches = useMediaQuery('(max-width:960px)');
  const ctx = useContext(AppContext);

  const gotoHomeClickHandler = () => {
    ctx.changePage(types.page.home);
  };

  const changeThemeHandler = (event) => {
    ctx.changeAppTheme(event.target.checked);
  };

  const themeModeText =
    ctx.appTheme === types.theme.light ? <p>Light mode</p> : <p>Dark mode</p>;
  let swTheme = false;
  if (ctx.appTheme === types.theme.light) {
    swTheme = true;
  }

  return (
    <Container>
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
          <RoundButton type="button" data-testid="login-btn">
            <PersonIcon />
          </RoundButton>
        </div>
      )}
    </Container>
  );
};

export default AppBar;
