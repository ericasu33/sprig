import React, { useState, useEffect } from 'react';
import { CirclePicker } from 'react-color';
import Button from '../Button';



const ColourPicker = (props: any) => {
  const [showColourPicker, setShowColourPicker] = useState(false)

  console.log('props.category.color:', props.category.color);
  console.log('props.allCategories',props.allCategories);
  // console.log('',);
  // console.log('',);
  

  const onChangeComplete = ((picked: any) => {
    console.log('colourPicker colour:', picked);

    
    props.updateAllCategories({
      ...props.allCategories, 
      [props.category.id]: {...props.category, color: picked.hex}
    })
    props.onChange('category', ({...props.category, color: picked.hex}))
  })
  
  return (
  <div>
        <Button palette onClick={() => setShowColourPicker(!showColourPicker)} />

        {showColourPicker && 
          <div className='show-colour-picker'>
            <div
              style={ {position: 'fixed', inset: 0} } 
              onClick={() => setShowColourPicker(false)}
            />
            <CirclePicker
              color={props.category.color}
              onChangeComplete={(picked: any) => onChangeComplete(picked)}
            />
          </div>
        }
      </div>
  )
}

export default ColourPicker
