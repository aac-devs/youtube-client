import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoItem from './VideoItem';

describe('<VideoItem />', () => {
  const data = {
    image: 'https://i.pinimg.com/564x/10/d5/bb/10d5bb751a04d89562143801d62bcffa.jpg',
    title: 'some title',
    description: 'some description',
  };

  describe('grid:', () => {
    beforeEach(() => {
      render(
        <VideoItem
          display="grid"
          image={data.image}
          title={data.title}
          description={data.description}
        />
      );
    });
    test('should renders an image in an img element', () => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
    test('should renders a title', () => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
    });
    test('should renders a description', () => {
      expect(screen.getByText(data.description)).toBeInTheDocument();
    });
  });
  describe('flex:', () => {
    beforeEach(() => {
      render(
        <VideoItem
          display="flex"
          image={data.image}
          title={data.title}
          description={data.description}
        />
      );
    });
    test('should renders an image in an img element', () => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
    test('should renders a title', () => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
    });
    test('should not renders a description', () => {
      expect(screen.queryByText(data.description)).not.toBeInTheDocument();
    });
  });
  describe('click:', () => {
    test('should call clickHandler if the component is clicked', () => {
      const clickHandler = jest.fn();
      render(<VideoItem onSelected={clickHandler} />);
      const element = screen.getByRole('listitem');
      userEvent.click(element);
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
