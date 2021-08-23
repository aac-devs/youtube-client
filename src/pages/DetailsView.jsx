import { useCallback, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Details from '../components/Details';
import VideosList from '../components/videos/VideosList';
import useHttp from '../hooks/useHttp';
import { findVideos, findVideo } from '../lib/youtube-api';
import { Container } from './DetailsView.styles';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import AuthContext from '../context/auth-context';

const DetailsView = () => {
  const { user, favorites, addToFavorites, removeFromFavorites } =
    useContext(AuthContext);
  const {
    sendRequest: sendSingleRequest,
    data: video,
    error: singleError,
  } = useHttp(findVideo);

  const {
    sendRequest: sendRelatedRequest,
    loading,
    data: videos,
    error: relatedError,
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (singleError || relatedError) {
    // TODO: Contruir la card para el mensaje de error
    return <h1 data-testid="error-message">{singleError || relatedError}</h1>;
  }

  if (!video) {
    return null;
  }

  // console.log('video final');
  // console.log(video);

  return (
    <Container>
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
    </Container>
  );
};

export default DetailsView;
