import StyledButton from './GoogleButton.styles';

const GoogleButton = (props) => {
  return (
    <StyledButton
      data-testid="google-button"
      className="google-btn"
      onClick={() => props.onClick()}
    >
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="google button"
        />
      </div>
      <div className="btn-text">
        <b>Sign in with Google</b>
      </div>
    </StyledButton>
  );
};

export default GoogleButton;
