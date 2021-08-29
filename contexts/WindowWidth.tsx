import React, { PropsWithChildren, useEffect, useState } from "react";

export const WindowWidthContext = React.createContext<{
  isMobile: boolean | null;
  isTablet: boolean | null;
  onResize?(): void;
}>({
  isMobile: null,
  isTablet: null,
});

const MAX_MOBILE_WIDTH = 768;
const MAX_TABLET_WIDTH = 1200;

const WindowWidthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, setState] = useState<{
    isMobile: boolean | null;
    isTablet: boolean | null;
  }>({
    isMobile: null,
    isTablet: null,
  });

  useEffect(() => {
    const onResize = (event: UIEvent) => {
      setState({
        ...state,
        isMobile: (event.target as Window).innerWidth <= MAX_MOBILE_WIDTH,
        isTablet: (event.target as Window).innerWidth > MAX_MOBILE_WIDTH && (event.target as Window).innerWidth < MAX_TABLET_WIDTH,
      });
    };

    const id = setInterval(() => {
      if (window) {
        clearInterval(id);

        window.addEventListener('resize', onResize);
        setState({
          ...state,
          isMobile: window.screen.width <= MAX_MOBILE_WIDTH,
          isTablet: window.screen.width > MAX_MOBILE_WIDTH && window.screen.width < MAX_TABLET_WIDTH,
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
