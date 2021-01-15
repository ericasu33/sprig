import React, { useState } from 'react';

const PomodoroTimer = (props: any) => {
  const [expand, setExpand] = useState(false);
  return (
    <>
    <button
      onClick={(e: any) => setExpand((prev: boolean) => (!prev))}
    >

    </button>
    <div>
      { expand && 
        <div>
          expanded
        </div>
      }
      { !expand && 
        <div>
          condensed
        </div>
      }
    </div>
    </>
  );
};

export default PomodoroTimer;