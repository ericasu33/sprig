import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import './Categories.scss'

interface Category {
  id: number | null,
  name: string,
  color: string | null,
  label?: string,
}

const createCategory = (label: string) => ({
  id: null,
  label,
  value: label,
  color: '#115'
});

const Category = (props: any) => {

  const [allCategories, setAllCategories] = useState(props.allCategories)
  const [value, setValue] = useState(props.category)
  
  console.log('categories:', allCategories);
  
  useEffect(() => {
    if (!props.categories) return
    setAllCategories(props.allCategories)
  }, [props.allCategories])
  
  const handleChange = (newValue: any) => {
    setValue(createCategory(newValue));
  };

  const handleCreate = (inputValue: any) => {
    const newCategory = createCategory(inputValue);
    props.updateCategories([...allCategories, newCategory])
    setValue(newCategory);
  };

  return (
    <CreatableSelect
      className='category'
      isClearable
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={allCategories}
      value={value}
    />
  );
}


export default Category;
