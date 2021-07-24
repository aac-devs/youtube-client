import styled from 'styled-components';
import VideosList from '../components/videos/VideosList';
import mockData from '../helper/mock-data.json';

const Container = styled.div`
  padding: 15px 10px;
`;

const HomeView = () => {
  const videos = mockData.items;
  videos.shift();
  return (
    <Container>
      <VideosList list={videos} />
    </Container>
  );
};

export default HomeView;
