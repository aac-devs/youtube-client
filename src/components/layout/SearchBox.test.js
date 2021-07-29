import { render, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';

describe('SearchBox Component', () => {
  test('should call searchHandler if some input from SearchBox is submitted', () => {
    const searchHandler = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <SearchBox onSearch={searchHandler} />
    );
    const input = getByPlaceholderText('search');
    const form = getByRole('search');
    fireEvent.change(input, { target: { value: 'valor' } });
    fireEvent.submit(form);
    expect(searchHandler).toHaveBeenCalledTimes(1);
  });
});
