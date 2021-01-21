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
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState<Tag[]>([])
  
  console.log('tags:', tags);
  
  useEffect(() => {
    if (!props.tags) return
    setTags(props.tags)
  }, [props.tags])

  useEffect(() => {

  })
  
  const handleChange = (newValue: any) => {
    return
    const newTag = createTag(newValue);
    setTags([...tags, newTag])
  };

  const handleCreate = (inputValue: any) => {
    const newTag = createTag(inputValue);
    props.onChange([...tags, newTag])
    // setValue(newTag)
  };

  // const handleKeyDown = (event: any) => {
  //   if (!inputValue) return;
  //   switch (event.key) {
  //     case 'Enter':
  //     case 'Tab':
  //       setValue([...value, ])
  //       this.setState({
  //         inputValue: '',
  //         value: [...value, createOption(inputValue)],
  //       });
  //       event.preventDefault();
  //   }
  // };

  return (
    <CreatableSelect
      className='tags'
      isMulti
      isClearable
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={tags}
    />
  );
}

export default Tag;
