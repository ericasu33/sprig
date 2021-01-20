import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import classNames from 'classnames';
import Button from './Button';

const Category = (props: any) => {
  let categoryClass = classNames('category_default', {
    'category': props.color
  })

  const [categoryName, setCategoryName] = useState(props.category_name || '')
  const [category, setCategory] = useState(false)
  const [colour, setColour] = useState(false)
  const [categoryColor, setCategoryColor] = useState({
    background: '#ffffff'
  })

  const handleChangeComplete = (color: any) => {
    setCategoryColor({
      background:color.hex
    })
  }
  
  return (
    <>
      {/* show */}
      <div className={categoryClass}> {props.category_name} </div>
      
      <div onClick={(e) => setCategory(!category)}> 
        <i className="far fa-plus-square"></i>
        New category
      </div>

      {/* create */}
      {category &&
        <div>
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            name='categoryName'
            type='text'
            form='form2'
            placeholder="Category name"
            size={50}
          />

          <div>
            <Button category_colour onClick={(e: any) => setColour(!colour)}>
              Pick Color
            </Button>
            {colour &&
              <div>
                <ChromePicker
                  color={categoryColor.background}
                  onChangeComplete={handleChangeComplete}
                />
              </div>
            }
          </div>
        <Button category_create>
          Create
        </Button>
      </div>
      }
    </>
  );
};

export default Category;