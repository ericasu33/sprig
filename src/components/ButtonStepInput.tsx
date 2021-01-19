import React from 'react';
import classNames from 'classnames';

const ButtonStepInput = (props: any) => {
  let buttonType = classNames('fa', {
    'fa-plus-square': props.plus,
    'fa-minus-square': props.minus,
  });

  const direction: number = (props.minus && -1) || (props.plus && 1)

  return (
    <>
      <i className={buttonType} onClick={e => props.onClick(direction)}></i>
    </>
  );
};

export default ButtonStepInput;
