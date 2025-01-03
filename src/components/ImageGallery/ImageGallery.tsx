import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';
import { Image } from '../App';

interface ImageGalleryProps {
  images: Image[];
  handleImageClick: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  handleImageClick,
}) => {
  return (
    <ul className={s.galleryList}>
      {images.map(image => (
        <li className={s.liItem} key={image.id}>
          <ImageCard image={image} handleImageClick={handleImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
