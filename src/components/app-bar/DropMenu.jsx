import { useState, useEffect } from 'react';
import {
  WbSunnyOutlined,
  Brightness2,
  HomeOutlined,
  FavoriteBorder,
} from '@material-ui/icons';

import { useAppContext } from '../../context/app-context';
import { useAuthContext } from '../../context/auth-context';
import loggedIcon from '../../assets/logged.png';

import { RoundButton } from './AppBar.styles';
import { types } from '../../types/types';
import { BackDrop } from '../../global-styles';
import { MenuCard, MenuItem } from './DropMenu.styles';

const DropMenu = ({ pathname, side, onClose }) => {
  const { user } = useAuthContext();
  const { appTheme } = useAppContext();
  const [position, setPosition] = useState(side === 'left' ? '-300px' : '-200px');
  const [backDrop, setBackDrop] = useState(true);

  useEffect(() => {
    if (side === 'left') {
      setPosition('10px');
    } else {
      setPosition('10px');
    }
  }, [side]);

  const closeHandler = (option) => {
    if (side === 'left') {
      setPosition('-400px');
    } else {
      setPosition('-200px');
    }
    setBackDrop(false);
    onClose(option);
  };

  const source = user?.photoURL || loggedIcon;

  if (side) {
    return (
      <>
        {backDrop && <BackDrop role="button" onClick={() => closeHandler({})} />}
        <MenuCard
          left={side === 'left' ? position : undefined}
          right={side === 'right' ? position : undefined}
          width={side === 'left' ? '300px' : '200px'}
        >
          {side === 'left' && (
            <>
              {user && (
                <RoundButton
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: '0px',
                    marginBottom: '10px',
                  }}
                  type="button"
                  url={user ? source : null}
                >
                  {!user}
                </RoundButton>
              )}
              <MenuItem
                role="button"
                onClick={() =>
                  closeHandler({
                    theme: types.theme[appTheme === types.theme.light ? 'dark' : 'light'],
                  })
                }
              >
                {appTheme === types.theme.light ? <Brightness2 /> : <WbSunnyOutlined />}
                &nbsp;Change to {appTheme === types.theme.light ? 'dark' : 'light'} mode
              </MenuItem>
            </>
          )}
          {pathname !== '/videos' && (
            <MenuItem role="button" onClick={() => closeHandler({ page: '/videos' })}>
              <HomeOutlined />
              &nbsp;Home
            </MenuItem>
          )}
          {user && pathname !== '/favorites' && (
            <MenuItem role="button" onClick={() => closeHandler({ page: '/favorites' })}>
              <FavoriteBorder />
              &nbsp;Favorites
            </MenuItem>
          )}

          <MenuItem
            role="button"
            onClick={() => closeHandler({ user: user ? 'Sign Out' : 'Sign In' })}
          >
            Sign {user ? 'Out' : 'In'}
          </MenuItem>
        </MenuCard>
      </>
    );
  }
};

export default DropMenu;
