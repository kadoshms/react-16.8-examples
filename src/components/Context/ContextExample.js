import React, {useContext} from "react";

const NameContext = React.createContext('');

const D1 = () => {
  const name = useContext(NameContext);

  return (
    <div>Hey {name} 👋</div>
  );
};

const D2 = () => (
  <div>
    <NameContext.Consumer>
      {name => <span>Hey {name} 👋</span>}
    </NameContext.Consumer>
  </div>
);


const C = () => <div><D1 /> <D2 /></div>;
const B = () => <div><C /></div>;
const A = () => <div><B /></div>;

const ContextExample = (props) => (
  <NameContext.Provider value={props.name}>
    <A />
  </NameContext.Provider>
);

export default ContextExample;