const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const buildUrl = (params) => {
  const {
    route,
    part,
    maxResults,
    type,
    safeSearch,
    q,
    relatedToVideoId,
    id,
    pageToken,
  } = params;
  return `${baseUrl}/${route}?key=${apiKey}&part=${part}${
    maxResults ? `&maxResults=${maxResults}` : ''
  }${type ? `&type=${type}` : ''}${safeSearch ? `&safeSearch=${safeSearch}` : ''}${
    q ? `&q=${q}` : ''
  }${relatedToVideoId ? `&relatedToVideoId=${relatedToVideoId}` : ''}${
    id ? `&id=${id}` : ''
  }${pageToken ? `&pageToken=${pageToken}` : ''}`;
};

const fetchData = async (params) => {
  const response = await fetch(buildUrl(params));
  const data = await response.json();
  return data;
};

const searchVideos = async (params) => {
  const data = await fetchData(params);
  const filteredData = {
    nextPage: data.nextPageToken,
    items: [],
  };
  filteredData.items = data.items.map((video) => {
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
  return {
    nextPage: filteredData.nextPage,
    items: filteredData.items.filter((video) => video.videoTitle),
  };
};

const searchVideoDurations = async (videos, params) => {
  const data = await fetchData(params);
  return {
    nextPage: videos.nextPage,
    items: videos.items.map((video) => {
      return {
        ...video,
        videoDuration: data.items.find((item) => item.id === video.videoId)
          ?.contentDetails?.duration,
      };
    }),
  };
};

const searchChannelLogos = async (videos, params) => {
  const data = await fetchData(params);
  return {
    nextPage: videos.nextPage,
    items: videos.items.map((video) => {
      const channelLogo =
        data.items.find((item) => item.id === video.channelId)?.snippet?.thumbnails.medium
          .url || 'no-logo';
      return {
        ...video,
        channelLogo,
      };
    }),
  };
};

const findVideos = async (value) => {
  try {
    const { q, relatedToVideoId, maxResults, pageToken } = value;
    let params = {
      route: 'search',
      part: 'snippet',
      q,
      relatedToVideoId,
      maxResults,
      type: 'video',
      safeSearch: 'strict',
      pageToken,
    };

    let resp = await searchVideos(params);
    let ids = resp.items.map((video) => video.videoId).join();
    params = {
      route: 'videos',
      part: 'contentDetails',
      id: ids,
    };

    resp = await searchVideoDurations(resp, params);
    ids = resp.items.map((video) => video.channelId).join();
    params = {
      route: 'channels',
      part: 'snippet',
      id: ids,
    };

    resp = await searchChannelLogos(resp, params);
    return {
      ok: true,
      data: resp,
    };
  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      error: error.message || 'Something went wrong',
    };
  }
};

const findVideo = async (id) => {
  try {
    let params = {
      route: 'videos',
      part: 'snippet',
      id,
    };

    let resp = await searchVideos(params);
    params = {
      route: 'videos',
      part: 'contentDetails',
      id,
    };
    const newResp = {
      nextPage: null,
      items: [{ ...resp.items[0], videoId: id }],
    };

    resp = await searchVideoDurations(newResp, params);
    params = {
      route: 'channels',
      part: 'snippet',
      id: resp.items[0].channelId,
    };

    resp = await searchChannelLogos(resp, params);
    return {
      ok: true,
      data: resp,
    };
  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      error: error.message || 'Something went wrong',
    };
  }
};

export { findVideos, findVideo, buildUrl };
