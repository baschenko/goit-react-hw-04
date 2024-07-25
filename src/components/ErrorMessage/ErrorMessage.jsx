import s from './ErrorMessage.module.css';
import errorImage from '../error.jpg';

const ErrorMessage = ({ children }) => {
  return (
    <div className={s.container}>
      <img src={errorImage} width="300" alt="button oops" />
      <h2>{children}</h2>
    </div>
  );
};

export default ErrorMessage;
