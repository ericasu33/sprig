import React, { useState, useEffect } from 'react';

import CreatableSelect from 'react-select/creatable';

const createTag = (label: string) => ({
  id: null,
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = [
  createTag('One'),
  createTag('Two'),
  createTag('Three'),
];

const Category = (props: any) => {

  const [options, setOptions] = useState(defaultOptions)
  const [value, setValue] = useState(createTag(''))
  
  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  const handleCreate = (inputValue: any) => {
    const newOption = createTag(inputValue);
    console.log(newOption);
    setOptions(prev => [...options, newOption])
  };

  return (
    <CreatableSelect
      isClearable
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
  );
}


export default Category;