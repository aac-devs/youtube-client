import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import VideosList from '../components/videos/VideosList';
import { Button } from '../global-styles';
// import { fetchRelatedVideos } from '../lib/api';
import useHttp from '../hooks/useHttp';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Frame from '../components/UI/Frame';
import AppContext from '../context/app-context';
import { findRelatedVideos } from '../lib/enhanced-api';

const Container = styled.main`
  margin: 0 auto;
  max-width: 1700px;
  padding: 10px;
  padding-top: 74px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  @media (max-width: 960px) {
    flex-direction: column;
  }

  .video-area {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    button {
    }
  }

  .relates-area {
    width: 400px;
    min-width: 400px;
    margin-left: 10px;
    @media (max-width: 960px) {
      width: 100%;
      min-width: 300px;
      margin: 20px 0 0 0;
    }
  }

  .title {
    width: 100%;
    color: #fff;
    margin-bottom: 10px;
    max-height: 140px;
    overflow: hidden;
    h2 {
      overflow: hidden;
      margin: 15px 0 5px 0;
    }
    p {
      font-size: 14px;
    }
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

  .video-container {
    min-width: 300px;
    width: 100%;
    padding-top: 56.25%;
    position: relative;
  }
`;

const BackButton = styled(Button)`
  align-self: flex-end;
  margin-right: 10px;
  background-color: transparent;
  border: 1px solid deepskyblue;
  color: deepskyblue;
  font-size: 24px;
  padding: 5px 10px;
  border-radius: 10px;
  transition-property: background-color, color;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: deepskyblue;
    color: #fff;
  }
`;

const DetailsView = ({ selectedVideo }) => {
  const [videoDetails, setVideoDetails] = useState(selectedVideo);
  const { id, title, description, channel } = videoDetails;
  const { sendRequest, loading, data: relatedVideos, error } = useHttp(findRelatedVideos);

  const ctx = useContext(AppContext);

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  const videoSelectedHandler = (value) => setVideoDetails(value);

  if (error) {
    // TODO: Contruir el mensaje de error
    return <h1 data-testid="error-message">{error}</h1>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <div className="video-area">
        <div className="video-container">
          <Frame id={id} />
        </div>
        <div className="title">
          <h2 data-testid="title">{title}</h2>
          <h4>{channel}</h4>
          <p>{description}</p>
        </div>
        <BackButton type="button" onClick={() => ctx.changePage('home')}>
          back to home
        </BackButton>
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
