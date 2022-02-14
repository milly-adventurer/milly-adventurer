import '../styles/variables.scss';
import '../styles/globals.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { AppProps } from 'next/app';
import WindowWidthProvider from '../contexts/WindowWidth';
import React from 'react';
import DataProvider from '../contexts/Data';
import UserInfoProvider from '../contexts/UserInfo';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<DataProvider>
			<UserInfoProvider>
				<WindowWidthProvider>
					<Component {...pageProps} />
				</WindowWidthProvider>
			</UserInfoProvider>
		</DataProvider>
	);
};

export default MyApp;
