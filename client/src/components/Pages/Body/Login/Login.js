import React, {Component} from 'react';

import './Login.css';

import Form from '../../../Core/Form/Form';
import Spinner from '../../../Core/Spinner/Spinner';

const list = [
  { key:'email', value: '', title: 'Your Email..', type: 'email'},
  { key:'password', value: '', title: 'Your Password..', type: 'password'}
 ]

class Login extends Component{

  state = {
    formData: {},
    loading: false
  }
  componentDidMount(){
    let stateProps = {};
    for(let getKey in list){
      stateProps[list[getKey].key] = '';
    } 
    this.setState({
      formData: stateProps
    })
  }

  inputOnChangeHandler = (event, inputIdentifier) => {
    const updateState = {...this.state.formData};
    updateState[inputIdentifier] = event.target.value;
    this.setState({formData: updateState});
  }

  loginHandler = () => {
    this.setState({loading: true});
    fetch('http://localhost:8080/auth/login',{
      method: 'post',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.formData.email,
        password: this.state.formData.password,
      })
    })
    .then(res => {
      this.setState({loading: false})
      //Is Logged In?
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render(){

    let form = <Spinner/>;
    if(!this.state.loading){
      form = (
      <Form  
      submitted={this.loginHandler} 
      changed={this.inputOnChangeHandler} 
      inputQuantity={list}
      stateProps= {this.state.formData}/>
      );
    }
    return (
      <div className='form-login'>
      {form}
      </div>
    );
  }
}

export default Login;