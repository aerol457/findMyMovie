import React, { Component } from "react";

import "./TopPicks.css";

import MovieList from "./MovieList/MovieList";
import Spinner from '../../../Core/Spinner/Spinner'; 

class MoviesList extends Component {
  
  state = {
    movies: {
        comedy: [],
        action: [],
        horror: []
      },
    loading: false
    }
  

  componentDidMount(){
    this.setState({loading: true});
    fetch('http://localhost:8080/movies',{
      method: 'GET',
      headers: {
        "content-Type": "application/json"
      }
    })
    .then(resData => {
      if(!resData.status === 200 || !resData.status === 201){
        throw new Error('There was an error from server.');
      }
      
      if(resData.status === 404){
        this.setState({loading: false});
        console.log('Must added movies before try to fetch them');
        return this.props.history.push('/login');
      }

      return resData.json();
    })
    .then(dataMovies => {
      for(let movie of dataMovies.data){
        console.log(movie.category)
          this.setState({
            ...this.state,
            movies: {
              ...this.state.movies,
              [movie.category]: [
                ...this.state.movies[movie.category],
                movie
              ]
            }
          })
        }
      this.setState({loading: false});  
    })
    .catch(err => {
      this.setState({loading: false});
      console.log(err);
    })
  }

  addMovieToUserPersonalList = (idMovie) => {
    const idUser = localStorage.getItem('idUser');
    const token = localStorage.getItem('token');
    fetch('url', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
        "Authoriztion": token
      },
      body: JSON.stringify({
        idUser: idUser,
        idMovie: idMovie
      })
    })
    .then(resData => {
      console.log(resData);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    let allCategories = <Spinner/>;
    if(!this.state.loading){
      allCategories = (
      <React.Fragment>
          <div className="movies-list-category">
          <div className="movies-list-header">Comedy</div>
          <ul className="movies-list-list">
            <MovieList clicked={(id) => this.addMovieToUserPersonalList(id)} movieList={this.state.movies.comedy} />
          </ul>
          </div>
          
          <div className="movies-list-category">
            <div className="movies-list-header">Action</div>
            <ul className="movies-list-list">
              <MovieList clicked={(id) => this.addMovieToUserPersonalList(id)} movieList={this.state.movies.action} />
            </ul>
          </div>

          <div className="movies-list-category">
          <div className="movies-list-header">Horror</div>
          <ul className="movies-list-list">
            <MovieList clicked={(id) => this.addMovieToUserPersonalList(id)} movieList={this.state.movies.horror} />
          </ul>
         </div>
      </React.Fragment>
      );
    }
    return (
      <div className="movies-list">{allCategories}</div>
    );
  }
}

export default MoviesList;
