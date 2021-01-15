import React, { useState } from 'react';
import Button from './Button'

const PomodoroTimer = (props: any) => {
  const [expand, setExpand] = useState(false);
  return (
    <div>
      <Button
        onClick={(e: any) => setExpand((prev: boolean) => (!prev))}
      >
        { (expand && "shrink") || "expand" }
      </Button>
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
  );
};

export default PomodoroTimer;