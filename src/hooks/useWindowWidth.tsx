import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function setResizeWindowVals() {
      setWindowWidth(window.innerWidth);
    }
    addEventListener("resize", setResizeWindowVals);
    return () => removeEventListener("resize", setResizeWindowVals);
  }, []);
  return windowWidth;
};

export default useWindowWidth;
