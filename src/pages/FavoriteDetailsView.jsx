import { useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useHttp from '../hooks/useHttp';
import { findVideo } from '../lib/youtube-api';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import Details from '../components/Details';
import VideosList from '../components/videos/VideosList';
import { useAuthContext } from '../context/auth-context';
import ErrorCard from '../components/ErrorCard';
import { DetailsViewContainer } from './DetailsView.styles';

const FavoriteDetailsView = () => {
  const {
    sendRequest: sendSingleRequest,
    loading,
    data: video,
    error,
    onResetError,
  } = useHttp(findVideo);

  const history = useHistory();
  const { videoId } = useParams();
  const { user, favorites, addToFavorites, removeFromFavorites } = useAuthContext();

  useEffect(() => {
    sendSingleRequest(videoId);
  }, [sendSingleRequest, videoId]);

  const videoSelectedHandler = useCallback(
    (id) => {
      history.push(`/favorites/${id}`);
    },
    [history]
  );

  if (error) {
    return (
      <ErrorCard data-testid="error-message" onClose={() => onResetError()} {...error} />
    );
  }

  if (!video) {
    return null;
  }

  return (
    <DetailsViewContainer>
      {loading && <LoadingSpinner />}
      <Details
        {...video}
        userLogged={user}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        favorites={favorites}
      />
      <div className="relates-area">
        <VideosList
          list={favorites}
          onSelected={videoSelectedHandler}
          display="favorites"
        />
      </div>
    </DetailsViewContainer>
  );
};

export default FavoriteDetailsView;
