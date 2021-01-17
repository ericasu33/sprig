import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Tag from './Tag';

import './TagList.scss';

interface tag {
  [key: string]: any;
}

const TagList = (props: any) => {

  const [tags, setTags] = useState<tag[]>([]);

  let tagListClass = classNames("tag-list");


  useEffect(() => {
    setTags([
      { id: 1, name: "test1", color: "#770000", },
      { id: 2, name: "test2", color: "#FFFFFF", },
      { id: 3, name: "test3", color: "#FFFFFF", },
    ]);
  }, []);
  
  const removeTag = (id: number) => {
    setTags((prev: any) => {
      return prev.filter((tag: tag) => tag.id !== id);
    });
  };

  const tagList = tags.map((tag) => {
    return (<Tag
      key={tag.id}
      name={tag.name}
      color={tag.color}
      onRemove={() => removeTag(tag.id)} 
    />)
  });
  
  return (
    <div className={tagListClass}>
      {tagList}
    </div>
  );
};

export default TagList;