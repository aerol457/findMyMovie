import React from 'react';

import './AddList.css';
import MovieList from '../../TopPicks/MovieList/MovieList';

const addList = (props) => {
  return (
    <div className="movies-list">
        <div className="movies-list-header">{props.title}</div>
        <ul className="movies-list-list">
          <MovieList onviewDetailsMovie={props.clickedToViewDetails} actionSign={props.sign} clicked={props.removeMovie} movieList={props.movieList} />
        </ul>
      </div>
  );
};

export default addList;