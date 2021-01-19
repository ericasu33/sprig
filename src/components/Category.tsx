import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import classNames from 'classnames';
import Button from './Button';

const Category = (props: any) => {
  let categoryClass = classNames('category_default', {
    'category': props.color
  })

  const [categoryName, setCategoryName] = useState('')
  const [toggle, setToggle] = useState({
    category: false,
    color: false,
  })
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
      
      <div
        onClick={(e) => setToggle(prev => {
            return {
            ...prev,
            category: !prev.category
            };
          }
        )}
      > 
        <i className="far fa-plus-square"></i>
        New category
      </div>

      {/* create */}
      {toggle.category &&
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
            <Button
            onClick={(e: any) => setToggle(prev => {
              return {
                ...prev,
                color: !prev.color
              };
            })}
            >
              Pick Color
            </Button>
            {toggle.color &&
              <div>
                  <ChromePicker
                    color={categoryColor.background}
                    onChangeComplete={handleChangeComplete}
                  />
              </div>
            }
          </div>
        <Button
          // onSubmit
        >
          Create
        </Button>
      </div>
      }
    </>
  );
};

export default Category;