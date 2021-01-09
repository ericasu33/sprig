import React, {useState} from 'react';

const Dropdown = (props) => {
  const [dropdownValue, setdropdownValue] = useState('Default')

  const options = props.children.map(option => {
    return (
      <option 
        key={option.id}
        value={option.name}>
        {option.name}
      </option>
    )
  })
  
  console.log(dropdownValue)
  return (
    <div>
      <select
        value={dropdownValue}
        onChange={(e) => setdropdownValue(e.target.value)}
      >
      <option value="Default">Default</option>
      
      {options}
      </select>
    </div>
  );
};

export default Dropdown;

//props.children must be an array object.
// const options = [
//   {
//     id: 1,
//     name: "Example1"
//   },
//   {
//     id: 2,
//     name: "Example2"
//   },
//   {
//     id: 3,
//     name: "Example3"
//   },
// ]