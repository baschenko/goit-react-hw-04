import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ photos }) => {
  return (
    <div>
      <ul>
        {/* Набір елементів списку із зображеннями */}
        {photos.map(photo => {
          return (
            <li key={photo.id}>
              <ImageCard
                urlImg={photo.urls.small}
                title={photo.alt_description}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageGallery;
