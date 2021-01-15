import React from 'react';
import classNames from 'classnames';
import './Tag.scss';

const Tag = (props: any) => {
  let tagClass = classNames("tag");
  return (
    <div className={tagClass}>
      {props.name}
    </div>
  );
};

export default Tag;