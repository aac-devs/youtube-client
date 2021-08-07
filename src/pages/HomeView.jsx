import styled from 'styled-components';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import VideosList from '../components/videos/VideosList';
import useHttp from '../hooks/useHttp';
import { fetchVideos } from '../lib/api';

const Container = styled.main`
  padding: 10px;
  margin: 0 auto;
  max-width: 1700px;
  width: 100%;
  padding-top: 74px;
`;

const HomeView = ({ searchValue, onSelected }) => {
  const { list: videos, loading, error } = useHttp(fetchVideos, searchValue);

  // TODO: Contruir el mensaje de error
  return (
    <Container>
      {!loading && !error && (
        <VideosList list={videos} onSelected={onSelected} display="grid" />
      )}
      {loading && <LoadingSpinner />}
      {error && <h1 data-testid="error-message">{error}</h1>}
    </Container>
  );
};

export default HomeView;
