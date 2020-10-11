import React from 'react';

import './ToggleBurger.css'

const toggleBurger = (props) => {
  return (
    <div onClick={props.clicked} className='toggle-burger'>
      <div>-</div>
      <div>-</div>
      <div>-</div>
    </div>
  );
};

export default toggleBurger;