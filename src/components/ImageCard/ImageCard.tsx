import s from './ImageCard.module.css';
import { Image } from '../App';

interface ImageCardProps {
  image: Image;
  handleImageClick: (url: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, handleImageClick }) => {
  return (
    <div>
      <img
        className={s.imageCard}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => handleImageClick(image.urls.regular)}
      />
    </div>
  );
};

export default ImageCard;
