import styled from 'styled-components';

export const MenuCard = styled.section`
  background-color: #fff;
  position: absolute;
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  top: 20px;
  width: ${(props) => props.width};
  padding: 15px 15px 10px 15px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #222;
  transition: all 0.5s;
`;

export const MenuItem = styled.div`
  padding: 4px 10px;
  border-radius: 5px;
  font-size: 22px;
  cursor: pointer;
  margin-bottom: 5px;
  transition: background-color 0.3s ease-in-out;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:hover {
    background-color: #ccc;
  }
`;
