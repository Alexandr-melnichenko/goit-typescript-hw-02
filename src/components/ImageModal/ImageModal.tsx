import ReactModal from 'react-modal';
import s from './ImageModal.module.css';

interface ImageModalProps {
  onRequestClose: () => void;
  isOpen: boolean;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  onRequestClose,
  isOpen,
  imageUrl,
}) => {
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className={s.modalContent}
        overlayClassName={s.overlay}
      >
        <div className={s.imageWrapper}>
          <img src={imageUrl} alt="Large view" className={s.modalImage} />
        </div>
      </ReactModal>
    </div>
  );
};

export default ImageModal;
