import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const FavButton = (props) => {
  const { favorites, videoId, values, addToFavorites, removeFromFavorites } = props;
  let favButton;

  if (favorites.length > 0) {
    const favVideo = favorites.find((item) => item.videoId === videoId);
    if (!favVideo) {
      favButton = (
        <div
          className="fav-button"
          style={{ top: `${props.top}` }}
          role="button"
          onClick={() => addToFavorites(values)}
        >
          <FavoriteBorderIcon />
        </div>
      );
    } else {
      favButton = (
        <div
          className="fav-button"
          style={{ top: `${props.top}` }}
          role="button"
          onClick={() => removeFromFavorites(videoId)}
        >
          <RemoveCircleOutlineIcon color="secondary" />
        </div>
      );
    }
  } else {
    favButton = (
      <div
        className="fav-button"
        style={{ top: `${props.top}` }}
        role="button"
        onClick={() => addToFavorites(values)}
      >
        <FavoriteBorderIcon />
      </div>
    );
  }

  return <>{favButton}</>;
};

export default FavButton;
