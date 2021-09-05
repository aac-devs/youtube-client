import { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import VideosList from '../components/videos/VideosList';
import AppContext from '../context/app-context';
import { findVideos } from '../lib/youtube-api';
import { Container } from './HomeView.styles';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import useHttp from '../hooks/useHttp';
import ErrorCard from '../components/ErrorCard';

const HomeView = () => {
  const { sendRequest, loading, data: videos, error, onResetError } = useHttp(findVideos);

  const history = useHistory();
  const { searchValue } = useContext(AppContext);

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
    return (
      <ErrorCard data-testid="error-message" onClose={() => onResetError()} {...error} />
    );
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
