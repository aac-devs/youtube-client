import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';

const Container = styled.form`
  width: 100%;
  max-width: 400px;
  height: 35px;
  display: flex;
  align-items: center;
  background-color: rgba(98, 114, 123, 1);
  padding: 0 10px;
  color: #fff;
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
    color: #fff;
    outline: none;
    font-size: 16px;
    ::placeholder {
      color: #ddd;
    }
  }
`;

const SearchBox = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const valueChangeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredValue = searchValue.trim();
    if (enteredValue !== '') {
      onSearch(enteredValue);
    }
    setSearchValue('');
  };

  return (
    <Container onSubmit={submitHandler} role="form">
      <SearchIcon />
      <input
        type="text"
        placeholder="search"
        onChange={valueChangeHandler}
        value={searchValue}
      />
    </Container>
  );
};

export default SearchBox;
