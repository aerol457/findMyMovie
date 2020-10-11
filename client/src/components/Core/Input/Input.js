import React from 'react';

import './Input.css'

const input = (props) => {
  return (
    <div>
      <input className={props.inputType} placeholder={props.placeHolder}/>
    </div>
  );
};

export default input;