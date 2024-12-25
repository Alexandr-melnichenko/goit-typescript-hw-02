import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import toast, { Toaster } from 'react-hot-toast';
import { ProgressBar } from 'react-loader-spinner';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import ReactModal from 'react-modal';
import ErrorMessage from './ErrorMessage/ErrorMessage';

ReactModal.setAppElement('#root');

const API_KEY = 'client_id=eW8eLm1JsOKiPjrboVX295kU55DEdoHMcgKhKIxDCDw';
const BASE_URL = 'https://api.unsplash.com/';

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  useEffect(() => {
    if (query === '') return;
    const fetchImages = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}search/photos?page=${pageNumber}&per_page=12&query=${query}&${API_KEY}`
        );
        setImages(prevImages =>
          pageNumber === 1
            ? response.data.results
            : [...prevImages, ...response.data.results]
        );

        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, pageNumber]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const searchQuery = (
      event.currentTarget.elements.namedItem('search') as HTMLInputElement
    ).value.trim();
    if (!searchQuery) {
      toast('Please fill search input!');
      return;
    }
    setQuery(searchQuery);
    setPageNumber(1);
    setImages([]);
  };

  const handleMoreBtnClick = (): void => {
    setPageNumber(prevPage => prevPage + 1);
  };

  const handleImageClick = (url: string): void => {
    setImageUrl(url);
    openModal();
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <ProgressBar />}
      {images.length === 0 && query !== '' ? (
        <ErrorMessage />
      ) : (
        <ImageGallery images={images} handleImageClick={handleImageClick} />
      )}

      {pageNumber < totalPages && (
        <LoadMoreBtn moreBtnClick={handleMoreBtnClick} />
      )}

      {pageNumber === totalPages && images.length !== 0 && (
        <p>We are sorry, but you have reached the end of search results.</p>
      )}

      <Toaster />
      {isOpen && (
        <ImageModal
          onRequestClose={closeModal}
          isOpen={isOpen}
          imageUrl={imageUrl}
        />
      )}
    </div>
  );
}

export default App;
