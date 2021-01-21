import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
// import { colourOptions } from '../data';

const components = {
  DropdownIndicator: null,
  ClearIndicator: null
};

const createOption = (label: string) => ({
  label,
  value: 'hurdurr',
});

interface Tag {
  id: number | null,
  name: string | null,
  color: string | null
}

const CreatableInputOnly = (props: any) => {
  
  
  // const [value, setValue] = useState([{label: 'tag', value: 'tag'}])
  // [{id: 0, name: 'food', color: '#ee0'}, {id: 1, name: 'dessert', color: '#e0e'}],
  const [value, setValue] = useState(props.tags)
  const [inputValue, setInputValue] = useState('')
  
  // useEffect(() => {
  //   // const tagNames: (string[] | null[] | undefined) = []
  //   props.tags.map((tag: Tag) => {
  //     value.push(tag.name)
  //   })
  //   setValue(tagNames)
  // }, props.tags)
  
  const handleChange = (value: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const handleKeyDown = (event: any) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added');
        console.log(value);
        console.groupEnd();
        props.onChange('tags', {id: null, name: inputValue, color: null})
        setInputValue('');
        event.preventDefault();
    }
  };

  return (
    <CreatableSelect
      className='tags' 
      isClearable
      isMulti
      onChange={handleChange}
      placeholder="Type something and press enter..."
      options={value}
    />
  );
  // return (
  //   <CreatableSelect
  //     className='tags' 
  //     components={components}
  //     inputValue={inputValue}
  //     isClearable
  //     isMulti
  //     menuIsOpen={false}
  //     onChange={handleChange}
  //     onInputChange={handleInputChange}
  //     onKeyDown={handleKeyDown}
  //     placeholder="Type something and press enter..."
  //     value={value}
  //   />
  // );
}

export default CreatableInputOnly;
