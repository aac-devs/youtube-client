const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const buildUrl = (params) => {
  const { route, part, maxResults, type, safeSearch, q, relatedToVideoId, id } = params;
  return `${baseUrl}/${route}?key=${apiKey}&part=${part}${
    maxResults ? `&maxResults=${maxResults}` : ''
  }${type ? `&type=${type}` : ''}${safeSearch ? `&safeSearch=${safeSearch}` : ''}${
    q ? `&q=${q}` : ''
  }${relatedToVideoId ? `&relatedToVideoId=${relatedToVideoId}` : ''}${
    id ? `&id=${id}` : ''
  }`;
};

const fetchData = async (params) => {
  // console.log(buildUrl(params));
  const response = await fetch(buildUrl(params));
  // console.log({ response });
  const data = await response.json();
  console.log({ data });
  return data;
};

const searchVideos = async (params) => {
  const data = await fetchData(params);
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
  return filteredData.filter((video) => video.videoTitle);
};

const searchVideoDurations = async (videos, params) => {
  const data = await fetchData(params);
  return videos.map((video) => {
    return {
      ...video,
      videoDuration: data.items.find((item) => item.id === video.videoId)?.contentDetails
        ?.duration,
    };
  });
};

const searchChannelLogos = async (videos, params) => {
  const data = await fetchData(params);
  return videos.map((video) => {
    const channelLogo =
      data.items.find((item) => item.id === video.channelId)?.snippet?.thumbnails.medium
        .url || 'no-logo';
    return {
      ...video,
      channelLogo,
    };
  });
};

const findVideos = async (value) => {
  try {
    const { q, relatedToVideoId, maxResults } = value;
    let params = {
      route: 'search',
      part: 'snippet',
      q,
      relatedToVideoId,
      maxResults,
      type: 'video',
      safeSearch: 'strict',
    };

    let resp = await searchVideos(params);
    let ids = resp.map((video) => video.videoId).join();
    params = {
      route: 'videos',
      part: 'contentDetails',
      id: ids,
    };

    resp = await searchVideoDurations(resp, params);
    ids = resp.map((video) => video.channelId).join();
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
  let params = {
    route: 'videos',
    part: 'snippet',
    id,
  };
  console.log('single videos');
  return searchVideos(params)
    .then((resp) => {
      params = {
        route: 'videos',
        part: 'contentDetails',
        id,
      };
      const newResp = [{ ...resp[0], videoId: id }];
      console.log('single durations');
      return searchVideoDurations(newResp, params);
    })
    .then((resp) => {
      params = {
        route: 'channels',
        part: 'snippet',
        id: resp[0].channelId,
      };
      console.log('single channels');
      return searchChannelLogos(resp, params);
    })
    .then((resp) => {
      const data = resp[0];
      data.videoId = id;
      console.log({ data });
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

export { findVideos, findVideo, buildUrl };
