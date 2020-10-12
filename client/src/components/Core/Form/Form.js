import React from 'react';

import './Form.css';

import Input from '../Input/Input';
import Button from '../Button/Button';

const form = (props) => {

  const inputList = props.inputQuantity.map((inputDetails,index) => {
    return <Input key={index} 
                  inputType='input-white' 
                  changed={(event) => props.changed(event,inputDetails.key)} 
                  value={props.stateProps[inputDetails.key]} 
                  type={inputDetails.type} 
                  placeHolder={inputDetails.title} />
  })
  
  return (
    <form onSubmit={props.submitted} className='form'>
      <div className='form-input'>
        {inputList}
      </div>
      <Button btnType='outline-red'>Submit</Button>
    </form>
  );
};

export default form;