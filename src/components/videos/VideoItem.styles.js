import styled, { css } from 'styled-components';

export const Container = styled.li`
  list-style: none;
  cursor: pointer;
  outline: none;
  border: none;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  .videoTitle-area {
    max-height: 40px;
    margin-top: 8px;
    padding: 3px 0;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    color: ${({ theme }) => theme.text.titleColor};
  }

  .channelTitle-area {
    max-height: 20px;
    margin-top: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.text.channelColor};
    overflow: hidden;
  }

  .videoPublishedAt-area {
    max-height: 20px;
    overflow: hidden;
    font-size: 14px;
    color: ${({ theme }) => theme.text.channelColor};
  }

  .videoDuration-area {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    bottom: 10px;
    right: 5px;
    padding: 2px 5px;
    border-radius: 4px;
  }

  ${({ display }) =>
    display === 'grid'
      ? css`
          display: grid;
          width: 300px;
          max-height: 270px;

          grid-template-columns: 48px 252px;
          grid-template-rows: 170px 1fr;
          grid-template-areas:
            'videoImage videoImage'
            'channelLogo cardBody';

          .videoImage-area {
            position: absolute;
            overflow: hidden;
            grid-area: videoImage;
            img {
              object-fit: cover;
              height: 170px;
              min-height: 170px;
              width: 300px;
            }
          }

          .channelLogo-area {
            grid-area: channelLogo;
            margin: 12px 12px 0 0;
            overflow: hidden;
            img {
              height: 36px;
              min-height: 36px;
              width: 36px;
              min-width: 36px;
              border-radius: 50%;
            }
          }
          .card-body {
            grid-area: cardBody;
            margin-right: 15px;
          }
        `
      : css`
          width: 100%;
          min-width: 300px;
          max-height: 100px;
          height: 100px;
          display: flex;
          margin-bottom: 8px;

          .card-body {
            overflow: hidden;
          }

          .videoImage-area {
            position: relative;
            overflow: hidden;
            height: 100px;
            min-height: 100px;
            min-width: 170px;
            max-width: 170px;
            margin-right: 8px;
            img {
              object-fit: cover;
              height: 100px;
              width: 170px;
            }
            .videoDuration-area {
              bottom: 5px;
            }
          }
          .videoTitle-area {
            margin-top: 2px;
            padding-top: 0;
          }
        `}
`;