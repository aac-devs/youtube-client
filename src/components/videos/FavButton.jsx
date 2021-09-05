import styled from 'styled-components';
import { FavoriteBorder, RemoveCircleOutline } from '@material-ui/icons';

export const StyledFavButton = styled.div.attrs({
  role: 'button',
})`
  cursor: pointer;
  height: 35px;
  width: 35px;
  z-index: 10;
  position: absolute;
  top: ${({ top }) => top};
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: dodgerblue;
  border-radius: 4px;
  display: none;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: #fff;
  }
`;

const FavButton = (props) => {
  const { favorites, videoId, values, addToFavorites, removeFromFavorites, favVideo } =
    props;

  let favButton;
  if (favorites.length > 0) {
    if (!favVideo) {
      favButton = (
        <StyledFavButton
          className="fav-button"
          top={`${props.top}`}
          onClick={() => addToFavorites(values)}
          data-testid={`fav-add-button-${videoId}`}
        >
          <FavoriteBorder />
        </StyledFavButton>
      );
    } else {
      favButton = (
        <StyledFavButton
          className="fav-button"
          top={`${props.top}`}
          onClick={() => removeFromFavorites(videoId)}
          data-testid={`fav-remove-button-${videoId}`}
        >
          <RemoveCircleOutline color="secondary" />
        </StyledFavButton>
      );
    }
  } else {
    favButton = (
      <StyledFavButton
        className="fav-button"
        top={`${props.top}`}
        onClick={() => addToFavorites(values)}
        data-testid={`fav-add-button-${videoId}`}
      >
        <FavoriteBorder />
      </StyledFavButton>
    );
  }

  return favButton;
};

export default FavButton;
