import SearchIcon from '@material-ui/icons/Search';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/app-context';
import { Container } from './SearchBox.styles';

const SearchBox = () => {
  const history = useHistory();

  const [searchValue, setSearchValue] = useState('');
  const { searchFor } = useContext(AppContext);

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
    history.push('/videos');
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