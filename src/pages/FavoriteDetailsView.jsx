import { useEffect, useCallback, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useHttp from '../hooks/useHttp';
import { findVideo } from '../lib/youtube-api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Details from '../components/UI/Details';
import VideosList from '../components/videos/VideosList';
import AuthContext from '../context/auth-context';

const Container = styled.main`
  margin: 0 auto;
  max-width: 1700px;
  padding: 10px;
  padding-top: 74px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  @media (max-width: 960px) {
    flex-direction: column;
  }

  .relates-area {
    width: 400px;
    min-width: 400px;
    margin-left: 10px;
    @media (max-width: 960px) {
      width: 100%;
      min-width: 300px;
      margin: 20px 0 0 0;
    }
  }
`;

const FavoriteDetailsView = () => {
  const {
    sendRequest: sendSingleRequest,
    loading,
    data: video,
    error,
  } = useHttp(findVideo);

  const history = useHistory();
  const { videoId } = useParams();
  const { favorites } = useContext(AuthContext);

  useEffect(() => {
    sendSingleRequest(videoId);
  }, [sendSingleRequest, videoId]);

  const videoSelectedHandler = useCallback(
    (id) => {
      history.push(`/favorites/${id}`);
    },
    [history]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    // TODO: Contruir la card para el mensaje de error
    return <h1 data-testid="error-message">{error}</h1>;
  }

  if (!video) {
    return null;
  }

  return (
    <Container>
      <Details {...video} />
      <div className="relates-area">
        <VideosList
          list={favorites}
          onSelected={videoSelectedHandler}
          display="favorites"
        />
      </div>
    </Container>
  );
};

export default FavoriteDetailsView;
