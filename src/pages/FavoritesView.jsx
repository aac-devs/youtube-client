import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import VideosList from '../components/videos/VideosList';
import { useAuthContext } from '../context/auth-context';
import { FavoritesViewContainer } from './FavoritesView.styles';

const FavoritesView = () => {
  const { favorites } = useAuthContext();
  const history = useHistory();

  const favoriteSelectedHandler = useCallback(
    (videoId) => {
      history.push(`/favorites/${videoId}`);
    },
    [history]
  );

  return (
    <FavoritesViewContainer>
      {favorites.length === 0 && <div className="no-favorites">No favorites found</div>}
      <VideosList
        list={favorites}
        onSelected={favoriteSelectedHandler}
        display="favorites"
      />
    </FavoritesViewContainer>
  );
};

export default FavoritesView;
