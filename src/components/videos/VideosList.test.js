import { render, screen } from '@testing-library/react';
import VideosList from './VideosList';
import mockListResult from '../../helper/mock/list/result.json';

describe('<VideosList />', () => {
  test('should not render nothing if props.list is empty', () => {
    render(<VideosList list={[]} />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('should render at least one item if props.list is not empty', () => {
    render(<VideosList list={[mockListResult.data[1]]} display="grid" />);
    expect(screen.queryByRole('listitem')).toBeInTheDocument();
  });
});
