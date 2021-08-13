import { useState, useEffect } from 'react';
import VideosList from '../components/videos/VideosList';
import useHttp from '../hooks/useHttp';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Frame from '../components/UI/Frame';
import { findVideos } from '../lib/enhanced-api';
import { formattedDate } from '../lib/funcs';
import { Container } from './DetailsView.styles';

const DetailsView = ({ selectedVideo }) => {
  const [videoDetails, setVideoDetails] = useState(selectedVideo);
  const { sendRequest, loading, data: relatedVideos, error } = useHttp(findVideos);

  const {
    videoId: id,
    videoTitle: title,
    videoDescription: description,
    channelTitle: channel,
    videoPublishedAt: published,
    channelLogo: logo,
  } = videoDetails;

  useEffect(() => {
    sendRequest({ relatedToVideoId: id, maxResults: 15 });
  }, [sendRequest, id]);

  const videoSelectedHandler = (value) => {
    setVideoDetails(value);
  };

  if (error) {
    // TODO: Contruir la card para el mensaje de error
    return <h1 data-testid="error-message">{error}</h1>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  const publishedDate = formattedDate(published);

  return (
    <Container>
      <div className="video-area">
        <div className="video-container">
          <Frame id={id} />
        </div>

        <div className="video-info">
          <div className="title-section">
            <h1 className="video-title" data-testid="title">
              {title}
            </h1>
            <div className="video-publishedAt">&raquo;&ensp;{publishedDate}</div>
          </div>
          <hr />
          <div className="description-section">
            <div className="channel-area">
              <div className="logo">
                <img src={logo} alt="logo-channel" />
              </div>
              <div className="channel-title">{channel}</div>
            </div>
            <div className="description-area">
              <div className="video-description">{description}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relates-area">
        <VideosList
          list={relatedVideos}
          onSelected={videoSelectedHandler}
          display="flex"
        />
      </div>
    </Container>
  );
};

export default DetailsView;
