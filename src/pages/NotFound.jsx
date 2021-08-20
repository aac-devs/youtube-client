import styled from 'styled-components';

const Container = styled.main`
  padding: 10px;
  margin: 0 auto;
  max-width: 1700px;
  width: 100%;
  padding-top: 74px;

  font-size: 48px;
  color: #fff;
  text-align: center;
`;

const NotFound = () => {
  return <Container>Not Found</Container>;
};

export default NotFound;
