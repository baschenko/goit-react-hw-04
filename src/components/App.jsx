import { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { fetchPhotos } from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ImageModal from './ImageModal/ImageModal';
import s from './App.module.css';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    const getData = async () => {
      if (!query) {
        return;
      }
      try {
        setIsLoading(true);
        setIsError(false);
        const { results, total_pages } = await fetchPhotos(query, page);
        if (!results.length) {
          return setIsError(true);
        }
        setPhotos(prev => [...prev, ...results]);

        setTotalPages(total_pages);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [page, query]);

  const handleSetQuery = query => {
    setQuery(query);
    setPhotos([]);
    setPage(1);
    setIsError(null);
    setTotalPages(0);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = (url, alt) => {
    setShowModal(true);
    setAlt(alt);
    setModalUrl(url);
  };

  const closeModal = () => {
    setShowModal(false);
    setAlt('');
    setModalUrl('');
  };

  return (
    <div className={s.container}>
      <SearchBar onSubmit={handleSetQuery} />
      {isError && (
        <h2 className={s.header}>Something went wrong! Try again...</h2>
      )}
      {photos && <ImageGallery photos={photos} openModal={openModal} />}

      {isLoading && <Loader />}
      {totalPages > page && !isLoading && (
        <button
          type="button"
          onClick={loadMore}
          disabled={isLoading}
          className={s.btn}
        >
          Load more
        </button>
      )}
      <ImageModal
        modalIsOpen={showModal}
        closeModal={closeModal}
        src={modalUrl}
        alt={alt}
      />
    </div>
  );
};

export default App;

//https://api.unsplash.com/photos/?client_id=lFXn5av5ZsDCXi6o_mc9WHabuxYqEBNtnJrnxqLED2o
