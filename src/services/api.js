import axios from 'axios';

export const fetchPhotos = async (query, page = 1, perPage = 5) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      client_id: 'lFXn5av5ZsDCXi6o_mc9WHabuxYqEBNtnJrnxqLED2o',
      query: query,
      per_page: perPage,
      page: page,
    },
  });
  return response.data;
};
