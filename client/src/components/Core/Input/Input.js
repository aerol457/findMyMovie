import React from 'react';

import './Input.css'

const input = (props) => {
  return (
    <div>
      <input onChange={props.changed} className={props.inputType} value={props.value} type={props.type} placeholder={props.placeHolder}/>
    </div>
  );
};

export default input;