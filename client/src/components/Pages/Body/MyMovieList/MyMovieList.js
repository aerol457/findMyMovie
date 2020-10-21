import React, {Component} from 'react';

import AddList from './AddList/AddList';
import Spinner from '../../../Core/Spinner/Spinner';
class MyMoviesList extends Component{

  state = {
    movies: {
      comedy: [],
      action: [],
      horror: []
    },
    movieListEmpty: false,
    loading: false
  }

  componentDidMount(){
    this.setState({loading: true});
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');
    fetch('http://localhost:8080/account/ ' + idUser,{
      headers: {
        "Authorization": token 
      }
    })
    .then(resData => {
      if(!resData.status === 200 || !resData.status === 201){
        throw new Error('There was an error from server.');
      }
      
      if(resData.status === 404){
        this.setState({loading: false});
        throw new Error('Must added movies before try to fetch them');
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

  removeMovieFromAccountList = (id, category) => {
    this.setState({loading: true});
    const idUser = localStorage.getItem('idUser');
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/account/remove-movie?idUser= ' + idUser + '&idMovie='+ id,{
      method: 'DELETE',
      headers: {
        "Authorization": token, 
      }
    })
    .then(resData => {
      if(!resData.status === 200 || !resData.status === 201){
        throw new Error('There was an error from server.');
      }
      
      if(resData.status === 404){
        this.setState({loading: false});
        throw new Error('Must added movies before try to fetch them');
      }
      const updateMoviesList = this.state.movies[category].filter(c => c.id !== id);
      this.setState({ movies: {
        ...this.state.movies,
        [category]: updateMoviesList
      }, loading: false});
    })
    .catch(err => {
      this.setState({loading: false});
      console.log(err);
    })

  }

  render(){
    let quantityOfMovies = 0;
    quantityOfMovies += this.state.movies.comedy.length;
    quantityOfMovies += this.state.movies.action.length;
    quantityOfMovies += this.state.movies.horror.length;

    let content = <Spinner/>;
    if(!this.state.loading){
      content = (<div>
        {quantityOfMovies !== 0 ? (<div>
          {this.state.movies.comedy.length !== 0 ? <AddList title='Comedy' sign='-' removeMovie={(id) => this.removeMovieFromAccountList(id,'comedy')} movieList={this.state.movies.comedy}/> : null}
          {this.state.movies.action.length !== 0 ? <AddList title='Action' sign='-' removeMovie={(id) => this.removeMovieFromAccountList(id,'action')} movieList={this.state.movies.action}/> : null}
          {this.state.movies.horror.length !== 0 ? <AddList title='Horror' sign='-' removeMovie={(id) => this.removeMovieFromAccountList(id,'horror')} movieList={this.state.movies.horror}/> : null}
        </div>) : <h2>Your list movie is empty, Start adding movies.</h2>}
        </div>);
    }
    return (
      <div>
          <div>
            <button>ADD</button>
            <input placeholder='Category Name..'/>
          </div>
          {content}
      </div>
    );
  }
}

export default MyMoviesList;