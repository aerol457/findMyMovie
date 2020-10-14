import React from "react";

import "./Button.css";

const Button = (props) => {
  return (
    <button disabled={!props.disable} onClick={props.clicked} className={props.btnType}>
      {props.children}
    </button>
  );
};

export default Button;
