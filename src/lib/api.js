// import mockData from '../helper/mock-react.json';

// const apiKey = process.env.REACT_APP_API_KEY;
// const baseUrl = process.env.REACT_APP_BASE_URL;

// const fetchVideos = async (item) => {
//   const url = `${baseUrl}/search?part=snippet&key=${apiKey}&maxResults=20&q=${item}&type=video&safeSearch=strict`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data.items;
//   // console.log('fetch item:', item);
//   // console.log('fetch type:', type);
//   // return mockData.items;
// };

// const fetchRelatedVideos = async (id) => {
//   const url = `${baseUrl}/search?part=snippet&key=${apiKey}&maxResults=20&relatedToVideoId=${id}&type=video&safeSearch=strict`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data.items;
//   // console.log('fetch related id:', id);
//   // console.log('fetch type:', type);
//   // return mockData.items;
// };

// export { fetchVideos, fetchRelatedVideos };
