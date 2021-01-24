import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import './Tags.scss'

import { ITag } from '../ts-interfaces/interfaces';

const createTag = (label: string) => ({
  id: null,
  label,
  value: label,
  color: '#115'
});

const Tags = (props: any) => {

  const [allTags, setAllTags]: [ITag[], Function] = useState(props.allTags)
  const [value, setValue]: [ITag[], Function] = useState(props.tags || [])
  const [inputValue, setInputValue] = useState('')
    
  useEffect(() => {
    if (!props.allTags) return
    setAllTags(props.allTags)
  }, [props.allTags])

  useEffect(() => {
    setValue(props.tags || [])
  }, [props.tags])

  const handleInputChange = (inputValue: string) => setInputValue(inputValue)
  
  const handleChange = (newValue: any) => {
    props.onChange('tags', newValue)
    setValue(newValue)
  };

  const handleCreate = (inputValue: any) => {
    const newTag = createTag(inputValue);
    props.updateAllTags([...allTags, newTag])
    props.onChange('tags', [...value, newTag])
    setValue([...value, newTag])
  };

  return (
    <CreatableSelect
      className='tags'
      isMulti
      isClearable
      options={allTags}
      onCreateOption={handleCreate}
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
    />
  );
}

export default Tags;
