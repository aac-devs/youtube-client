import React from 'react';
import VideoItem from './VideoItem';
import { StyledList } from './VideosList.styles';

const VideosList = React.forwardRef(({ list, display, onSelected }, ref) => {
  return (
    <StyledList display={display} data-testid={`list-videos-${display}`}>
      {list?.map((item) => {
        const key = `${item.videoId}`;
        return (
          <VideoItem
            ref={ref}
            key={key}
            {...item}
            onSelected={onSelected}
            display={display}
          />
        );
      })}
    </StyledList>
  );
});

export default React.memo(VideosList);
