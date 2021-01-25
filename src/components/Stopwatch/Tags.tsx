import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import './Tags.scss'

import { ITag } from 'ts-interfaces/interfaces';

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
    setAllTags(props.allTags);
  }, [props.allTags])

  useEffect(() => {
    setValue(props.tags || [])
  }, [props.tags])

  const handleInputChange = (inputValue: string) => setInputValue(inputValue)
  
  const handleChange = (newValue: any, action: any) => {
    const promise = props.onChange('tags', newValue, action);
    if (promise) {
      promise.then((id: number | undefined) => {
        if (!id) return;
        setValue(newValue);
      });
    } else {
      setValue(newValue);
    }
  };

  const handleCreate = (inputValue: any) => {
    const newTag = createTag(inputValue);
    const promise = props.updateAllTags(newTag);
    promise.then((id: number | undefined) => {
      if (!id) return;
      props.onChange('tags', [...value, newTag]);
      setValue([...value, newTag]);
    });
  };

  return (
    <CreatableSelect
      className='tags'
      isMulti
      isClearable
      placeholder='Description tags...'
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
