import { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { fetchPhotos } from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ImageModal from './ImageModal/ImageModal';
import s from './App.module.css';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';

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
  const [user, setUser] = useState({});

  useEffect(() => {
    // оголошуэмо функцію по запросу фото з серверу
    const getData = async () => {
      // відключаємо useEffect доки не зявиться query
      if (!query) {
        return;
      }
      try {
        setIsLoading(true); //включаємо спінер
        const { results, total_pages, total } = await fetchPhotos(query, page); //запрос на сервер АРІ
        if (!results.length) {
          throw new Error(`Oops! "${query}" - нема таких світлин`); //создаємо error, якщо повернувся пустий об'єкт
        }
        setPhotos(prev => [...prev, ...results]); // добавляємо нові фото для виводу у стейт
        const notify = () =>
          toast(`Знайшли ${total} фото. Зараз ${page} з ${total_pages} стор.`); // формуємо повідомлення про сторінки і фото
        notify(); // виводимо повідомлення

        setTotalPages(total_pages); // записуємо у стейт загальну кількість сторінок
      } catch (error) {
        console.log(error); //виводимо error у консоль
        setIsError(error); //зберігаємо error у стейт
      } finally {
        setIsLoading(false); //виключаємо спінер
      }
    };

    getData(); //запускаємо функцію
  }, [page, query]);

  // Новий query і обнуляємо стейт
  const handleSetQuery = query => {
    setQuery(query);
    setPhotos([]);
    setPage(1);
    setIsError(null);
    setTotalPages(0);
    setUser({});
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = (url, alt, user) => {
    setShowModal(true);
    setAlt(alt);
    setModalUrl(url);
    setUser(user);
    console.log('user: ', user);
  };

  const closeModal = () => {
    setShowModal(false);
    setAlt('');
    setModalUrl('');
  };

  return (
    <div className={s.container}>
      <SearchBar onSubmit={handleSetQuery} />
      {isError && <ErrorMessage>{isError.message}</ErrorMessage>}
      {photos && <ImageGallery photos={photos} openModal={openModal} />}

      {isLoading && <Loader />}
      {totalPages > page && !isLoading && (
        <LoadMoreBtn onClick={loadMore} disabled={isLoading}>
          Load more
        </LoadMoreBtn>
      )}
      <ImageModal
        modalIsOpen={showModal}
        closeModal={closeModal}
        src={modalUrl}
        alt={alt}
        author={user.name}
        likes={user.total_likes}
      />
      <Toaster
        containerStyle={{
          top: 70,
          left: 20,
        }}
      />
    </div>
  );
};

export default App;

//https://api.unsplash.com/photos/?client_id=lFXn5av5ZsDCXi6o_mc9WHabuxYqEBNtnJrnxqLED2o
