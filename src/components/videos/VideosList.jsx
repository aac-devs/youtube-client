import React from 'react';
import VideoItem from './VideoItem';
import { StyledList } from './VideosList.styles';

const VideosList = ({ list, display, onSelected }) => {
  return (
    <StyledList display={display} data-testid={`list-videos-${display}`}>
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
    </StyledList>
  );
};

export default React.memo(VideosList);
