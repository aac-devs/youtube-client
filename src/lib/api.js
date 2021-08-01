const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const fetchVideos = async (searchWord) => {
  const url = `${baseUrl}/search?part=snippet&key=${apiKey}&maxResults=20&q=${searchWord}&type=video&safeSearch=strict`;

  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

const fetchRelatedVideos = async (videoId) => {
  const url = `${baseUrl}/search?part=snippet&key=${apiKey}&maxResults=15&relatedToVideoId=${videoId}&type=video&safeSearch=strict`;

  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

export { fetchVideos, fetchRelatedVideos };
