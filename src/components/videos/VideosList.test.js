import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import VideosList from './VideosList';
import mockListResult from '../../helper/mock/list/result.json';
import { darkTheme } from '../../styles/themes';

describe('<VideosList />', () => {
  test('should not render nothing if props.list is empty', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <VideosList list={[]} />
      </ThemeProvider>
    );
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('should render at least one item if props.list is not empty', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <VideosList list={[mockListResult.data[1]]} display="grid" />
      </ThemeProvider>
    );
    expect(screen.queryByRole('listitem')).toBeInTheDocument();
  });
});
