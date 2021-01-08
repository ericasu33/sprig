import React from 'react';
import classNames from 'classnames';
import './Tag.scss';

const Tag = (props) => {
  const style = {
    backgroundColor: props.color,
  };
  let tagClass = classNames("tag");
  return (
    <div className={tagClass} style={style}>
      {props.name}
    </div>
  );
};

export default Tag;