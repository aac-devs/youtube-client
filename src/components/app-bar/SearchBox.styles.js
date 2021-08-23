import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;
  max-width: 400px;
  height: 35px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.appBar.searchBox.backgroundColor};
  border: ${({ theme }) => theme.border};
  padding: 0 10px;
  color: ${({ theme }) => theme.appBar.text};
  border-radius: 5px;
  margin: 0 10px;
  @media (max-width: 960px) {
    margin-right: 20px;
  }
  input {
    width: 100%;
    min-width: 120px;
    margin-left: 10px;
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.appBar.text};
    outline: none;
    font-size: 16px;
    ::placeholder {
      color: ${({ theme }) => theme.appBar.searchBox.placeholder};
    }
  }
`;
