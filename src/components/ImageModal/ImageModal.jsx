import Modal from 'react-modal';
import { SlLike } from 'react-icons/sl';
import s from './ImageModal.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: { backgroundColor: 'rgba(0,0,0,0.6)' },
};

Modal.setAppElement('#root');

const ImageModal = ({ modalIsOpen, closeModal, src, alt, author, likes }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2>{alt}</h2>
      <img src={src} alt={alt} />
      <div className={s.description}>
        <p>
          <b>Auth:</b> {author}
        </p>
        <p>
          <SlLike />
          <b> {likes}</b>
        </p>
      </div>
    </Modal>
  );
};

export default ImageModal;
