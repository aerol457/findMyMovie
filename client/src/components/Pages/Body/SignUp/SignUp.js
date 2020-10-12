import React, {Component} from 'react';

import Form from '../../../Core/Form/Form';

const list = [
 { title: 'Your Name..'},
 { title: 'Your Email..'},
 { title: 'Your Password..'},
 { title: 'Your Confirm Password..'},
]

class SignUp extends Component{

  render(){
    return (
      <div>
        <Form inputQuantity={list}/>
      </div>
    );
  }
}

export default SignUp;