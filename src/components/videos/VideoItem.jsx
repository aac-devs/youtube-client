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
  div {
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
  h2 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 5px;
  }
  p {
    font-size: 12px;
  }
`;

const VideoItem = (props) => {
  return (
    <Container>
      <img src={props.image} alt={props.title} />
      <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </Container>
  );
};

export default VideoItem;
