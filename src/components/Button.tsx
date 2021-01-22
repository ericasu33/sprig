import React from 'react';
import classNames from 'classnames';
import './Button.scss';

const Button = (props: any) => {
  let buttonClass = classNames('button', {
    'button--play':           props.play,
    'button--save':           props.save,
    'button--clone':          props.clone,
    'button--delete':         props.delete,
    'button--pause':          props.pause,
    'button--expand':         props.expand,
    'button--colour_picker':  props.colourPicker,
    'button--calendar':       props.calendar,
    'button--increment':      props.increment,
    'button--decrement':      props.decrement,
  });

  let icon = classNames('', {
    'far fa-play-circle':     props.play,
    'far fa-save':            props.save,
    'far fa-clone':           props.clone,
    'far fa-trash-alt':       props.delete,
    'far fa-pause-circle':    props.pause,
    'close':                  props.expand,
    'fas fa-palette':         props.colourPicker,
    'far fa-calendar-alt':    props.calendar,
    'fas fa-angle-up':        props.increment,
    'fas fa-angle-down':       props.decrement,
  });  

  return (
    <button type="button" disabled={props.disabled} className={buttonClass} onClick={props.onClick}>
      {props.children}
      <i className={icon}></i>
    </button>
  );
};

export default Button;
