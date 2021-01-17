import React from 'react';
import classNames from 'classnames';
import './Button.scss';

const Button = (props: any) => {
  let buttonClass = classNames('button', {
    'button--play': props.play,
    'button--stop': props.stop,
    'button--duplicate': props.duplicate,
    'button--delete': props.delete,
    'button--pause': props.pause,
    'button--close': props.close,
 });
  return (
    <button type="button" disabled={props.disabled} className={buttonClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
