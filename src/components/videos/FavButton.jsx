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
          data-testid="fav-add-button"
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
          data-testid="fav-remove-button"
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
        data-testid="fav-add-button"
      >
        <FavoriteBorderIcon />
      </div>
    );
  }

  return <>{favButton}</>;
};

export default FavButton;