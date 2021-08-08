import styled from 'styled-components';

const Container = styled.li`
  min-width: 300px;
  background-color: #37474f;
  cursor: pointer;
  outline: none;
  border: none;
  overflow: hidden;
  color: #fff;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #4c585f;
  }

  p {
    font-size: 14px;
  }

  .description {
    height: 60px;
    max-height: 60px;
    overflow: hidden;
  }

  display: flex;
  justify-content: flex-start;

  width: ${({ display }) => (display === 'grid' ? '300px' : '100%')};
  height: ${({ display }) => (display === 'grid' ? '280px' : '100px')};
  max-height: ${({ display }) => (display === 'grid' ? '280px' : '100px')};

  flex-direction: ${({ display }) => (display === 'grid' ? 'column' : 'row')};
  align-items: ${({ display }) => (display === 'grid' ? 'center' : 'stretch')};
  margin-bottom: ${({ display }) => (display === 'grid' ? '0' : '10px')};

  .body {
    padding: 6px;
    padding-top: ${({ display }) => (display === 'grid' ? '12px' : '0')};
    width: 100%;
    color: #fff;
    text-align: left;
  }

  img {
    object-fit: cover;
    height: ${({ display }) => (display === 'grid' ? '140px' : '100px')};
    min-height: ${({ display }) => (display === 'grid' ? '140px' : '100px')};
    width: ${({ display }) => (display === 'grid' ? '100%' : '160px')};
  }

  .title {
    max-height: 48px;
    overflow: hidden;
    margin-bottom: 10px;
  }
`;

const VideoItem = (props) => {
  const { id, index, title, description, image, display, channel, onSelected } = props;

  const clickHandler = () => {
    onSelected({ id, title, description, channel });
  };

  return (
    <Container
      onClick={clickHandler}
      display={display}
      data-testid={`video-item-${index}`}
    >
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <div className="body">
        <div className="title">
          <h4>{title}</h4>
        </div>
        <div>
          <h6>{channel}</h6>
        </div>
        {display === 'grid' && (
          <div className="description">
            <p>{description}</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default VideoItem;
