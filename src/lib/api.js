const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const fetchVideos = async (item, type = 'value') => {
  const url = `${baseUrl}/search?part=snippet&key=${apiKey}&maxResults=20${
    type === 'value' ? `&q=${item}` : `&relatedToVideoId=${item}`
  }&type=video&safeSearch=strict`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

export { fetchVideos };
