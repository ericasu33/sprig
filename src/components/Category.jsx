import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import classNames from 'classnames';
import Button from './Button';

const Category = (props) => {
  let categoryClass = classNames('category_default', {
    'category': props.color
  })

  const [categoryName, setCategoryName] = useState('')
  const [toggle, setToggle] = useState({
    category: false,
    // color: false,
  })
  const [categoryColor, setCategoryColor] = useState({
    background: '#ffffff'
  })
  const [displayColor, setDisplayColor] = useState(false)

  const handleChangeComplete = color => {
    setCategoryColor({
      background:color.hex
    })
  }

  console.log(categoryColor)

  return (
    <>
      {/* show */}
      <div className={categoryClass}> &#8226; {props.category_name} </div>
      
      <div
        onClick={(e) => setToggle(prev => {
            return {
            ...prev,
            category: !prev.category
            };
          }
        )}> 
        <i className="fas fa-plus"></i>
        Create new project 
      </div>

      {/* create */}
      {toggle.category &&
      <div>
        <form
          autoComplete='off'
          onSubmit={event => event.preventDefault()}
        >
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            name='categoryName'
            type='text'
            placeholder="Category name"
            size='50'
          />

          <div>
            <Button
              onClick={(e) => setDisplayColor(prev => !prev)
              }
            >
              Pick Color
            </Button>
            {displayColor &&
              <div>
                  <ChromePicker
                    color={categoryColor.background}
                    onChangeComplete={handleChangeComplete}
                  />
              </div>
            }
          </div>
        <Button>
          Create
        </Button>
        </form>
      </div>
      }
    </>
  );
};

export default Category;