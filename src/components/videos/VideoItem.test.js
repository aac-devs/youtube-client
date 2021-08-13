import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoItem from './VideoItem';
import { darkTheme } from '../../styles/themes';

describe('<VideoItem />', () => {
  const data = {
    image: 'https://i.pinimg.com/564x/10/d5/bb/10d5bb751a04d89562143801d62bcffa.jpg',
    title: 'some title',
    description: 'some description',
    duration: 'PT18M11S',
    publishedAt: '2019-06-10T23:00:02Z',
  };

  describe('grid:', () => {
    beforeEach(() => {
      render(
        <ThemeProvider theme={darkTheme}>
          <VideoItem
            display="grid"
            videoImage={data.image}
            videoTitle={data.title}
            videoDescription={data.description}
            videoDuration={data.duration}
            videoPublishedAt={data.publishedAt}
          />
        </ThemeProvider>
      );
    });
    test('should renders an image in an img element', () => {
      expect(screen.getByTestId('video-image')).toBeInTheDocument();
    });
    test('should renders a title', () => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
    });
  });
  describe('flex:', () => {
    const clickHandler = jest.fn();

    beforeEach(() => {
      render(
        <ThemeProvider theme={darkTheme}>
          <VideoItem
            display="flex"
            videoImage={data.image}
            videoTitle={data.title}
            videoDescription={data.description}
            videoDuration={data.duration}
            videoPublishedAt={data.publishedAt}
            onSelected={clickHandler}
          />
        </ThemeProvider>
      );
    });
    test('should renders an image in an img element', () => {
      expect(screen.getByTestId('video-image')).toBeInTheDocument();
    });
    test('should renders a title', () => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
    });
    test('should call clickHandler if the component is clicked', () => {
      const element = screen.getByRole('listitem');
      userEvent.click(element);
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
