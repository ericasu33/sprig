import ProgressBar from "react-bootstrap/ProgressBar";
import "./Bar.scss";



const Bar = ( props : any ) => {
  return (
    <div>
        <ProgressBar className="bar-size" now={60} />
    </div>
  );
};

export default Bar