import { render, screen } from '@testing-library/react';
import userEvent, { specialChars } from '@testing-library/user-event';

import App from '../../App';
import AppContext from '../../context/app-context';
import { types } from '../../types/types';

describe('<SearchBox />', () => {
  let input;

  const contextValues = {
    searchValue: '',
    page: types.page.home,
    searchFor: jest.fn(),
    changePage: jest.fn(),
  };

  beforeEach(() => {
    render(
      <AppContext.Provider value={contextValues}>
        <App />
      </AppContext.Provider>
    );

    input = screen.getByPlaceholderText('search..');
  });

  test('should avoid submit blank texts', () => {
    userEvent.type(input, specialChars.enter);
    expect(contextValues.searchFor).not.toHaveBeenCalled();
  });

  test('should call searchHandler if some input from SearchBox is submitted', () => {
    userEvent.type(input, 'react{enter}');
    expect(contextValues.searchFor).toHaveBeenCalledTimes(1);
    expect(contextValues.searchFor).toHaveBeenCalledWith('react');
  });

  test('should clear the input box after value is submitted', () => {
    userEvent.type(input, 'react{enter}');
    expect(input).toHaveValue('');
  });
});
