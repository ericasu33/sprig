import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { handleInputChange } from 'react-select/src/utils';
import './Tags.scss'

interface Tag {
  id: number | null,
  value: string,
  color: string | null,
  label?: string,
}

const createTag = (label: string) => ({
  id: null,
  label,
  value: label,
  color: '#115'
});

const Tags = (props: any) => {

  const [allTags, setAllTags] = useState(props.allTags)
  const [value, setValue] = useState(props.tags || [])
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
      placeholder='Task description tags...'
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
