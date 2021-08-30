import '../styles/variables.scss';
import '../styles/globals.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { AppProps } from 'next/app';
import WindowWidthProvider from '../contexts/WindowWidth';
import React, { useState } from 'react';
import UserInfoContext from '../contexts/UserInfo';
import DataProvider from '../contexts/Data';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [canEdit, setCanEdit] = useState(false);

  return true ? (
    // <EditContext.Provider value={{
    //   data: data,
    //   updateData: onUpdateData,
    // }}>
    <UserInfoContext.Provider value={{
      canEdit: canEdit,
      updateValue: setCanEdit,
    }}>
      <DataProvider>
        <WindowWidthProvider>
          <Component {...pageProps} />
          <button onClick={() => setCanEdit(!canEdit)} style={{
              position: 'fixed',
              top: 0,
              right: 0,
              background: 'grey',
              borderRadius: 1,
              fontSize: '14px',
              padding: '4px 5px',
            }}>{canEdit ? 'Редактирование' : 'Просмотр'}</button>
        </WindowWidthProvider>
      </DataProvider>
    </UserInfoContext.Provider>
    // </EditContext.Provider>
  ) : <p>Loading...</p>;
};

export default MyApp;
