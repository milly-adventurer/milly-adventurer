import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

export const WindowWidthContext = React.createContext<{
  isMobile: boolean | null;
}>({
  isMobile: null,
});

const MAX_MOBILE_WIDTH = 768;

const WindowWidthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, setState] = useState<{
    isMobile: boolean | null;
  }>({
    isMobile: null,
  });

  useEffect(() => {
    const onResize = (event: UIEvent) => {
      setState({
        ...state,
        isMobile: (event.target as Window).innerWidth <= MAX_MOBILE_WIDTH,
      });
    };

    const id = setInterval(() => {
      if (window) {
        clearInterval(id);

        window.addEventListener('resize', onResize);
        setState({
          ...state,
          isMobile: window.screen.width <= MAX_MOBILE_WIDTH,
        });
      }
    }, 500);

    return window.removeEventListener('resize', onResize);
  }, []);

  return (
    <WindowWidthContext.Provider value={{
      ...state,
    }}>
      {children}
    </WindowWidthContext.Provider>
  )
};


export default WindowWidthProvider;
