import React from "react";
import A from "./A";
import B from "./B";
import C from "./C";

const ColorTitle = (props) => {
  return (
    <React.Fragment>
      <A title={`${props.title} [HOC]`}/>
      <B title={`${props.title} [render props]`}/>
      <C title={`${props.title} [custom hook]`}/>
    </React.Fragment>
  );
};

export default ColorTitle;

