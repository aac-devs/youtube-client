import { useState, useEffect } from 'react';
import styled from 'styled-components';
import VideosList from '../components/videos/VideosList';

const API_KEY = '--';
const BASE_URL = '--';

const Container = styled.div`
  padding: 15px 10px;
`;

const HomeView = (props) => {
  const [videos, setVideos] = useState([]);

  const { searchValue } = props;

  const getData = async (value) => {
    const url = `${BASE_URL}/search?part=snippet&key=${API_KEY}&maxResults=40&q=${value}&type=video&safeSearch=strict`;
    const response = await fetch(url);
    const data = await response.json();
    setVideos(data.items);
  };

  useEffect(() => {
    getData('react');
  }, []);

  useEffect(() => {
    setVideos([]);
  }, [searchValue]);

  useEffect(() => {
    console.log('Search Value en HomeView');
    console.log(searchValue);
    getData(searchValue);
  }, [searchValue]);

  return (
    <Container>
      <VideosList list={videos} />
    </Container>
  );
};

export default HomeView;
