import Frame from './Frame';
import { Container } from './Details.styles';
import { formattedDate } from '../../lib/funcs';

const Details = (props) => {
  const publishedDate = formattedDate(props.videoPublishedAt);
  console.log('<Details />');

  return (
    <Container>
      <div className="video-container">
        <Frame id={props.videoId} />
      </div>

      <div className="video-info">
        <div className="title-section">
          <h1 className="video-title" data-testid="title">
            {props.videoTitle}
          </h1>
          <div className="video-publishedAt">&raquo;&ensp;{publishedDate}</div>
        </div>
        <hr />
        <div className="description-section">
          <div className="channel-area">
            <div className="logo">
              <img src={props.channelLogo} alt="logo-channel" />
            </div>
            <div className="channel-title">{props.channelTitle}</div>
          </div>
          <div className="description-area">
            <div className="video-description">{props.videoDescription}</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Details;
