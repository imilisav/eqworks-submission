// imports
import { useState, useEffect } from 'react';

export default function useWindowSize() {

  // state to store the width and height of the user's window
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // handler to call on window resize
    function handleResize() {
      // set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // add event listener
    window.addEventListener("resize", handleResize);
    
    // call handler right away so state gets updated with initial window size
    handleResize();
    
    // remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}