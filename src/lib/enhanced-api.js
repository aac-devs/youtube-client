const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const findVideosBySearchItem = async (item) => {
  const url = `${baseUrl}/search?part=snippet&key=${apiKey}&maxResults=20&q=${item}&type=video&safeSearch=strict`;
  const response = await fetch(url);
  const data = await response.json();
  const filteredData = data.items.map((video) => {
    const {
      id: { videoId },
      snippet,
    } = video;
    return {
      videoId,
      videoImage: {
        medium: snippet?.thumbnails.medium.url,
        default: snippet?.thumbnails.default.url,
      },
      videoTitle: snippet?.title,
      videoDescription: snippet?.description,
      videoPublishedAt: snippet?.publishedAt,
      channelId: snippet?.channelId,
      channelTitle: snippet?.channelTitle,
    };
  });
  return filteredData;
};

const findRelatedVideosById = async (id) => {
  const url = `${baseUrl}/search?part=snippet&key=${apiKey}&maxResults=40&relatedToVideoId=${id}&type=video&safeSearch=strict`;
  const response = await fetch(url);
  const data = await response.json();
  const filteredData = data.items.map((video) => {
    const {
      id: { videoId },
      snippet,
    } = video;
    return {
      videoId,
      videoImage: {
        medium: snippet?.thumbnails.medium.url,
        default: snippet?.thumbnails.default.url,
      },
      videoTitle: snippet?.title,
      videoDescription: snippet?.description,
      videoPublishedAt: snippet?.publishedAt,
      channelId: snippet?.channelId,
      channelTitle: snippet?.channelTitle,
    };
  });
  return filteredData;
};

const findDurationsByVideoId = async (videos, videoIds) => {
  const url = `${baseUrl}/videos?part=contentDetails&key=${apiKey}&id=${videoIds}`;
  const response = await fetch(url);
  const data = await response.json();
  const newArray = videos.map((video) => {
    return {
      ...video,
      videoDuration: data.items.find((item) => item.id === video.videoId).contentDetails
        ?.duration,
    };
  });
  return newArray;
};

const findLogosByChannelId = async (videos, channelIds) => {
  const url = `${baseUrl}/channels?part=snippet&key=${apiKey}&id=${channelIds}`;
  const response = await fetch(url);
  const data = await response.json();
  const newArray = videos.map((video) => {
    return {
      ...video,
      channelLogo: data.items.find((item) => item.id === video.channelId).snippet
        ?.thumbnails.medium.url,
    };
  });
  return newArray;
};

const findVideos = async (item) => {
  return findVideosBySearchItem(item)
    .then((resp) => {
      const ids = resp.map((video) => video.videoId).join();
      return findDurationsByVideoId(resp, ids);
    })
    .then((resp) => {
      const ids = resp.map((video) => video.channelId).join();
      return findLogosByChannelId(resp, ids);
    })
    .then((data) => {
      return {
        ok: true,
        data,
      };
    })
    .catch((error) => {
      return {
        ok: false,
        error: error.message || 'Something went wrong',
      };
    });
};

const findRelatedVideos = async (id) => {
  return findRelatedVideosById(id)
    .then((resp) => {
      const ids = resp.map((video) => video.videoId).join();
      return findDurationsByVideoId(resp, ids);
    })
    .then((data) => {
      return {
        ok: true,
        data,
      };
    })
    .catch((error) => {
      return {
        ok: false,
        error: error.message || 'Something went wrong',
      };
    });
};

export { findVideos, findRelatedVideos };
