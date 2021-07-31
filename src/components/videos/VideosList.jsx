import styled from 'styled-components';
import VideoItem from './VideoItem';

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-column-gap: 15px;
  grid-row-gap: 30px;
  justify-content: center;
`;

const VideosList = (props) => {
  console.log('renders <VideoList />');

  return (
    <Container>
      {props.list &&
        props.list.map((item) => (
          <VideoItem
            key={item.id.videoId}
            id={item.id.videoId}
            image={item.snippet.thumbnails.medium.url}
            title={item.snippet.title}
            description={item.snippet.description}
            onSelected={props.onSelected}
          />
        ))}
    </Container>
  );
};

export default VideosList;
