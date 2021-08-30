import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../styles/themes';
import Details from './Details';
import { AppContextProvider } from '../context/app-context';
import { formattedDate } from '../lib/aux-functions';

import mockData from '../mock/list/result.json';
import userEvent from '@testing-library/user-event';

describe('<Details />', () => {
  const { videoDescription, videoPublishedAt, videoTitle, channelTitle } =
    mockData.data[0];

  const favorites = [
    {
      docId: '-MiLDGxm9plvfKeeJk-U',
      channelTitle: 'EDteam',
      videoDuration: 'PT18M11S',
      videoId: 'lWQ69WX7-hA',
      videoImage: [Object],
      videoTitle: '¿Qué es React.js y cómo funciona?',
    },
    {
      docId: '-MiLDGybfJ7e8uZIqDZE',
      channelTitle: 'Carlos Azaustre - Aprende JavaScript',
      videoDuration: 'PT37M37S',
      videoId: 'EMk6nom1aS4',
      videoImage: [Object],
      videoTitle:
        'APRENDE REACT BÁSICO en 30 MINUTOS ⏰  - Tutorial de React.js Desde Cero',
    },
    {
      docId: '-MiLDGyvO8Qrbs4QDLlN',
      channelTitle: 'Fazt',
      videoDuration: 'PT3H16M5S',
      videoId: 'zIY87vU33aA',
      videoImage: [Object],
      videoTitle: 'Reactjs, Curso Práctico para Principiantes (React 16)',
    },
  ];

  const props = {
    ...mockData.data[0],
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
    userLogged: true,
    favorites,
  };

  describe('with favorites', () => {
    beforeEach(() => {
      render(
        <ThemeProvider theme={darkTheme}>
          <AppContextProvider>
            <Details {...props} />
          </AppContextProvider>
        </ThemeProvider>
      );
    });

    test('should renders video description succesfully', () => {
      expect(screen.getByText(videoDescription)).toBeInTheDocument();
    });

    test('should renders video title succesfully', () => {
      expect(screen.getByText(videoTitle)).toBeInTheDocument();
    });

    test('should renders video duration succesfully', () => {
      expect(screen.getByText(channelTitle)).toBeInTheDocument();
    });

    test('should renders video description succesfully', () => {
      const publishedAt = new RegExp(formattedDate(videoPublishedAt));
      expect(screen.getByText(publishedAt)).toBeInTheDocument();
    });

    test('should renders the add/remove favorites if user is logged in and favorites includes video item', () => {
      expect(screen.getByText(/remove from favorites/i));
    });

    test('should call removeFromFavorites when fav button is clicked', () => {
      const favButton = screen.getByTestId('add-remove-favs-btn');
      userEvent.click(favButton);
      expect(props.removeFromFavorites).toHaveBeenCalledTimes(1);
    });
  });

  describe('without favorites', () => {
    beforeEach(() => {
      render(
        <ThemeProvider theme={darkTheme}>
          <AppContextProvider>
            <Details {...props} favorites={[]} />
          </AppContextProvider>
        </ThemeProvider>
      );
    });

    test('should renders the add/remove favorites if user is logged in and favorites includes video item', () => {
      expect(screen.getByText(/add to favorites/i));
    });

    test('should call addToFavorites when fav button is clicked', () => {
      const favButton = screen.getByTestId('add-remove-favs-btn');
      userEvent.click(favButton);
      expect(props.addToFavorites).toHaveBeenCalledTimes(1);
    });
  });
});
