import React from 'react';
import classNames from 'classnames';
import './Tag.scss';
import Button from './Button';

const Tag = (props: any) => {
  let tagClass = classNames("tag");
  return (
    <div className={tagClass}>
      <span>{props.name}</span>
      <Button
        delete
        onClick={props.onRemove}
      >X</Button>
    </div>
  );
};

export default Tag;