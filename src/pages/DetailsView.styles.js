import styled from 'styled-components';

export const Container = styled.main`
  margin: 0 auto;
  max-width: 1700px;
  padding: 10px;
  padding-top: 74px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  @media (max-width: 960px) {
    flex-direction: column;
  }

  .relates-area {
    width: 400px;
    min-width: 400px;
    margin-left: 10px;
    @media (max-width: 960px) {
      width: 100%;
      min-width: 300px;
      margin: 20px 0 0 0;
    }
  }
`;
