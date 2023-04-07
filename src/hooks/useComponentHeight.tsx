import { useCallback, useEffect, useRef, useState } from "react";

const useComponentHeight = (isLoaded: boolean) => {
  const [height, setHeight] = useState(0);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const measuredRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null && isLoaded) {
        setHeight(node.children[0].getBoundingClientRect().height);
        cardsRef.current = node;
      }
    },
    [isLoaded]
  );

  useEffect(() => {
    function setResizeVals() {
      const CH = cardsRef.current?.children[0].getBoundingClientRect().height;
      setHeight(CH || height);
    }
    addEventListener("resize", setResizeVals);
    return () => removeEventListener("resize", setResizeVals);
  }, []);

  return { height: height, ref: measuredRef };
};

export default useComponentHeight;
