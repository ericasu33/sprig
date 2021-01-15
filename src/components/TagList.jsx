import React from 'react';
import classNames from 'classnames';

import Tag from './Tag';

import './TagList.scss';

const TagList = (props) => {

  let tagListClass = classNames("tag-list");

  const tags = props.tags.map((opts) => (
    <Tag 
      key={opts.id}
      name={opts.name}
      color={opts.color}
    />
  ));
  
  return (
    <div className={tagListClass}>
      {tags}
    </div>
  );
};

export default TagList;