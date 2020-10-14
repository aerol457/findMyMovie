import React, {Component} from 'react';

import Form from '../../../Core/Form/Form';
import Spinner from '../../../Core/Spinner/Spinner';
import {email, length, required} from '../../../utils/Data/validator';

const list = [
 { key:'name', title: 'Your Name..', type: 'text', value: '', validators: [required, length({min: 3})], isValid: false},
 { key:'email',title: 'Your Email..', type: 'email', value: '', validators: [email, required], isValid: false},
 { key:'password',title: 'Your Password..', type: 'password', value: '', validators: [required, length({min:6, max:16})], isValid: false},
 { key:'confirmPassword', title: 'Your Confirm Password..', type:'password', value: '', validators: [required], isValid: false}
]

class SignUp extends Component{

  state = {
    formData: {},
    loading: false,
    formIsValid: false
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

  inputOnChangeHandler = (event, inputIdentifier,index) => {
    const updateState = {...this.state.formData};
    const value = event.target.value;
    let isValid = true;
    for(let validator of list[index].validators){
      isValid = isValid && validator(value);
    }    
    list[index].isValid = isValid;
    updateState[inputIdentifier] = value;

    let formIsValid = true;
    for(let input of list){
      formIsValid = formIsValid && input.isValid;
    }
    
    this.setState({formData: updateState, formIsValid: formIsValid});
  }

  signUpHandler = () => {
    this.setState({loading: true});
    fetch('http://localhost:8080/auth/sign-up',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.formData.name,
        email: this.state.formData.email,
        password: this.state.formData.password,
        confirmPassword: this.state.formData.confirmPassword
      })
    })
    .then(resData => {
      if(resData.status === 200 || resData.status === 201){
        // this.props.history.push('/login');
      }
      this.setState({loading: false});
    })
    .catch(err => {
      this.setState({loading: false});
      console.log(err);
    })
  }

  render(){
    let form = <Spinner/>;
    if(!this.state.loading){
      form = (
        <Form submitted={this.signUpHandler} 
        changed={this.inputOnChangeHandler} 
        inputQuantity={list}
        stateProps= {this.state.formData}
        disable= {this.state.formIsValid}/>
      );
    }
    return (
      <div>
        {form}
      </div>
    );
  }
}

export default SignUp;