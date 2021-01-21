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
  const [value, setValue] = useState(props.tags)
  const [inputValue, setInputValue] = useState('')
    
  useEffect(() => {
    if (!props.allTags) return
    setAllTags(props.allTags)
  }, [props.allTags])

  const handleInputChange = (inputValue: string) => setInputValue(inputValue)
  
  const handleChange = (newValue: any) => {
    props.onChange('tags', newValue)
    setValue(newValue)
  };

  const handleCreate = (inputValue: any) => {
    const newTag = createTag(inputValue);
    console.log('handleCreate newTag:', newTag);
    props.updateAllTags([...allTags, newTag])
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
