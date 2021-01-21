import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import './Tags.scss'

interface Tag {
  id: number | null,
  name: string,
  color: string | null,
  label?: string,
}

const createTag = (label: string) => ({
  id: null,
  label,
  value: label,
  color: '#115'
});

const Tag = (props: any) => {

  const [tags, setTags] = useState(props.tags)
  const [value, setValue] = useState(createTag(''))
  
  console.log('tags:', tags);
  
  useEffect(() => {
    if (!props.tags) return
    setTags(props.tags)
  }, [props.tags])
  
  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  const handleCreate = (inputValue: any) => {
    const newTag = createTag(inputValue);
    props.onChange([...tags, newTag])
    setValue(newTag)
  };

  return (
    <CreatableSelect
      className='tags'
      isMulti
      isClearable
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={tags}
      value={value}
    />
  );
}

export default Tag;
