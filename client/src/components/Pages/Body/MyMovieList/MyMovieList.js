import React, {Component} from 'react';

import AddList from './AddList/AddList';

class MyMoviesList extends Component{

  

  render(){
    return (
      <div>
        <AddList /> 
        <AddList /> 
        <AddList /> 
      </div>
    );
  }
}

export default MyMoviesList;