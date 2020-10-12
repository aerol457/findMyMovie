import React, {Component} from 'react';

import './Login.css';

import Form from '../../../Core/Form/Form';

const list = [
  { title: 'Your Email..', type: 'email'},
  { title: 'Your Password..', type: 'password'}
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