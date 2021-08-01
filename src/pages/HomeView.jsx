import { useEffect, useState } from 'react';
import styled from 'styled-components';
import VideosList from '../components/videos/VideosList';
import { fetchVideos } from '../lib/api';

const Container = styled.div`
  padding: 10px;
`;

const HomeView = (props) => {
  const [videos, setVideos] = useState([]);
  const { searchValue } = props;

  useEffect(() => {
    setVideos([]);
    fetchVideos(searchValue).then((res) => setVideos(res));
  }, [searchValue]);

  return (
    <Container>
      <VideosList list={videos} onSelected={props.onSelected} display="grid" />
    </Container>
  );
};

export default HomeView;
