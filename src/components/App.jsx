import { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { fetchPhotos } from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchPhotos(query, 20);
        console.log(response.results);
        setPhotos(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    if (query !== '') {
      getData();
    }
  }, [query]);

  return (
    <div>
      <SearchBar onSubmit={setQuery} />
      <ImageGallery photos={photos} />
    </div>
  );
};

export default App;

//https://api.unsplash.com/photos/?client_id=lFXn5av5ZsDCXi6o_mc9WHabuxYqEBNtnJrnxqLED2o
