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
    return (
      <VideoItem
        key={item.videoId}
        id={item.videoId}
        image={display === 'grid' ? item.videoImage.medium : item.videoImage.default}
        title={item.videoTitle}
        description={item.videoDescription}
        onSelected={onSelected}
        display={display}
        channel={item.channelTitle}
        index={index}
      />
    );
  });

  return (
    <Container display={display} data-testid="list-videos">
      {listItems}
    </Container>
  );
};

export default VideosList;
