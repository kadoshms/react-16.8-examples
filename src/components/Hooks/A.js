import withChangingColor from "./HOC";
import React from "react";
import './style.css';

const A = ({color, title}) => <h1 className={'title'} style={{color}}>{title}</h1>;

export default withChangingColor(A);