import React, {Component} from 'react';

import './Login.css';

import Input from '../../../Core/Input/Input';
import Button from '../../../Core/Button/Button';
import Spinner from '../../../Core/Spinner/Spinner';
import {email, length, required} from '../../../utils/Data/validator';

class Login extends Component{

  state = {
    formData: {
      email:{
        title: 'Your Email..', 
        type: 'email', 
        value: '', 
        validators: [email, required], 
        isValid: false},
      password:{
        title: 'Your Password..', 
        type: 'password', 
        value: '', 
        validators: [required, length({min:6, max:16})], 
        isValid: false},
    },
    loading: false,
    formIsValid: false,
    error: null,
  }

  inputOnChangeHandler = (event, inputIdentifier) => {
    let value = event.target.value;
    
    let isValid = true;
    for (const validator of this.state.formData[inputIdentifier].validators) {
      isValid = isValid && validator(value);
    }
    const updatedForm = {
      ...this.state.formData,
      [inputIdentifier]: {
        ...this.state.formData[inputIdentifier],
        isValid: isValid,
        value: value,
      },
    };

    let formIsValid = true;
    for (const inputName in updatedForm) {
      formIsValid = formIsValid && updatedForm[inputName].isValid;
    }
    
    this.setState({
        formData: updatedForm,
        formIsValid: formIsValid,
    });
  }

  loginHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    fetch('http://localhost:8080/auth/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.formData.email.value,
        password: this.state.formData.password.value,
      })
    })
    .then(resData => {
      if (resData.status === 422) {
        throw new Error("Validation failed.");
      }
      
      if(resData.status !== 200 && resData.status !== 201){
        throw new Error('Failed Authentication');
      }
      return resData.json();
    })
    .then(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('idUser', data.idUser);
      const remainingMilliseconds = 24 * 60 * 60 * 1000;// 1 Day
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      this.props.onLogin(remainingMilliseconds);     
      window.location.replace('/');
    })
    .catch(err => {
      this.setState({error: err, loading: false});
    })
  }

  render(){
    const newFormData = Object.keys(this.state.formData).map(key => {
      return { id: key, config: this.state.formData[key]};
    })
  
    const inputList = newFormData.map((inputDetails,index) => {
      return <Input key={index} 
                    inputType='input-white' 
                    changed={(event) => this.inputOnChangeHandler(event,inputDetails.id)} 
                    value={inputDetails.config.value} 
                    type={inputDetails.config.type} 
                    placeHolder={inputDetails.config.title} />
    })

    let form = <Spinner/>;
    if(!this.state.loading){
    form = (<form onSubmit={(event) => this.loginHandler(event)} className='form'>
              <div className='form-input'>
                {inputList}
              </div>
              <Button type='submit' 
                      disable={this.state.formIsValid} 
                      btnType='outline-red'>Submit</Button>
            </form>);
    }
    return (
      <div className='form-login'>
      {form}
      </div>
    );
  }
}

export default Login;