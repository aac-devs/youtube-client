import { useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import VideosList from '../components/videos/VideosList';
import AuthContext from '../context/auth-context';

const Container = styled.main`
  padding: 10px;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  padding-top: 74px;
`;

const FavoritesView = () => {
  const { favorites } = useContext(AuthContext);
  const history = useHistory();

  // console.log('<FavoritesView />');

  const favoriteSelectedHandler = useCallback(
    (videoId) => {
      history.push(`/favorites/${videoId}`);
    },
    [history]
  );

  return (
    <Container>
      <VideosList
        list={favorites}
        onSelected={favoriteSelectedHandler}
        display="favorites"
      />
    </Container>
  );
};

export default FavoritesView;
