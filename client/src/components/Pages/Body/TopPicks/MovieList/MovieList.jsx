import React from "react";

import "./MovieList.css";

const moviesList = (props) => {
  return props.movieList.map((movie) => {
    return (
      <li className="movie-list" key={movie.id}>
        <div className="movie-list-content" onClick={props.onviewDetailsMovie}>
          <div className="movie-list-content-title">{movie.title}</div>
          <div className="movie-list-content-rate">{movie.rate}</div>
          <div className="movie-list-content-description">{movie.description}</div>
        </div>
        
        <button onClick={() => props.clicked(movie.id)} className="movie-list-button-add">{props.actionSign}</button>
      </li>
    );
  });
};

export default moviesList;
