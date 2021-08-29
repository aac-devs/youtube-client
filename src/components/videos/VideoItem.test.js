import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoItem from './VideoItem';
import { darkTheme } from '../../styles/themes';
import AuthContext from '../../context/auth-context';

describe('<VideoItem />', () => {
  const data = {
    image: 'https://i.pinimg.com/564x/10/d5/bb/10d5bb751a04d89562143801d62bcffa.jpg',
    title: 'some title',
    description: 'some description',
    duration: 'PT18M11S',
    publishedAt: '2019-06-10T23:00:02Z',
  };

  const clickHandler = jest.fn();

  const authContextValue = {
    user: { uid: '123456', displayName: null, photoURL: null },
    login: jest.fn(),
    logout: jest.fn(),
    favorites: [],
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
  };

  beforeEach(() => {
    render(
      <AuthContext.Provider value={authContextValue}>
        <ThemeProvider theme={darkTheme}>
          <VideoItem
            display="home"
            videoImage={data.image}
            videoTitle={data.title}
            videoDescription={data.description}
            videoDuration={data.duration}
            videoPublishedAt={data.publishedAt}
            onSelected={clickHandler}
          />
        </ThemeProvider>
      </AuthContext.Provider>
    );
  });

  test('should call clickHandler if the component is clicked', () => {
    const element = screen.getByTestId(/video-item/i);
    userEvent.click(element);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  describe('grid:', () => {
    test('should renders an image in an img element', () => {
      expect(screen.getByTestId('video-image')).toBeInTheDocument();
    });

    test('should renders a title', () => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
    });

    test('favButton', () => {
      const favButton = screen.getByTestId('fav-add-button');
      userEvent.click(favButton);
      expect(authContextValue.addToFavorites).toHaveBeenCalledTimes(1);
    });
  });

  describe('flex:', () => {
    test('should renders an image in an img element', () => {
      expect(screen.getByTestId('video-image')).toBeInTheDocument();
    });

    test('should renders a title', () => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
    });
  });
});