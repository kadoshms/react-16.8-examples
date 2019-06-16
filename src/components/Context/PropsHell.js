import React from 'react';

const D = (props) => <div>Hey {props.name} 👋</div>;
const C = (props) => <div><D name={props.name}/></div>;
const B = (props) => <div><C name={props.name}/></div>;
const A = (props) => <div><B name={props.name}/></div>;
const PropsHell = (props) => <A name={props.name}/>;

export default PropsHell;