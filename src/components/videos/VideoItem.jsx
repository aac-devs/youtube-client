import { formattedDate, formattedDuration } from '../../lib/funcs';
import { Container } from './VideoItem.styles';

const VideoItem = (props) => {
  const clickHandler = () => {
    props.onSelected(props);
  };

  const duration = formattedDuration(props.videoDuration);
  const publishedDate = formattedDate(props.videoPublishedAt);

  return (
    <Container
      onClick={clickHandler}
      display={props.display}
      data-testid={`video-item-${props.videoId}`}
    >
      <div className="videoImage-area">
        <img
          src={props.videoImage.medium}
          alt={props.videoTitle}
          data-testid="video-image"
        />
        <div className="videoDuration-area">{duration}</div>
      </div>
      {props.display === 'grid' && (
        <div className="channelLogo-area">
          <img src={props.channelLogo} alt="logo-channel" data-testid="video-logo" />
        </div>
      )}
      <div className="card-body">
        <div className="videoTitle-area">{props.videoTitle}</div>
        <div className="channelTitle-area">{props.channelTitle}</div>
        <div className="videoPublishedAt-area">Published at {publishedDate}</div>
      </div>
    </Container>
  );
};

export default VideoItem;
