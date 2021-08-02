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

const HomeView = (props) => {
  const { list: videos, loading } = useHttp(fetchVideos, props.searchValue);

  return (
    <Container>
      {!loading && (
        <VideosList list={videos} onSelected={props.onSelected} display="grid" />
      )}
      {loading && <LoadingSpinner />}
    </Container>
  );
};

export default HomeView;
