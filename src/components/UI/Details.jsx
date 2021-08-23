import Frame from './Frame';
import { Container } from './Details.styles';
import { formattedDate } from '../../lib/funcs';

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

  const publishedDate = formattedDate(videoPublishedAt);

  let favData;
  let isFav = false;
  if (userLogged) {
    favData = {
      channelTitle,
      videoDuration,
      videoId,
      videoTitle,
      videoImage,
    };
    isFav = favorites.find((fav) => fav.videoId === videoId) || false;
  }

  return (
    <Container>
      <div className="video-container">
        <Frame id={videoId} />
      </div>

      <div className="video-info">
        <div className="title-section">
          <div className="title-header-section">
            <h1 className="video-title" data-testid="title">
              {videoTitle}
            </h1>
            {userLogged && (
              <button
                onClick={
                  isFav
                    ? () => removeFromFavorites(videoId)
                    : () => addToFavorites(favData)
                }
                type="button"
                className="add-remove-favorites"
              >
                {isFav ? 'Remove from favorites' : 'Add to favorites'}
              </button>
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
