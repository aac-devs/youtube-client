import VideoItem from './VideoItem';
import { Container } from './VideosList.styles';

const VideosList = (props) => {
  const { list, display, onSelected } = props;

  const listItems = list?.map((item) => {
    return (
      <VideoItem key={item.videoId} {...item} onSelected={onSelected} display={display} />
    );
  });

  return (
    <Container display={display} data-testid="list-videos">
      {listItems}
    </Container>
  );
};

export default VideosList;
