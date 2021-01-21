import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

const CreatableInputOnly = (props: any) => {

  const [value, setValue] = useState([{label: 'tag', value: 'firsttaggo'}])
  const [inputValue, setInputValue] = useState('')

  const handleChange = (value: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setValue(value);
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
        setValue(prev => {
          return [
            ...prev, 
            createOption(inputValue)
          ]
        })
        setInputValue('');
        event.preventDefault();
    }
  };
  return (
    <CreatableSelect
      className='tags' 
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="Type something and press enter..."
      value={value}
    />
  );
}

export default CreatableInputOnly;
