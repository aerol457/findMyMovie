import React, { Component } from "react";

import "./TopPicks.css";

import MovieList from "./MovieList/MovieList";

const movieList = ["a", "a", "a", "a", "a"];

class MoviesList extends Component {
  render() {
    return (
      <div className="movies-list">
        <div className="movies-list-header">Top TV picks for Jack</div>
        <ul className="movies-list-list">
          <MovieList movieList={movieList} />
        </ul>
      </div>
    );
  }
}

export default MoviesList;
