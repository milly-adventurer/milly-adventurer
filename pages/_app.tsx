import '../styles/variables.scss';
import '../styles/globals.scss';

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
