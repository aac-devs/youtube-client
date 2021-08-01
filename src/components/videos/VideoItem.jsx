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

  width: ${(props) => (props.display === 'grid' ? '300px' : '100%')};
  height: ${(props) => (props.display === 'grid' ? '280px' : '100px')};
  max-height: ${(props) => (props.display === 'grid' ? '280px' : '100px')};

  flex-direction: ${(props) => (props.display === 'grid' ? 'column' : 'row')};
  align-items: ${(props) => (props.display === 'grid' ? 'center' : 'stretch')};
  margin-bottom: ${(props) => (props.display === 'grid' ? '0' : '10px')};

  .body {
    padding: 6px;
    padding-top: ${(props) => (props.display === 'grid' ? '12px' : '0')};
    width: 100%;
    color: #fff;
    text-align: left;
  }

  img {
    object-fit: cover;
    height: ${(props) => (props.display === 'grid' ? '140px' : '100px')};
    min-height: ${(props) => (props.display === 'grid' ? '140px' : '100px')};
    width: ${(props) => (props.display === 'grid' ? '100%' : '160px')};
  }

  .title {
    max-height: 48px;
    overflow: hidden;
    margin-bottom: 10px;
  }
`;

const VideoItem = (props) => {
  const clickHandler = () => {
    props.onSelected({
      id: props.id,
      title: props.title,
      description: props.description,
    });
  };

  return (
    <Container onClick={clickHandler} display={props.display}>
      <div className="image">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="body">
        <div className="title">
          <h4>{props.title}</h4>
        </div>
        {props.display === 'grid' && (
          <div className="description">
            <p>{props.description}</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default VideoItem;
