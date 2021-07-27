import styled from 'styled-components';

const Container = styled.li`
  width: 300px;
  min-width: 300px;
  height: 280px;
  max-height: 280px;
  background-color: #37474f;
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  color: #fff;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #4c585f;
  }
  .body {
    padding: 6px;
    padding-top: 12px;
    width: 100%;
    color: #fff;
    text-align: left;
  }
  img {
    object-fit: cover;
    height: 140px;
    min-height: 140px;
    width: 100%;
  }
  p {
    font-size: 14px;
  }
  .title {
    max-height: 48px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .description {
    height: 60px;
    max-height: 60px;
    overflow: hidden;
  }
`;

const VideoItem = (props) => {
  return (
    <Container>
      <img src={props.image} alt={props.title} />
      <div className="body">
        <div className="title">
          <h4>{props.title}</h4>
        </div>
        <div className="description">
          <p>{props.description}</p>
        </div>
      </div>
    </Container>
  );
};

export default VideoItem;
