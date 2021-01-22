import React from "react";

const ProgressBar = ( props : any ) => {
  const { bgcolor, completed, name, totalDuration } = props;

  const barFill = {
    width: `${completed}%`,
    backgroundColor: bgcolor,
  }

  return (
    <div className="container">
      <div className="name">
        {name}
      </div>

      <div className="total-duration">
        {totalDuration}
      </div>

      <div className="progress">
        <div className="bar-fill" style={barFill}>
        </div>
      </div>

      <div className="completed">  
        {`${completed} %`}
      </div>
    </div>
  );
};

export default ProgressBar;
