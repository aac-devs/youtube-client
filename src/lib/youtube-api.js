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

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const fetchData = async (params) => {
  // console.log('fetching....');
  console.log(buildUrl(params));
  // await delay(1000);
  const response = await fetch(buildUrl(params));
  // console.log({ response });
  const data = await response.json();
  // console.log('end fetching...');
  console.log({ data });
  return data;
};

const searchVideos = async (params) => {
  // console.log('search videos');
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
  // console.log('video durations');
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
  // console.log('channel logos');
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

    // await delay(1000);
    resp = await searchVideoDurations(resp, params);
    ids = resp.map((video) => video.channelId).join();
    params = {
      route: 'channels',
      part: 'snippet',
      id: ids,
    };

    // await delay(1000);
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
  return searchVideos(params)
    .then((resp) => {
      params = {
        route: 'videos',
        part: 'contentDetails',
        id,
      };
      const newResp = [{ ...resp[0], videoId: id }];
      return searchVideoDurations(newResp, params);
    })
    .then((resp) => {
      params = {
        route: 'channels',
        part: 'snippet',
        id: resp[0].channelId,
      };
      return searchChannelLogos(resp, params);
    })
    .then((resp) => {
      const data = resp[0];
      data.videoId = id;
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
