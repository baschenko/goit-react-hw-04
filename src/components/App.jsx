import { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { fetchPhotos } from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchPhotos(query, 20);
        setPhotos(response.results);
      } catch (error) {
        console.log(error);
        setIsError(true);
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
      {isLoading && <Loader />}
      {isError && <h2>Something went wrong! Try again...</h2>}
    </div>
  );
};

export default App;

//https://api.unsplash.com/photos/?client_id=lFXn5av5ZsDCXi6o_mc9WHabuxYqEBNtnJrnxqLED2o
