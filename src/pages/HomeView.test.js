import { render, screen } from '@testing-library/react';
import HomeView from './HomeView';
import { server, rest } from '../testServer';

const baseUrl = process.env.REACT_APP_BASE_URL;

describe('<HomeView />', () => {
  test('should render a loading spinner followed by multiple video items', async () => {
    render(<HomeView />);
    const loadingSpinner = screen.getByTestId('spinner');
    expect(loadingSpinner).toBeInTheDocument();
    const videosList = await screen.findByTestId('list-videos');
    expect(videosList).toBeInTheDocument();
  });

  test('should render a loading spinner folloed by multiple video items', async () => {
    render(<HomeView />);
    const videosListItems = await screen.findAllByTestId(/video-item/i);
    expect(videosListItems.length).toBe(24);
  });

  test('should show an error message when an error requests occurs', async () => {
    server.use(
      rest.get(`${baseUrl}/search`, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    render(<HomeView />);
    const errorMsg = await screen.findByTestId('error-message');
    expect(errorMsg).toBeInTheDocument();
  });
});
