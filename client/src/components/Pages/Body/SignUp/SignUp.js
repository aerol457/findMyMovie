import React, {Component} from 'react';

import './SignUp.css';

import Input from '../../../Core/Input/Input';
import Button from '../../../Core/Button/Button';
import Spinner from '../../../Core/Spinner/Spinner';
import {email, length, required} from '../../../utils/Data/validator';

class SignUp extends Component{

  state = {
    formData: {
      name: { 
        title: 'Your Name..',
        type: 'text', 
        value: '', 
        validators: [required, length({min: 3})], 
        isValid: false},
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
      confirmPassword:{ 
        title: 'Your Confirm Password..', 
        type:'password', 
        value: '', 
        validators: [required], 
        isValid: false}
    },
    loading: false,
    formIsValid: false
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

  signUpHandler = () => {
    this.setState({loading: true});
    fetch('http://localhost:8080/auth/sign-up',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.formData.name.value,
        email: this.state.formData.email.value,
        password: this.state.formData.password.value,
        confirmPassword: this.state.formData.confirmPassword.value
      })
    })
    .then(resData => {
      if(resData.status === 200 || resData.status === 201){
        this.props.history.push('/login');
      }
      this.setState({loading: false});
    })
    .catch(err => {
      this.setState({loading: false});
      console.log(err);
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
    form = (<form onSubmit={this.signUpHandler} className='form'>
              <div className='form-input'>
                {inputList}
              </div>
              <Button type='submit' 
                      disable={this.state.formIsValid} 
                      btnType='outline-red'>Submit</Button>
            </form>);
    }
    return (
      <div>
        {form}
      </div>
    );
  }
}

export default SignUp;