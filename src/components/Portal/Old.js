import React from "react";
import './style.css';

const ModalOld = (props) => (
  <div className={'overlay'}>
    <div className={'content'}>
      {
        props.type === 'A' ?
          <div>Content of Modal A</div>
          :
          props.type === 'B' ?
            <div>Content of Modal B</div>
            :
            null
      }
      <button onClick={() => props.close()}>close</button>
    </div>
  </div>
);

export default ModalOld;