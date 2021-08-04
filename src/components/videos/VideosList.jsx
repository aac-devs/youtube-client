import styled from 'styled-components';
import VideoItem from './VideoItem';

const Container = styled.ul`
  min-width: 300px;
  display: ${(props) => props.display};
  grid-template-columns: ${(props) =>
    props.display === 'grid' ? 'repeat(auto-fit, 300px)' : null};
  grid-column-gap: ${(props) => (props.display === 'grid' ? '15px' : null)};
  grid-row-gap: ${(props) => (props.display === 'grid' ? '30px' : null)};
  flex-direction: ${(props) => (props.display === 'grid' ? null : 'column')};
  justify-content: ${(props) => (props.display === 'grid' ? 'center' : 'flex-start')};
`;

const VideosList = (props) => {
  return (
    <Container display={props.display}>
      {props.list &&
        props.list.map(
          (item) =>
            item.snippet && (
              <VideoItem
                key={item.id.videoId}
                id={item.id.videoId}
                image={
                  props.display === 'grid'
                    ? item.snippet?.thumbnails.medium.url
                    : item.snippet?.thumbnails.default.url
                }
                title={item.snippet?.title}
                description={item.snippet?.description}
                onSelected={props.onSelected}
                display={props.display}
              />
            )
        )}
    </Container>
  );
};

export default VideosList;
