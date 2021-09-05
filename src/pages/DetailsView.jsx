import { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Details from '../components/Details';
import VideosList from '../components/videos/VideosList';
import useHttp from '../hooks/useHttp';
import { findVideos, findVideo } from '../lib/youtube-api';
import { DetailsViewContainer } from './DetailsView.styles';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import { useAuthContext } from '../context/auth-context';
import ErrorCard from '../components/ErrorCard';

const DetailsView = () => {
  const { user, favorites, addToFavorites, removeFromFavorites } = useAuthContext();

  const {
    sendRequest: sendSingleRequest,
    data: video,
    error: singleError,
    onResetError: onResetSingleError,
  } = useHttp(findVideo);

  const {
    sendRequest: sendRelatedRequest,
    loading,
    data: videos,
    error: relatedError,
    onResetError: onResetRelatedError,
  } = useHttp(findVideos);

  const history = useHistory();
  const { videoId } = useParams();

  useEffect(() => {
    sendSingleRequest(videoId);
  }, [sendSingleRequest, videoId]);

  useEffect(() => {
    sendRelatedRequest({ relatedToVideoId: videoId, maxResults: 20 });
  }, [sendRelatedRequest, videoId]);

  const videoSelectedHandler = useCallback(
    (id) => {
      history.push(`/videos/${id}`);
    },
    [history]
  );

  const errorHandler = () => {
    onResetSingleError();
    onResetRelatedError();
  };

  if (singleError || relatedError) {
    const error = singleError || relatedError;
    return <ErrorCard data-testid="error-message" onClose={errorHandler} {...error} />;
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
        <VideosList list={videos} onSelected={videoSelectedHandler} display="related" />
      </div>
    </DetailsViewContainer>
  );
};

export default DetailsView;
