import youtubeLogo from '../assets/youtube.png';
import { Container } from './YoutubeLogo.styles';

const YoutubeLogo = (props) => {
  const { withText } = props;
  const word = ['W', 'i', 'z', 'e', 'T', 'u', 'b', 'e'];
  const letters = word.map((letter, index) => {
    const classNames = `${letter}${index}`;
    return (
      <span className={classNames} key={classNames} style={{ position: 'absolute' }}>
        {letter}
      </span>
    );
  });
  return (
    <Container wide={withText} onClick={props.onClick} data-testid="brand-btn">
      <div className="image-area">
        <img src={youtubeLogo} alt="logo" />
      </div>
      {withText && <div className="text-area">{letters}</div>}
    </Container>
  );
};

export default YoutubeLogo;
