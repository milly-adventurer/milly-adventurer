import '../styles/variables.scss';
import '../styles/globals.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { AppProps } from 'next/app';
import WindowWidthProvider from '../contexts/WindowWidth';
import DataContext, { initialContextValue } from '../contexts/Data';
import { useEffect, useState } from 'react';
import { Tours } from '../interfaces/Tour';
import { BASE_URL, URL } from '../constants/url';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [data, setData] = useState<Tours | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${BASE_URL}${URL.TOURS}`);
      const responseData = await response.json();
      setData(responseData);
    })();
  }, []);

  return data ? (
    <DataContext.Provider value={{
      ...initialContextValue,
      getTourById: (tourId: string) => {
        if (data) {
          return data.find(({ id }) => id === tourId);
        }
        return null;
      },
      tours: data,
    }}>
      <WindowWidthProvider>
        <Component {...pageProps} />
      </WindowWidthProvider>
    </DataContext.Provider>
  ) : <p>Loading...</p>;
};

export default MyApp;
