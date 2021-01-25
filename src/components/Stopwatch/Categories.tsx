import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import reactSelectColours from 'styles/reactSelectColours'
import { CirclePicker } from 'react-color';
import Button from '../Button';
import './Categories.scss'

import { ICategory } from 'ts-interfaces/interfaces';

const Category = (props: any) => {

  const [allCategories, setAllCategories] = useState(props.allCategories)
  const [value, setValue] = useState(props.category)
  const [showColourPicker, setShowColourPicker] = useState(false)

  // delete line below once DB connected
  const fakeId = Object.keys(allCategories).length + 1
  const createCategory = (label: string) => ({
    id: fakeId,
    label,
    value: label,
    color: '#115'
  });

  useEffect(() => {
    if (!props.allCategories) return
    setAllCategories(props.allCategories)
  }, [props.allCategories])

  useEffect(() => {
    setValue(props.category || '')
  }, [props.category])
  
  const handleChange = (updatedCategory: any) => {
    props.onChange('category', updatedCategory)
    setValue(updatedCategory);
  };

  const handleCreate = (inputValue: any) => {
    const newCategory = createCategory(inputValue);
    props.updateAllCategories([...allCategories, newCategory])
    props.onChange('category', newCategory)
    setValue(newCategory);
  };

  const colourUpdate = ((picked: any) => {
    const updatedCategory: ICategory = {...value, color: picked.hex}
    handleChange(updatedCategory)
    const updatedCategories = allCategories.map((cat: ICategory) => {
      return cat.id === updatedCategory.id ? updatedCategory : cat
    })
    props.updateAllCategories(updatedCategories)
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
            options={allCategories}
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
            onCreateOption={handleCreate}
            options={allCategories}
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
                  onChangeComplete={(picked: any) => colourUpdate(picked)}
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
