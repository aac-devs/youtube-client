import styled from 'styled-components';

export const Container = styled.div`
  width: ${(props) => (props.wide ? '130px' : 'unset')};
  height: 56px;
  margin-right: 5px;
  display: flex;
  cursor: pointer;

  .image-area {
    height: 56px;
    width: 38px;
    margin-right: 2px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .text-area {
    position: relative;
    font-family: 'Oswald', sans-serif;
    color: ${({ theme }) => theme.appBar.text};
    font-weight: 400;
    font-size: 28px;
    padding: 0;
    top: 7px;
    .W0 {
      left: 0;
    }
    .i1 {
      left: 19px;
    }
    .z2 {
      left: 25px;
    }
    .e3 {
      left: 34px;
    }
    .T4 {
      left: 42px;
    }
    .u5 {
      left: 50px;
    }
    .b6 {
      left: 61px;
    }
    .e7 {
      left: 73px;
    }
  }
`;
