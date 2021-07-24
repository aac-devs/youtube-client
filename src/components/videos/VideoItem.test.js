import { render, screen } from '@testing-library/react';
import VideoItem from './VideoItem';

describe('VideoItem Component', () => {
  test('should renders one "div" for image, one "h2" for title, one "p" for description', () => {
    const data = {
      image: 'http://image.jpg',
      title: 'some title',
      description: 'some description',
    };
    render(
      <VideoItem image={data.image} title={data.title} description={data.description} />
    );
    expect(screen.getByAltText(data.title)).toBeTruthy();
    expect(screen.getByText(data.title)).toBeTruthy();
    expect(screen.getByText(data.description)).toBeTruthy();
  });
});
