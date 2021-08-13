import styled from 'styled-components';

export const Container = styled.main`
  margin: 0 auto;
  max-width: 1700px;
  padding: 10px;
  padding-top: 74px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  @media (max-width: 960px) {
    flex-direction: column;
  }

  .video-area {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .video-container {
      min-width: 300px;
      width: 100%;
      padding-top: 56.25%;
      position: relative;
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
      }
    }

    .video-info {
      margin: 15px 0;
      width: 100%;
      .title-section {
        margin-bottom: 15px;
        .video-title {
          color: ${({ theme }) => theme.text.titleColor};
          font-size: 20px;
          font-weight: 400;
          text-align: justify;
          text-justify: inter-word;
        }
        .video-publishedAt {
          color: ${({ theme }) => theme.text.channelColor};
          margin-top: 12px;
          font-size: 14px;
        }
      }
      hr {
        background-color: transparent;
        border: none;
        border-top: ${({ theme }) => theme.border};
      }
      .description-section {
        .channel-area {
          margin-top: 20px;
          overflow: hidden;
          display: flex;
          align-items: center;
          .logo {
            width: 60px;
            height: 48px;
            img {
              height: 48px;
              min-height: 48px;
              width: 48px;
              min-width: 48px;
              border-radius: 50%;
            }
          }
          .channel-title {
            color: ${({ theme }) => theme.text.titleColor};
            flex-grow: 1;
            padding: 0;
            font-size: 18px;
            font-weight: 600;
          }
        }
        .description-area {
          margin-top: 12px;
          .video-description {
            margin: 0 15px 0 60px;
            color: ${({ theme }) => theme.text.titleColor};
            font-size: 16px;
            text-align: justify;
            text-justify: inter-word;
          }
        }
      }
    }
  }

  .relates-area {
    width: 400px;
    min-width: 400px;
    margin-left: 10px;
    @media (max-width: 960px) {
      width: 100%;
      min-width: 300px;
      margin: 20px 0 0 0;
    }
  }
`;
