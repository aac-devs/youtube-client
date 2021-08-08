import styled from 'styled-components';
import VideoItem from './VideoItem';

const Container = styled.ul`
  min-width: 300px;
  display: ${({ display }) => display};
  grid-template-columns: ${({ display }) =>
    display === 'grid' ? 'repeat(auto-fit, 300px)' : null};
  grid-column-gap: ${({ display }) => (display === 'grid' ? '15px' : null)};
  grid-row-gap: ${({ display }) => (display === 'grid' ? '30px' : null)};
  flex-direction: ${({ display }) => (display === 'grid' ? null : 'column')};
  justify-content: ${({ display }) => (display === 'grid' ? 'center' : 'flex-start')};
`;

const VideosList = (props) => {
  const { list, display, onSelected } = props;

  const listItems = list?.map((item, index) => {
    const {
      id: { videoId },
      snippet,
    } = item;
    return (
      snippet && (
        <VideoItem
          key={videoId}
          id={videoId}
          image={
            display === 'grid'
              ? snippet?.thumbnails.medium.url
              : snippet?.thumbnails.default.url
          }
          title={snippet?.title}
          description={snippet?.description}
          onSelected={onSelected}
          display={display}
          channel={snippet?.channelTitle}
          index={index}
        />
      )
    );
  });

  return (
    <Container display={display} data-testid="list-videos">
      {listItems}
    </Container>
  );
};

export default VideosList;
