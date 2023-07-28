import React from 'react';
import css from '../index.module.css';

const SearchForm = ({ handleSubmit }) => {
  return (
    <div>
      <form className={css.search_form} onSubmit={handleSubmit}>
        <label htmlFor="search"></label>
        <input type="text" name="search" required></input>
        <button className={css.search_btm} tepe="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
