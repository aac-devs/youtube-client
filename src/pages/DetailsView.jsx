import { useState, useEffect } from 'react';
import styled from 'styled-components';
import VideosList from '../components/videos/VideosList';
import { Button } from '../global-styles';
import { fetchRelatedVideos } from '../lib/api';

const Container = styled.div`
  padding: 10px;
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

const DetailsView = (props) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [videoDetails, setVideoDetails] = useState({
    id: props.dataVideoSelected.id,
    title: props.dataVideoSelected.title,
    description: props.dataVideoSelected.description,
  });

  const { id, title, description } = videoDetails;

  useEffect(() => {
    fetchRelatedVideos(id).then((res) => setRelatedVideos(res));
  }, [id]);

  const videoSelectedHandler = (value) => {
    setVideoDetails(value);
  };

  return (
    <Container>
      <div className="video-area">
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="title">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <BackButton type="button" onClick={props.onBackToHome}>
          back to home
        </BackButton>
      </div>
      <div className="relates-area">
        {relatedVideos && (
          <VideosList
            list={relatedVideos}
            onSelected={videoSelectedHandler}
            display="flex"
          />
        )}
      </div>
    </Container>
  );
};

export default DetailsView;
