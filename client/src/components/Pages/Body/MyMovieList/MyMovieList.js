import React, {Component} from 'react';

import AddList from './AddList/AddList';

class MyMoviesList extends Component{

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
      console.log(this.state.movies)
      this.setState({loading: false});  
    })
    .catch(err => {
      this.setState({loading: false});
      console.log(err);
    })
  }

  render(){
    return (
      <div>
          <div>
            <button>ADD</button>
            <input placeholder='Category Name..'/>
          </div>
          <div>
          {/*Try to check if is null or not */}
            {this.state.movies.comedy.isLength >= 0 ? <AddList title='Comedy' movieList={this.state.movies.comedy}/> : null}
            {this.state.movies.action.isLength >= 0 ? <AddList title='Action' movieList={this.state.movies.action}/> : null}
            {this.state.movies.horror.isLength >= 0 ? <AddList title='Horror' movieList={this.state.movies.horror}/> : null}
          </div>
      </div>
    );
  }
}

export default MyMoviesList;