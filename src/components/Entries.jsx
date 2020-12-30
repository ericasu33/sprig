import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';


function Entries() {
  const [desc, setDesc] = useState('');
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date());

  const calendarState = (value) => {
    setCalendarValue(value)
    setToggleCalendar(prev => !prev)
  }

  // https://stackoverflow.com/questions/10599148/how-do-i-get-the-current-time-only-in-javascript
  const getTimeNow = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });


  return (
    <div>
      <form
        autoComplete='off'
        onSubmit={event => event.preventDefault()}
      >

        {/* <EntryDesc />  */}
        <div>
          <input
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
            name='desc'
            type='text'
            placeholder='What are you working on?'
            size='50'
          />

          {console.log(desc)}
        </div>

        {/* <StartEndTime />  */}
        <div>
            {getTimeNow}
        </div>
        {/* no manual input yet */}
        {/* <Intensity /> */}

        <i 
          className='fa fa-calendar-alt fa-lg'
          onClick={(e) => setToggleCalendar(prev => !prev)}
        >
          {calendarValue.getMonth() + 1}/{calendarValue.getDate()}
        </i>
      
 
        {toggleCalendar && 
        <Calendar 
          value = {calendarValue}
          onClickDay={(value, event) => calendarState(value)}

        /> 
        }

        {console.log({calendarValue})}

        {/* https://www.npmjs.com/package/react-calendar */}
        {/* <TimerDuration /> */}

        {/* <Button /> */}
        {/* Pass in img as prop & conditionals to render the component diff */}
        {/* Play/Pause/Stop/Duplicate/Delete */}

        {/* <ModeToggle /> STRETCH */}

      </form>
    </div>
  )
}

export default Entries;