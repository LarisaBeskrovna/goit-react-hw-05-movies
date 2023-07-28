import { BallTriangle } from 'react-loader-spinner';
import css from '../index.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <BallTriangle
        height={80}
        width={80}
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
        color="chartreuse"
      />
    </div>
  );
};
export default Loader;
