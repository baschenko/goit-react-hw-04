import { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { fetchPhotos } from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import { InfinitySpin } from 'react-loader-spinner';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchPhotos(query, 20);
        setPhotos(response.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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
      {isLoading && (
        <InfinitySpin
          visible={true}
          width="200"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      )}
    </div>
  );
};

export default App;

//https://api.unsplash.com/photos/?client_id=lFXn5av5ZsDCXi6o_mc9WHabuxYqEBNtnJrnxqLED2o
