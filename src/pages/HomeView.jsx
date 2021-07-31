import { useEffect, useState } from 'react';
import styled from 'styled-components';
import VideosList from '../components/videos/VideosList';
import { findVideos } from '../lib/api';

const Container = styled.div`
  padding: 15px 10px;
`;

const HomeView = (props) => {
  const [videos, setVideos] = useState([]);
  console.log('renders <HomeView />');

  const { searchValue } = props;

  useEffect(() => {
    setVideos([]);
    findVideos(searchValue).then((res) => setVideos(res));
  }, [searchValue]);

  return (
    <Container>
      <VideosList list={videos} onSelected={props.onSelected} />
    </Container>
  );
};

export default HomeView;
