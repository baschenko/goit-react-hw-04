import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

const ImageGallery = ({ photos, openModal }) => {
  return (
    <div>
      <ul className={s.list}>
        {/* Набір елементів списку із зображеннями */}
        {photos.map(({ id, urls, alt_description, color }) => {
          return (
            <li key={id} className={s.item}>
              <ImageCard
                urlImg={urls}
                title={alt_description}
                color={color}
                openModal={openModal}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageGallery;
