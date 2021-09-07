import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../../context/app-context';
import { Container } from './SearchBox.styles';

const SearchBox = () => {
  const history = useHistory();

  const [searchValue, setSearchValue] = useState('');
  const { searchFor } = useAppContext();

  const valueChangeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredValue = searchValue.trim();
    if (enteredValue !== '') {
      searchFor(enteredValue);
    }
    setSearchValue('');
    if (history.location.pathname !== '/videos') {
      history.push('/videos');
    }
  };

  return (
    <Container onSubmit={submitHandler} role="form">
      <SearchIcon />
      <input
        type="text"
        placeholder="search.."
        onChange={valueChangeHandler}
        value={searchValue}
      />
    </Container>
  );
};

export default SearchBox;
