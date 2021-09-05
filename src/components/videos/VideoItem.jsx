import React, { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { formattedDate, formattedDuration } from '../../lib/aux-functions';
import { Container } from './VideoItem.styles';
import FavButton from './FavButton';

const VideoItem = (props) => {
  const { user, favorites, addToFavorites, removeFromFavorites } =
    useContext(AuthContext);

  const clickHandler = () => {
    props.onSelected(props.videoId);
  };

  const duration = formattedDuration(props.videoDuration);

  let publishedDate;
  if (props.display !== 'favorites') {
    publishedDate = formattedDate(props.videoPublishedAt);
  }

  const favProps = {
    favorites,
    videoId: props.videoId,
    values: props,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <Container display={props.display}>
      {user && props.display === 'favorites' && <FavButton top="42.5px" {...favProps} />}
      <div
        className="click-sensor"
        role="button"
        onClick={clickHandler}
        data-testid={`video-item-${props.display}-${props.videoId}`}
      />
      <div className="videoImage-area">
        {user && props.display !== 'favorites' && <FavButton top="5px" {...favProps} />}
        <img
          src={props.videoImage.medium}
          alt={props.videoTitle}
          data-testid="video-image"
        />
        <div className="videoDuration-area">{duration}</div>
      </div>
      {props.display === 'home' && (
        <div className="channelLogo-area">
          <img src={props.channelLogo} alt="logo-channel" data-testid="video-logo" />
        </div>
      )}
      <div className="card-body">
        <div className="videoTitle-area">{props.videoTitle}</div>
        <div className="channelTitle-area">{props.channelTitle}</div>
        {props.display !== 'favorites' && (
          <div className="videoPublishedAt-area">Published at {publishedDate}</div>
        )}
      </div>
    </Container>
  );
};

export default React.memo(VideoItem);
