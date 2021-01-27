import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import reactSelectColours from 'styles/reactSelectColours'
import { CirclePicker } from 'react-color';
import Button from '../Button';
import './Categories.scss'

import { ICategory } from 'ts-interfaces/interfaces';

const Category = (props: any) => {

  // const [allCategories, setAllCategories] = useState(props.allCategories)
  const [value, setValue] = useState(props.category)
  const [showColourPicker, setShowColourPicker] = useState(false)

  const createCategory = (label: string) => ({
    id: null,
    label,
    value: label,
    color: '#000'
  });

  useEffect(() => {
    setValue(props.category || '')
  }, [props.category])
  
  const handleChange = (updatedCategory: ICategory) => {
    const promise = props.onChange('category', updatedCategory);
    if (promise) {
      promise.then((id: number | undefined) => {
        if (!id) return;
        setValue(updatedCategory);
      });
    } else {
      setValue(updatedCategory);
    }
  };

  const handleCreate = (inputValue: any) => {
    const newCategory = createCategory(inputValue);
    const promise = props.createNewCategory(newCategory);
    promise.then((id: number | undefined) => {
      if (!id) return;
      props.onChange('category', newCategory)
      setValue(newCategory);
    });
  };

  const handleUpdateColour = ((picked: any) => {
    const updatedCategory: ICategory = {...value, color: picked.hex}
    const promise = props.updateCategory(updatedCategory);
    promise.then((id: number | undefined) => {
      if (!id) return
      handleChange(updatedCategory)
    })
  })

  return (
    <>
      <div className='sw-categories'>
        {!props.readOnly &&
          <CreatableSelect
            styles={reactSelectColours(props.allCategories)}
            className='category'
            isClearable
            placeholder='Category...'
            onChange={handleChange}
            onCreateOption={handleCreate}
            options={props.allCategories}
            value={value}
          />
        }
        {props.readOnly &&
          <Select
            styles={reactSelectColours(props.allCategories)}
            className='category'
            isClearable
            placeholder='Category...'
            onChange={handleChange}
            options={props.allCategories}
            value={value}
          />
        }

      </div>

      <div className='sw-picker'>
        {props.category &&
          <>
            <Button palette onClick={() => setShowColourPicker(!showColourPicker)} />
            {showColourPicker && 
              <div className='show-colour-picker'>
                <div
                  style={ {position: 'fixed', inset: 0} } 
                  onClick={() => setShowColourPicker(false)}
                />
                <CirclePicker
                  color={props.category ? props.category.color : '#000'}
                  onChangeComplete={(picked: any) => handleUpdateColour(picked)}
                />
              </div>
            }
          </>
        }
      </div>
    </>
  );
}


export default Category;
