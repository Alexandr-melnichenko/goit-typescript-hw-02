import s from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  moreBtnClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ moreBtnClick }) => {
  return (
    <div>
      <button className={s.loadMoreBtn} onClick={moreBtnClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
