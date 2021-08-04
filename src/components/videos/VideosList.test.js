import { render, screen } from '@testing-library/react';
import VideosList from './VideosList';
import mockData from '../../helper/mock-data.json';

describe('<VideosList />', () => {
  test('should not render nothing if props.list is empty', () => {
    render(<VideosList list={[]} />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('should render at least one item if props.list is not empty', () => {
    render(<VideosList list={[mockData.items[1]]} display="grid" />);
    expect(screen.queryByRole('listitem')).toBeInTheDocument();
  });
});
