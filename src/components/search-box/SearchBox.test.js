import { render, screen } from '@testing-library/react';
import userEvent, { specialChars } from '@testing-library/user-event';

import SearchBox from './SearchBox';

describe('SearchBox Component', () => {
  const searchHandler = jest.fn();
  let input;

  beforeEach(() => {
    render(<SearchBox onSearch={searchHandler} />);
    input = screen.getByPlaceholderText('search');
  });

  test('should avoid submit blank texts', () => {
    userEvent.type(input, specialChars.enter);
    expect(searchHandler).not.toHaveBeenCalled();
  });

  test('should call searchHandler if some input from SearchBox is submitted', () => {
    userEvent.type(input, 'react{enter}');
    expect(searchHandler).toHaveBeenCalledTimes(1);
  });

  test('should clear the input box after value is submitted', () => {
    userEvent.type(input, 'react{enter}');
    expect(input).toHaveValue('');
  });
});
