import styled from 'styled-components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import PersonIcon from '@material-ui/icons/Person';
import SearchBox from '../search-box/SearchBox';
import { Button } from '../../global-styles';

const Container = styled.nav`
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 64px;
  min-height: 64px;
  background-color: rgba(16, 32, 39, 0.9);
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-areas: 'search login';
  @media (max-width: 960px) {
    grid-template-columns: 100%;
    grid-template-areas: 'search';
  }
  .search-section {
    grid-area: search;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .login-section {
    grid-area: login;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    p {
      color: #fff;
      margin-left: 5px;
    }
  }
`;

const RoundButton = styled(Button)`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background-color: transparent;
  color: #fff;
  margin: 0 20px;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: rgba(16, 32, 39, 1);
  }
`;

const AppBar = () => {
  const matches = useMediaQuery('(max-width:960px)');

  return (
    <Container>
      <div className="search-section">
        <RoundButton type="button" data-testid="menu-btn">
          <MenuIcon />
        </RoundButton>
        <SearchBox />
      </div>
      {!matches && (
        <div className="login-section">
          <Switch
            defaultChecked
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
          />
          <p>Dark mode</p>
          <RoundButton type="button" data-testid="login-btn">
            <PersonIcon />
          </RoundButton>
        </div>
      )}
    </Container>
  );
};

export default AppBar;
