import React from "react";

import "./MovieList.css";

const moviesList = (props) => {
  return props.movieList.map((movie) => {
    return (
      <li className="movie-list">
        <div className="movie-list-content">
          <div className="movie-list-content-title">The Boys</div>
          <div className="movie-list-content-rate">8.4/10</div>
          <div className="movie-list-content-description">
            A group of vigilantes A group of vigilantesA group of vigilantesA
            group of vigilantesA group of vigilantesA group of vigilantesA group
            of vigilantes
          </div>
        </div>
      </li>
    );
  });
};

export default moviesList;
