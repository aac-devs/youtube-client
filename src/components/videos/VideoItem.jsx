import React, { useContext } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AppContext from '../../context/app-context';
import AuthContext from '../../context/auth-context';
import { formattedDate, formattedDuration } from '../../lib/funcs';
import { Container } from './VideoItem.styles';

const VideoItem = (props) => {
  const { user } = useContext(AuthContext);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(AppContext);

  const clickHandler = () => {
    props.onSelected(props.videoId);
  };

  const duration = formattedDuration(props.videoDuration);
  const publishedDate = formattedDate(props.videoPublishedAt);

  let favButton;
  if (user) {
    if (favorites.length > 0) {
      const addedVideo = favorites.find((item) => item.videoId === props.videoId);
      if (!addedVideo) {
        favButton = (
          <div
            className="favorite-button"
            role="button"
            onClick={() => addToFavorites(props)}
          >
            <FavoriteBorderIcon />
          </div>
        );
      } else {
        favButton = (
          <div
            className="favorite-button"
            role="button"
            onClick={() => removeFromFavorites(props.videoId)}
          >
            <RemoveCircleOutlineIcon color="secondary" />
          </div>
        );
      }
    } else {
      favButton = (
        <div
          className="favorite-button"
          role="button"
          onClick={() => addToFavorites(props)}
        >
          <FavoriteBorderIcon />
        </div>
      );
    }
  }

  return (
    <Container display={props.display} data-testid={`video-item-${props.videoId}`}>
      <div className="click-sensor" role="button" onClick={clickHandler} />
      <div className="videoImage-area">
        {user && favButton}
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
        <div className="videoPublishedAt-area">Published at {publishedDate}</div>
      </div>
    </Container>
  );
};

export default React.memo(VideoItem);
