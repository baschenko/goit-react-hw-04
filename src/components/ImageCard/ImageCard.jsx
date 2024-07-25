import s from './ImageCard.module.css';

const ImageCard = ({ urlImg, title, color, openModal, user }) => {
  return (
    <div
      className={s.thumb}
      style={{ backgroundColor: color, borderColor: color }}
    >
      <img
        src={urlImg.small}
        alt={title}
        onClick={() => {
          openModal(urlImg.regular, title, user);
        }}
      />
    </div>
  );
};

export default ImageCard;
