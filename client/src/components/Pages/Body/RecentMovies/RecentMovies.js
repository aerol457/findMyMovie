import React, {Component} from 'react';

import ListRecent from './ListRecent/ListRecent';
import Modal from '../../../Core/Modal/Modal';
import Backdrop from '../../../Core/Backdrop/Backdrop';
import Spinner from '../../../Core/Spinner/Spinner';

class RecentMovies extends Component{

  state = {
    recentMovies: [], 
    loading: false,
    emptyRecent: false,
    viewDetailsMode: false,
    movieDetails: {}
  }

  componentDidMount(){
    this.setState({loading: true});
    const idUser = localStorage.getItem('idUser');
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/recent/ ' + idUser,{
      headers: {
        Authorization: token
      }
    })
    .then(resData => {
      if(!resData.status === 200 || !resData.status === 201){
        throw new Error('There was an error from server.');
      }
      
      if(resData.status === 404){
        console.log('Empty Recents');
        this.setState({emptyRecent: true, loading: false});
        return; 
      }
      return resData.json();
    })
    .then(recents => {
      this.setState({recentMovies: recents.data, loading: false});
    })
    .catch(err => {
      this.setState({loading: false});
      console.log(err);
    })
  }

  removeRecentHandler = (idRecent) => {
    this.setState({loading: true});
    const idUser = localStorage.getItem('idUser');
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/recent/delete-recent/ ' + idRecent,{
      method: 'DELETE',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idUser: idUser
      })
    })
    .then(resData => {
      if(!resData.status === 200 || !resData.status === 201){
        throw new Error('There was an error from server.');
      }
      
      if(resData.status === 404){
        console.log('Empty Recents');
        this.setState({emptyRecent: true, loading: false});
        return; 
      }
      return resData.json();
    })
    .then(recents => {
      const updatedList = this.state.recentMovies.filter(recent => recent.recents[0].id !== idRecent);
      this.setState({recentMovies: updatedList, loading: false});
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
  render(){
    return (
      <div>
        {this.state.viewDetailsMode ? 
        (<div><Modal movieData={this.state.movieDetails} submitModal={() => {}} cancelModal={this.onCancelViewDetailsMovieHandler} titleSubmit='Watch'/> 
        <Backdrop clicked={this.onCancelViewDetailsMovieHandler} show={this.state.viewDetailsMode}/>
        </div>) : null}
        {!this.state.loading ? <ListRecent clickedToViewDetails={(id) => this.onviewDetailsMovie(id)} removeRecent={(id) => this.removeRecentHandler(id)} recentMovies={this.state.recentMovies}/> : <Spinner/>}
      </div>
    );
  }
}

export default RecentMovies;