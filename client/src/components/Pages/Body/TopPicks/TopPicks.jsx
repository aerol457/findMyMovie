import React, { Component } from "react";

import "./TopPicks.css";

import AddList from '../MyMovieList/AddList/AddList';
import Spinner from '../../../Core/Spinner/Spinner'; 
import Backdrop from '../../../Core/Backdrop/Backdrop'; 
import Modal from '../../../Core/Modal/Modal'; 

class MoviesList extends Component {
  
  state = {
    movies: {
        comedy: [],
        action: [],
        horror: []
      },
    loading: false,
    movieDetails: {},
    viewDetailsMode: false
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
    this.setState({loading: true});
    const idUser = localStorage.getItem('idUser');
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/account/add-movie', {
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
      if(!resData.status === 200 || !resData.status === 201){
        throw new Error('There was an error from server.');
      }
      
      if(resData.status === 404){
        this.setState({loading: false});
        console.log('Must added movies before try to fetch them');
        return this.props.history.push('/login');
      }
      if(this.state.viewDetailsMode){
        this.setState({viewDetailsMode: false});
      }
      this.setState({loading: false});
    })
    .catch(err => {
      this.setState({loading: false});
      console.log(err);
    })
  }

  onviewDetailsMovie = (idMovie) => {
    fetch('http://localhost:8080/ ' + idMovie, {
      method: 'GET',
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(resData => {
      if(!resData.status === 200 || !resData.status === 201){
        throw new Error('There was an error from server.');
      }
      
      if(resData.status === 404){
        this.setState({loading: false});
        console.log('Must added movies before try to fetch them');
        return;
      }
      
      return resData.json();
    })
    .then(resData => {
      this.setState({viewDetailsMode: true, 
                     movieDetails: resData.data,
                     loading: false});
    })
    .catch(err => {
      this.setState({loading: false});
      console.log(err);
    })
  }

  onCancelViewDetailsMovieHandler = () => {
    this.setState({viewDetailsMode: false});
  }

  render() {
    let allCategories = <Spinner/>;
    if(!this.state.loading){
      allCategories = (
      <React.Fragment>
        <AddList title='Comedy' 
                 sign='+' 
                 removeMovie={(id) => this.addMovieToUserPersonalList(id)} 
                 movieList={this.state.movies.comedy}
                 clickedToViewDetails={(id) => this.onviewDetailsMovie(id)}/>
        <AddList title='Action' 
                 sign='+' 
                 removeMovie={(id) => this.addMovieToUserPersonalList(id)} 
                 movieList={this.state.movies.action}
                 clickedToViewDetails={(id) => this.onviewDetailsMovie(id)}/>
        <AddList title='Horror' 
                 sign='+' 
                 removeMovie={(id) => this.addMovieToUserPersonalList(id)} 
                 movieList={this.state.movies.horror}
                 clickedToViewDetails={(id) => this.onviewDetailsMovie(id)}/>
                 </React.Fragment>
      );
    }
    return (
      <div className="movies-list">
     {this.state.viewDetailsMode ? 
      (<div><Modal movieData={this.state.movieDetails} submitModal={(id) => this.addMovieToUserPersonalList(id)} cancelModal={this.onCancelViewDetailsMovieHandler}/> 
      <Backdrop /></div>) : null}
      {allCategories}
      </div>
    );
  }
}

export default MoviesList;
