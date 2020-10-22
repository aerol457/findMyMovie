import React from 'react';

import './Modal.css';

import Button from '../Button/Button';

const modal = (props) => {
  return (
    <div className='modal'>
     <div className='model-content'>
        <div className='content-top'>
          <img src='https://media.istockphoto.com/photos/cosplayer-dressed-as-spiderman-from-marvel-picture-id619272790' alt='image movie'/>
          <div className='content-top-header'>
            <h1>The Great Spiderman</h1>
            <h4>Rate: 10/8</h4>
          </div>
        </div>
        <div  className='content-bottom'>
          <p>Description: text text text text text text text text text text 
          text text text text text text text text text text text text text 
            text text text text text text text text text text text text text 
            text text text text text text text text text text text text text </p>
        </div>
      <div className='content-controls'>
          <button  onClick={props.cancelModal}>Cancel</button>
          <button type='submit' btnType='outline-white'>+Add</button>
      </div>
     </div>
    </div>
  );
};

export default modal;