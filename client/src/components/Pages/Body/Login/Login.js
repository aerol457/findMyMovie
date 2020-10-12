import React, {Component} from 'react';

import './Login.css';

import Form from '../../../Core/Form/Form';

const list = [
  { title: 'Your Email..'},
  { title: 'Your Password..'}
 ]

class Login extends Component{

  render(){
    return (
      <div>
        <Form inputQuantity={list}/>
      </div>
    );
  }
}

export default Login;