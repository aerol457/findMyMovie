import React from 'react';

import './Modal.css';

const modal = (props) => {
  return (
    <div className='modal'>
     <div className='model-content'>
        <div className='content-top'>
          <img src={props.movieData.imageUrl} alt='Movie Image'/>
          <div className='content-top-header'>
            <h1>{props.movieData.title}</h1>
            <h4>Rate: {props.movieData.rate}</h4>
          </div>
        </div>
        <div  className='content-bottom'>
          <h5>Description:</h5>
          <p>{props.movieData.description}</p>
        </div>
      <div className='content-controls'>
          <button className='content-controls-gray' onClick={props.cancelModal}>Cancel</button>
          <button className='content-controls-red' onClick={() => props.submitModal(props.movieData.id)}>+Add</button>
      </div>
     </div>
    </div>
  );
};

export default modal;