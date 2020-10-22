import React, {Component} from 'react';

import './Form.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import {email, length, required} from '../../utils/Data/validator';

class Form extends Component{
  state = {
    formData: {
      name: { 
        title: 'Your Title..',
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
  }
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
    
    return (
      <React.Fragment>
        <div className='form'> 
          <form onSubmit={this.props.formSubmitted}>
            {inputList}
            <Button clicked= {this.props.formCanelled}>Cancel</Button>
            <Button>Success</Button>
          </form>
        </div>
      </React.Fragment>
      );
    };
  }
    
    export default Form;