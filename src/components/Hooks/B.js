import withChangingColor from "./HOC";
import React from "react";
import './style.css';
import ChangingColor from "./RenderProps";

const B = ({color, title}) => <ChangingColor render={(color) => (
    <h1 className={'title'} style={{color}}>{title}</h1>
  )}/>
;

export default B;