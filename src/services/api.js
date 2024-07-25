import axios from 'axios';

const API_KEY = 'Client-ID lFXn5av5ZsDCXi6o_mc9WHabuxYqEBNtnJrnxqLED2o';
axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  per_page: 15,
  orientation: 'landscape',
  order_by: 'latest',
};

export const fetchPhotos = async (query, page = 1) => {
  const { data } = await axios.get(`search/photos?query=${query}&page=${page}`);
  return data;
};
