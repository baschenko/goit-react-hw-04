const ImageCard = ({ urlImg, title }) => {
  return (
    <div>
      <img src={urlImg} alt={title} />
    </div>
  );
};

export default ImageCard;
