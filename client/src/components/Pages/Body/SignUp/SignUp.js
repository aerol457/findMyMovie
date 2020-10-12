import React, {Component} from 'react';

import Form from '../../../Core/Form/Form';

const list = [
 { key:'name', title: 'Your Name..', type: 'text', value: ''},
 { key:'email',title: 'Your Email..', type: 'email', value: ''},
 { key:'password',title: 'Your Password..', type: 'password', value: ''},
 { key:'confirmPassword', title: 'Your Confirm Password..', type:'password', value: ''},
]

class SignUp extends Component{

  state = {
    formData: {}
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

  signUpHandler = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/auth/sign-up',{
      method: 'post',
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
    .then(res => {
      //Is Logged In?
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render(){
    return (
      <div>
        <Form submitted={(event) => this.signUpHandler(event)} 
        changed={this.inputOnChangeHandler} 
        inputQuantity={list}
        stateProps= {this.state.formData}/>
      </div>
    );
  }
}

export default SignUp;