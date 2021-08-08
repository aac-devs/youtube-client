import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import VideosList from '../components/videos/VideosList';
import SearchContext from '../context/search-context';
import useHttp from '../hooks/useHttp';
import { fetchVideos } from '../lib/api';

const Container = styled.main`
  padding: 10px;
  margin: 0 auto;
  max-width: 1700px;
  width: 100%;
  padding-top: 74px;
`;

const HomeView = ({ onSelected }) => {
  const { searchValue } = useContext(SearchContext);
  const { sendRequest, loading, data: videos, error } = useHttp(fetchVideos);

  useEffect(() => {
    sendRequest(searchValue);
  }, [sendRequest, searchValue]);

  if (error) {
    // TODO: Contruir el mensaje de error
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
