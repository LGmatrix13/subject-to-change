import { useState, useEffect } from "react";

export const useDelay = (initialDelay = 1000) => {
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelay(false);
    }, initialDelay);

    return () => clearTimeout(timeout);
  }, [initialDelay]);

  return delay;
};
