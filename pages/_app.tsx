import '../styles/variables.scss';
import '../styles/globals.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { AppProps } from 'next/app';
import WindowWidthProvider from '../contexts/WindowWidth';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WindowWidthProvider>
      <Component {...pageProps} />
    </WindowWidthProvider>
  );
};

export default MyApp;
