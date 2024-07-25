import s from './ImageCard.module.css';

const ImageCard = ({ urlImg, title, color, openModal }) => {
  return (
    <div
      className={s.thumb}
      style={{ backgroundColor: color, borderColor: color }}
    >
      <img
        src={urlImg.small}
        alt={title}
        onClick={() => {
          openModal(urlImg.regular, title);
        }}
      />
    </div>
  );
};

export default ImageCard;
