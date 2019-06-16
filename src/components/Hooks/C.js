import useChangingColor from "./useChangingColor";
import './style.css';
import React from "react";

const C = (props) => {
  const color = useChangingColor();

  return <h1 className={'title'} style={{ color }}>{props.title}</h1>;
};

export default C;