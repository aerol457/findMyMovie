import React from 'react';

import './ListRecent.css';

const listRecent = (props) => {
  const recents = props.recentMovies.map((recent,index) => {
    return <li className='recent-list-item' key={index}>
      <div className='recent-list-header' onClick={() => props.clickedToViewDetails(recent.id)}>
      {recent.title} 
      <span className='category'> ({recent.category.charAt(0).toUpperCase() + recent.category.slice(1)})</span> 
      </div>
       <span className='recent-list-item-delete' onClick={() => props.removeRecent(recent.recents[0].id)}>X</span>
      </li>
  })

  return <ul className='recent-list'>{recents}</ul>
};

export default listRecent;