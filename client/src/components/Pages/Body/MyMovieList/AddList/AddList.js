import React from 'react';

import './AddList.css';
import MovieList from '../../TopPicks/MovieList/MovieList';

const movieList = [];

const addList = (props) => {
  return (
    <div className="movies-list">
        <div className="movies-list-header">Comedy</div>
        <ul className="movies-list-list">
          <MovieList movieList={movieList} />
        </ul>
      </div>
  );
};

export default addList;