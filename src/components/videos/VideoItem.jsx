import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import { useAuthContext } from '../../context/auth-context';
import { formattedDate, formattedDuration } from '../../lib/aux-functions';
import FavButton from './FavButton';
import { StyledVideoItem } from './VideoItem.styles';

const VideoItem = React.forwardRef((props, ref) => {
  const { user, favorites, addToFavorites, removeFromFavorites } = useAuthContext();

  const clickHandler = () => {
    props.onSelected(props.videoId);
  };

  const duration = formattedDuration(props.videoDuration);

  let publishedDate;
  if (props.display !== 'favorites') {
    publishedDate = formattedDate(props.videoPublishedAt);
  }

  const favVideo = favorites.find((item) => item.videoId === props.videoId);

  const favProps = {
    favorites,
    videoId: props.videoId,
    values: props,
    addToFavorites,
    removeFromFavorites,
    favVideo,
  };

  const starStyles = {
    top: props.display === 'home' ? '5px' : '-2px',
    left: props.display === 'home' ? '-3px' : '-2px',
    color: 'orange',
    position: 'absolute',
  };

  return (
    <StyledVideoItem ref={ref} display={props.display}>
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
        <div className="videoTitle-area">
          {user && props.display !== 'favorites' && favVideo && (
            <>
              <StarIcon style={starStyles} />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </>
          )}
          {props.videoTitle}
        </div>
        <div className="channelTitle-area">{props.channelTitle}</div>
        {props.display !== 'favorites' && (
          <div className="videoPublishedAt-area">Published at {publishedDate}</div>
        )}
      </div>
    </StyledVideoItem>
  );
});

export default React.memo(VideoItem);
