import React, {useState} from 'react';
import ModalNew from "./New";

const TriggerModal = () => {
  const [ show, toggle ] = useState(false);

  return (
    <div>
      {
        show && <ModalNew>Hello!!! <button onClick={() => toggle(false)}>close</button></ModalNew>
      }
      <button onClick={() => toggle(true)}>Show</button>
    </div>
  );
};

export default TriggerModal;