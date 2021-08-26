import { act, renderHook } from '@testing-library/react-hooks';
import { findVideos } from '../lib/youtube-api';
import useHttp from './useHttp';
import mockListInitial from '../mock/list/initial.json';
import mockListDurations from '../mock/list/durations.json';
import mockListLogos from '../mock/list/logos.json';
import mockListResult from '../mock/list/result.json';

describe('useHttp Hook', () => {
  test('1', () => expect(true).toBe(true));

  beforeEach(() => {
    fetchMock.resetMocks();
  });
  test('handles loading state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHttp(findVideos));
    act(() => {
      result.current.sendRequest({ q: 'react' });
    });
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
  });

  test('get a list of videos succesfully', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(mockListInitial), { status: 200 }],
      [JSON.stringify(mockListDurations), { status: 200 }],
      [JSON.stringify(mockListLogos), { status: 200 }]
    );
    const { result, waitForNextUpdate } = renderHook(() => useHttp(findVideos));
    act(() => {
      result.current.sendRequest({ q: 'react' });
    });
    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockListResult.data);
  });

  test('handles error state correctly', async () => {
    fetchMock.mockReject(new Error('fake error message'));
    const { result, waitForNextUpdate } = renderHook(() => useHttp(findVideos));
    act(() => {
      result.current.sendRequest({ relatedToVideoId: 'lWQ69WX7-hA' });
    });
    await waitForNextUpdate();
    expect(result.current.error).not.toBe(null);
  });
});
