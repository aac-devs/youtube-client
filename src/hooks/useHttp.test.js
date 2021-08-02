import { act, renderHook } from '@testing-library/react-hooks';
import { fetchVideos } from '../lib/api';
import useHttp from './useHttp';
import mockData from '../helper/mock-data.json';

describe('useHttp Hook', () => {
  window.fetch = jest.fn();

  test('fetches videos by url constructed correcty', async () => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBfc4oeDp-VCHubNeaFbwuPz-_LKiWMn7E&maxResults=20&q=react&type=video&safeSearch=strict`;

    await act(async () => renderHook(() => useHttp(fetchVideos, 'react')));
    expect(window.fetch).toBeCalledWith(url);
  });

  test('handles error state correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      json: async () => {
        return null;
      },
    });
    const { result, waitForNextUpdate } = renderHook(() =>
      useHttp(fetchVideos, 'id-video', 'related')
    );
    await waitForNextUpdate();
    expect(result.current.error).not.toBe(null);
  });

  describe('while fetching data', () => {
    beforeEach(() => {
      window.fetch.mockResolvedValueOnce({
        json: async () => {
          return mockData;
        },
      });
    });

    test('handles loading state correctly', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useHttp(fetchVideos, 'react')
      );
      expect(result.current.loading).toBe(true);
      await waitForNextUpdate();
      expect(result.current.loading).toBe(false);
    });

    test('get data succesfully', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useHttp(fetchVideos, 'react')
      );
      await waitForNextUpdate();
      expect(result.current.list[0]).toEqual(mockData.items[0]);
    });
  });
});
