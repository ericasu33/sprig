import React from 'react';
import classNames from 'classnames';
import './Button.scss';

const Button = (props: any) => {
  let buttonClass = classNames('button', {
    'button--play': props.play,
    'button--stop': props.stop,
    'button--clone': props.clone,
    'button--delete': props.delete,
    'button--pause': props.pause,
    'button--close': props.close,
    'button--category_create': props.category_create,
    'button--category_colour': props.category_colour
 });
  return (
    <button type="button" disabled={props.disabled} className={buttonClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
