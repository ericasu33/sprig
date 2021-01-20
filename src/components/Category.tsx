import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import classNames from 'classnames';
import Button from './Button';
import './Category.scss'

const Category = (props: any) => {
  let categoryClass = classNames('category_default', {
    'category': props.color
  })  

  const [categoryName, setCategoryName] = useState(props.category.name || '')
  const [categoryColor, setCategoryColor] = useState(props.category.color || '#fff')
  const [category, setCategory] = useState(false)
  const [colour, setColour] = useState(false)

  const handleChangeComplete = (color: any) => {
    setCategoryColor(color.hex)
  }

  const updateCategory = () => {
    props.updateCategory('category', {
      ...props.category,
      name: categoryName,
      color: categoryColor
    })
  }
  
  return (
    <>
      {/* show */}
      <div className={categoryClass}> 
        {props.category.name} 
        
        <div onClick={(e) => setCategory(!category)}> 
          <i className="far fa-plus-square"></i>
          New category
        </div>

        {/* create */}
        {category &&
          <div className='category-picker'>
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
                    color={categoryColor}
                    onChangeComplete={handleChangeComplete}
                  />
                </div>
              }
            </div>
            <Button category_create onClick={(e: any) => updateCategory()}>
              Create
            </Button>
          </div>
        }
      </div>
    </>
  );
};

export default Category;