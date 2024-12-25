import style from './SearchBar.module.css';
import { IoIosSearch } from 'react-icons/io';

interface SearchBarProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  return (
    <header className={style.header}>
      <form className={style.searchForm} onSubmit={onSubmit}>
        <input
          className={style.inputSearch}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={style.buttonSearch} type="submit">
          {<IoIosSearch />}
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
