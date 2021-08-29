import '../styles/variables.scss';
import '../styles/globals.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { AppProps } from 'next/app';
import WindowWidthProvider from '../contexts/WindowWidth';
import React from 'react';
import UserInfoContext from '../contexts/UserInfo';
import DataProvider from '../contexts/Data';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const canEdit = true;

  return true ? (
    // <EditContext.Provider value={{
    //   data: data,
    //   updateData: onUpdateData,
    // }}>
      <UserInfoContext.Provider value={{
        canEdit: canEdit,
      }}>
        <DataProvider>
          <WindowWidthProvider>
            <Component {...pageProps} />
          </WindowWidthProvider>
        </DataProvider>
      </UserInfoContext.Provider>
    // </EditContext.Provider>
  ) : <p>Loading...</p>;
};

export default MyApp;
