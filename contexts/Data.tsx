import React, { PropsWithChildren, useEffect, useState } from "react";
import { BASE_URL, URL } from "../constants/url";
import Data, { NewData } from "../interfaces/Tour";
import { NewTour } from "../interfaces/Tour";

export interface DataContext {
  getTourById(id: number): NewTour | undefined | null;
  updateDay(dayIndex: number, type: 'full' | 'short', dType: 'name' | 'description' | 'image', dataa: string, index: number): void;
	updateNewData(newData: NewData): void;
	sendNewData(): Promise<void>;
	newData: NewData | null,
}

export const initialContextValue: DataContext = {
  getTourById: () => { return null },
	updateNewData: () => {},
	sendNewData: async () => {},
	updateDay: ()=> {},
	newData: null,
};

export const DataContext = React.createContext<DataContext>(initialContextValue);

const DataProvider = ({ children }: PropsWithChildren<{}>) => {
	const [data, setData] = useState<NewData | null>(null);

	const getNewData = async () => {
    try {
      const response = await fetch(`${BASE_URL}${URL.DATA}`, {
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

	const updateNewData = (newData: NewData) => {
		setData(newData);
	};

	useEffect(() => {
		(async () => {
      const data = await getNewData();
      setData(data);
    })();
	}, []);

  const getTourById = (tourId: number) => {
    if (data) {
      return data.tours[tourId];
    }
    return null;
  };

	const sendNewData = async () => {
		try {
			await fetch(`${BASE_URL}${URL.UPDATE_NEW_DATA}`, {
				method: 'POST',
				mode: "no-cors",
				headers: {
					'Content-Type': 'Application/json',
					'Access-Control-Request-Headers': '*',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(data),
			});

			setTimeout(async () => {
				const newData: NewData = await getNewData()
				setData(newData);
			}, 3000);
		} catch (err) {
			console.error(err);
		}
	};

	const updateDay = (dayIndex: number, type: 'full' | 'short', dType: 'name' | 'description' | 'image', dataa: string, index: number) => {
		if (!data) return;
		const d: NewData = {
			...data,
			tours: data.tours.map((t, i) => {
				if (i ===index) {
					return {
						...t,
						program: t.program.map((p, j) => {
							if (j === dayIndex) {
								return {
									...p,
									[type]: {
										...p[type],
										[dType]: dataa,
									}
								}
							}
							return p;
						}),
					}
				}
				return t;
			}),
		};

		updateNewData(d);
	};

	useEffect(() => {
		console.log(data?.tours[1]?.lastPictures, 'interesting from upd');
	}, [data]);
  return (
    <DataContext.Provider value={{
			sendNewData,
      getTourById,
      updateDay,
			newData: data,
			updateNewData,
    }}>
      {data ? children : null}
    </DataContext.Provider>
  );
};


export default DataProvider;
