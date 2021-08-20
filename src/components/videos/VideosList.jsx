import React from 'react';
import VideoItem from './VideoItem';
import { Container } from './VideosList.styles';

const VideosList = ({ list, display, onSelected }) => {
  return (
    <Container display={display} data-testid="list-videos">
      {list?.map((item) => {
        return (
          <VideoItem
            key={item.videoId}
            {...item}
            onSelected={onSelected}
            display={display}
          />
        );
      })}
    </Container>
  );
};

export default React.memo(VideosList);
