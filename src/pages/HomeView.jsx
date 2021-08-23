import { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import VideosList from '../components/videos/VideosList';
import AppContext from '../context/app-context';
import { findVideos } from '../lib/youtube-api';
import { Container } from './HomeView.styles';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import useHttp from '../hooks/useHttp';

const HomeView = () => {
  const { sendRequest, loading, data: videos, error } = useHttp(findVideos);

  const history = useHistory();
  const { searchValue } = useContext(AppContext);

  // console.log('<HomeView />');

  useEffect(() => {
    sendRequest({ q: searchValue, maxResults: 20 });
  }, [sendRequest, searchValue]);

  const videoSelectedHandler = useCallback(
    (videoId) => {
      history.push(`/videos/${videoId}`);
    },
    [history]
  );

  if (error) {
    // TODO: Contruir la card para el mensaje de error
    return <h1 data-testid="error-message">{error}</h1>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <VideosList list={videos} onSelected={videoSelectedHandler} display="home" />
    </Container>
  );
};

export default HomeView;
