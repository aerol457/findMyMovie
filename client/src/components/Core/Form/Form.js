import React from 'react';

import './Form.css';

import Input from '../Input/Input';
import Button from '../Button/Button';

const form = (props) => {
  
  const inputList = props.inputQuantity.map(inputDetails => {
    return <Input inputType='input-white' placeHolder={inputDetails.title} />
  })
  
  return (
    <form onSubmit={() => {}} className='form'>
      <div className='form-input'>
        {inputList}
      </div>
      <Button btnType='outline-red'>Submit</Button>
    </form>
  );
};

export default form;