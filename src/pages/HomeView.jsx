import { useContext, useEffect } from 'react';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import VideosList from '../components/videos/VideosList';
import AppContext from '../context/app-context';
import useHttp from '../hooks/useHttp';
import { findVideos } from '../lib/enhanced-api';
import { Container } from './HomeView.styles';

const HomeView = ({ onSelected }) => {
  const { searchValue } = useContext(AppContext);
  const { sendRequest, loading, data: videos, error } = useHttp(findVideos);

  useEffect(() => {
    sendRequest({ q: searchValue, maxResults: 20 });
  }, [sendRequest, searchValue]);

  if (error) {
    // TODO: Contruir la card para el mensaje de error
    return <h1 data-testid="error-message">{error}</h1>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <VideosList list={videos} onSelected={onSelected} display="grid" />
    </Container>
  );
};

export default HomeView;
