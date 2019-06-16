import {useState, useEffect} from 'react';
import {getRandomInt} from "./random";

const useChangingColor = () => {
  const [ color, setColor ] = useState([0,0,0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setColor([
        getRandomInt(0, 250),
        getRandomInt(0, 250),
        getRandomInt(0, 250),
      ])
    }, 1500);

    return () => clearInterval(interval);
  }, [color])

  return `rgb(${color.join()})`;
};

export default useChangingColor;