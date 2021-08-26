import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import { AppContextProvider } from '../context/app-context';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { darkTheme } from '../styles/themes';
import mockRelatedInitial from '../mock/relatedToId/initial.json';
import mockRelatedDurations from '../mock/relatedToId/durations.json';
import mockRelatedLogos from '../mock/relatedToId/logos.json';
import mockSingleInitial from '../mock/single/initial.json';
import mockSingleDurations from '../mock/single/durations.json';
import mockSingleLogos from '../mock/single/logos.json';
import DetailsView from './DetailsView';

describe('<HomeView />', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.push('/videos/lWQ69WX7-hA');
    fetchMock.resetMocks();
    fetchMock.mockResponses(
      [JSON.stringify(mockSingleInitial), { status: 200 }],
      [JSON.stringify(mockRelatedInitial), { status: 200 }],
      [JSON.stringify(mockSingleDurations), { status: 200 }],
      [JSON.stringify(mockRelatedDurations), { status: 200 }],
      [JSON.stringify(mockSingleLogos), { status: 200 }],
      [JSON.stringify(mockRelatedLogos), { status: 200 }]
    );

    render(
      <AppContextProvider>
        <ThemeProvider theme={darkTheme}>
          <Router history={history}>
            <DetailsView />
          </Router>
        </ThemeProvider>
      </AppContextProvider>
    );
  });

  test('should render a loading spinner folloed by multiple video items and a frame', async () => {
    const videosListItems = await screen.findAllByTestId(/video-item/i);
    expect(videosListItems.length).toBe(9);
  });
});
