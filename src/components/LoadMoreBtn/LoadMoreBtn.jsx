import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ children, onClick, disabled }) => {
  return (
    <div className={s.container}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={s.btn}
      >
        {children}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
