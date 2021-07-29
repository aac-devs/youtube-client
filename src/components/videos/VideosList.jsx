import styled from 'styled-components';
import VideoItem from './VideoItem';

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 15px;
  justify-content: center;
`;

const VideosList = (props) => {
  return (
    <Container>
      {props.list &&
        props.list.map((item) => (
          <VideoItem
            key={item.id.videoId}
            image={item.snippet.thumbnails.medium.url}
            title={item.snippet.title}
            description={item.snippet.description}
          />
        ))}
    </Container>
  );
};

export default VideosList;
