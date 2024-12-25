import s from './ImageCard.module.css';

interface ImageCardProps {
  image: {
    urls: {
      small: string;
      regular: string;
    };
    alt_description: string;
  };
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
