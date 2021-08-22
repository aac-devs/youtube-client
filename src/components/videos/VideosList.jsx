import React from 'react';
import styled, { css } from 'styled-components';
import VideoItem from './VideoItem';

export const StyledList = styled.ul`
  min-width: 300px;
  ${({ display }) =>
    display === 'home'
      ? css`
          display: grid;
          grid-template-columns: repeat(auto-fit, 300px);
          grid-column-gap: 15px;
          grid-row-gap: 30px;
          justify-content: center;
        `
      : display === 'related'
      ? css`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        `
      : css`
          /* background-color: #fff; */
        `}
`;

const VideosList = ({ list, display, onSelected }) => {
  return (
    <StyledList display={display} data-testid="list-videos">
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
