import { useState, useRef, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import VideosList from '../components/videos/VideosList';
import { useAppContext } from '../context/app-context';
import { findVideos } from '../lib/youtube-api';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import useHttp from '../hooks/useHttp';
import ErrorCard from '../components/ErrorCard';
import { PageContainer } from '../global-styles';

const HomeView = () => {
  const {
    sendRequest,
    loading,
    data: videos,
    error,
    onResetError,
    onClearList,
  } = useHttp(findVideos);
  const [nextFetch, setNextFetch] = useState(false);

  const history = useHistory();
  const { searchValue } = useAppContext();

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setNextFetch(true);
        }
      },
      { threshold: 1 }
    )
  );

  const [element, setElement] = useState(null);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  useEffect(() => {
    onClearList();
    sendRequest({ q: searchValue, maxResults: 20 });
  }, [sendRequest, onClearList, searchValue]);

  useEffect(() => {
    if (videos?.nextPage && nextFetch) {
      sendRequest({ q: searchValue, maxResults: 20, pageToken: videos.nextPage });
      setNextFetch(false);
    }
  }, [nextFetch, searchValue, sendRequest, videos?.nextPage]);

  const videoSelectedHandler = useCallback(
    (videoId) => {
      history.push(`/videos/${videoId}`);
    },
    [history]
  );

  if (error) {
    return (
      <ErrorCard data-testid="error-message" onClose={() => onResetError()} {...error} />
    );
  }

  return (
    <PageContainer>
      {loading && <LoadingSpinner />}
      <VideosList
        ref={setElement}
        list={videos?.items}
        onSelected={videoSelectedHandler}
        display="home"
      />
    </PageContainer>
  );
};

export default HomeView;
