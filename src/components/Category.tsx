import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import './Category.scss'

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

  const [categories, setCategories] = useState(props.categories)
  const [value, setValue] = useState(createCategory(''))
  
  console.log('categories:', categories);
  
  useEffect(() => {
    if (!props.categories) return
    setCategories(props.categories)
  }, [props.categories])
  
  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  const handleCreate = (inputValue: any) => {
    const newCategory = createCategory(inputValue);
    props.onChange([...categories, newCategory])
    setValue(newCategory)
  };

  return (
    <CreatableSelect
      className='category'
      isClearable
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={categories}
      value={value}
    />
  );
}


export default Category;
