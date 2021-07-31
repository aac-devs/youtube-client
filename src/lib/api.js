const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const findVideos = async (searchWord) => {
  const url = `${baseUrl}/search?part=snippet&key=${apiKey}&maxResults=40&q=${searchWord}&type=video&safeSearch=strict`;

  // Para videos relacionados
  // const url = `${baseUrl}/search?part=snippet&key=${apiKey}&maxResults=40&relatedToVideoId=fx4eg5qLwvI&type=video&safeSearch=strict`;
  // console.log(searchWord);

  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

export { findVideos };
