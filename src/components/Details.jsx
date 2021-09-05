import { useMediaQuery } from '@material-ui/core';
import { FavoriteBorder, RemoveCircleOutline } from '@material-ui/icons';
import Frame from './Frame';
import { Container } from './Details.styles';
import { formattedDate } from '../lib/aux-functions';
import { StyledFavButton } from './videos/FavButton';

const Details = (props) => {
  const {
    videoId,
    videoDuration,
    videoDescription,
    videoImage,
    videoTitle,
    videoPublishedAt,
    addToFavorites,
    removeFromFavorites,
    userLogged,
    channelTitle,
    channelLogo,
    favorites,
  } = props;

  const break768 = useMediaQuery('(min-width:768px)');
  const break1024 = useMediaQuery('(min-width:1024px)');
  const break1324 = useMediaQuery('(min-width:1324px)');

  const publishedDate = formattedDate(videoPublishedAt);

  let favData;
  let isFav;
  if (userLogged) {
    favData = {
      channelTitle,
      videoDuration,
      videoId,
      videoTitle,
      videoImage,
    };
    isFav = favorites.find((fav) => fav.videoId === videoId);
  }

  const favButtonClickHandler = () => {
    if (isFav) {
      removeFromFavorites(videoId);
    } else {
      addToFavorites(favData);
    }
  };

  let showLarge = false;
  if (break1324) {
    showLarge = true;
  } else if (break768 && !break1024) {
    showLarge = true;
  }

  return (
    <Container>
      <div className="video-container">
        <Frame id={videoId} />
      </div>

      <div className="video-info">
        <div className="title-section">
          <div className="title-header-section">
            <h1 className="video-title" data-testid="details-title">
              {videoTitle}
            </h1>
            {userLogged && (
              <>
                {showLarge ? (
                  <button
                    onClick={favButtonClickHandler}
                    type="button"
                    className="add-remove-favorites"
                    data-testid="add-remove-favs-btn"
                  >
                    {isFav ? 'Remove from favorites' : 'Add to favorites'}
                  </button>
                ) : (
                  <StyledFavButton
                    top="0px"
                    style={{ display: 'flex' }}
                    onClick={favButtonClickHandler}
                  >
                    {isFav ? (
                      <RemoveCircleOutline color="secondary" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </StyledFavButton>
                )}
              </>
            )}
          </div>
          <div className="video-publishedAt">&raquo;&ensp;{publishedDate}</div>
        </div>
        <hr />
        <div className="description-section">
          <div className="channel-area">
            <div className="logo">
              <img src={channelLogo} alt="logo-channel" />
            </div>
            <div className="channel-title">{channelTitle}</div>
          </div>
          <div className="description-area">
            <div className="video-description">{videoDescription}</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Details;
