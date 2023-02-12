import { useRef, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  filterSelector,
  setSearchValue,
} from "../Redux/slices/filterAndSearchSlice";

import styles from "../SCSS/modules/Search.module.scss";

const Search = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector(filterSelector);
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const clearAndFocus = () => {
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  };
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchValue(event.target.value));

  return (
    <>
      {location.pathname === "/" && (
        <div className={styles.root}>
          <svg
            className={styles.icon}
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            value={searchValue}
            onChange={onChangeInput}
            className={styles.input}
            placeholder="Поиск пицц.."
          />
          {searchValue && (
            <svg
              className={styles.clearIcon}
              onClick={clearAndFocus}
              version="1.1"
              viewBox="0 0 24 24"
            >
              <g id="grid_system" />
              <g id="_icons">
                <path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z" />
              </g>
            </svg>
          )}
        </div>
      )}
    </>
  );
};
export default Search;
