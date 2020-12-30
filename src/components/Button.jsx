import React from 'react';
import classNames from 'classnames';

const Button = (props) => {
  let buttonClass = classNames('button', {
    'button--confirm': props.confirm,
    'button--danger': props.danger,
 });
  return (
    <button disabled={props.disabled} className={buttonClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;