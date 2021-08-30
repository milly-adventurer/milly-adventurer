import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { BASE_URL, URL } from "../constants/url";
import Data from "../interfaces/Tour";
import { Tour } from "../interfaces/Tour";

export interface DataContext {
  getTourById(id: number): Tour | undefined | null;
  updateData(newData: Data): void;
  onAddImageToTab(tabId: number, imgBase64: string): Promise<void>;
  onDeleteImageFromTab(tabId: number, imgIndex: number): Promise<void>;
  addNewTab(): Promise<void>;
  deleteTab(index: number): Promise<void>;
  updateTabInfo(tabId: string, info: 'name' | 'description', newText: string): Promise<void>;
  onUpdateTourInfo(tourId: number, type: 'name' | 'description' | 'date', data: string): Promise<void>;
  updateDay(tourId: number, dayId: number, type: 'image' | 'name' | 'description', data: string): Promise<void>;
  addDay(tourId: number): Promise<void>;
  deleteDay(tourId: number, index: number): Promise<void>;
  // new below
  editQA(index: number, type: 'q' | 'a', data: string): Promise<void>;
  addQA(): Promise<void>;
  deleteQA(ndex: number): Promise<void>;
  addTourLastTimeImage(tourId: number, base64: string): Promise<void>;
  deleteTourLastTimeImage(tourId: number, index: number): Promise<void>;
  updateProgramDay(tourId: number, index: number, type: 'name' | 'description' | 'image', data: string): Promise<void>;
  deleteProgramDay(tourId: number, index: number): Promise<void>;
  
  data: Data | null,
}

export const initialContextValue: DataContext = {
  getTourById: () => { return undefined },
  updateData: () => {},
  onAddImageToTab: async () => {},
  onDeleteImageFromTab: async () => {},
  addNewTab: async () => {},
  deleteTab: async () => {},
  updateTabInfo: async () => {},
  onUpdateTourInfo: async () => {},
  updateDay: async () => {},
  addDay: async () => {},
  deleteDay: async () => {},

  editQA: async () => {},
  addQA: async () => {},
  deleteQA: async () => {},
  addTourLastTimeImage: async () => {},
  deleteTourLastTimeImage: async () => {},
  updateProgramDay: async () => {},
  deleteProgramDay: async () => {},
  data: null,
};

export const DataContext = React.createContext<DataContext>(initialContextValue);

const DataProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, setState] = useState<{
    data: null | Data;
  }>({
    data: null,
  });

  const [controller, setController] = useState<AbortController>();

  useEffect(() => {
    setController(new AbortController());
  }, []);

  const getTourById = (tourId: number) => {
    if (state.data) {
      return state.data.tours[tourId]
    }
    return null;
  };

  const getData = async () => {
    try {
      const response = await fetch(`${BASE_URL}${URL.TOURS}`, {
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const onUpdateData = useMemo(() => async (newData: Data) => {
    try {
      if (controller) {
        // controller.abort();
      }

      await fetch(`${BASE_URL}${URL.UPDATE_DATA}`, {
        method: 'POST',
        mode: "no-cors",
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(newData),
        signal: controller && controller.signal,
      });

      await new Promise<void>((res, rej) => {
        setTimeout(async () => {
          try {
            const data = await getData();
            console.log(newData.tabs[0].pictures.length, 'sendToBack');
            console.log(newData.tabs[0].pictures.length, 'fromBack');
            setState({ data });
            res();
          } catch (err) {
            rej(err);
          }
        }, 1000);
      });
    } catch (err) {
      console.error(err);
    }
  }, [controller]);

  const onAddImageToTab = async (tabId: number, imgBase64: string) => {
    if (!state.data) return;
    const newData: Data = {
      ...state.data,
      tabs: state.data.tabs.map((tab, i) => {
        console.log(tab.id, tabId);
        if (i === tabId) {
          return {
            ...tab,
            pictures: [...tab.pictures, imgBase64],
          }
        }

        return tab;
      }),
    }

    await onUpdateData(newData);
  };

  const onDeleteImageFromTab = async (tabId: number, index: number) => {
    if (!state.data) return;
    const newData: Data = {
      ...state.data,
      tabs: state.data.tabs.map((tab, i) => {
        if (i === tabId) {
          return {
            ...tab,
            pictures: tab.pictures.filter((_, i) => i !== index),
          }
        }

        return tab;
      }),
    }

    await onUpdateData(newData);
  };

  const addNewTab = async () => {
    if (!state.data) return;
    const newData: Data = {
      ...state.data,
      tabs: [...state.data.tabs, {
        description: '-',
        id: '-',
        name: '-',
        pictures: [],
      }]
    }

    await onUpdateData(newData);
  };

  const deleteTab = async (tabIndex: number) => {
    if (!state.data) return;
    const newData: Data = {
      ...state.data,
      tabs: state.data.tabs.filter((_, i) => i !== tabIndex),
    }

    await onUpdateData(newData);
  };

  const updateTabInfo = async (tabId: string, info: 'name' | 'description', newText: string) => {
    if (!state.data) return;
    const newData: Data = {
      ...state.data,
      tabs: state.data.tabs.map((tab) => {
        if (tab.name === tabId) {
          return {
            ...tab,
            name: info === 'name' ? newText : tab.name,
            description: info === 'description' ? newText :  tab.description,
          };
        }

        return tab;
      }),
    }

    await onUpdateData(newData);
  };

  const onUpdateTourInfo = async (tourId: number, type: 'name' | 'description' | 'date', data: string) => {
    if (!state.data) return;

    const newData: Data = {
      ...state.data,
      tours: state.data.tours.map((tour, i) => {
        if (i === tourId) {
          return {
            ...tour,
            name: type === 'name' ? data : tour.name,
            description: type === 'description' ? data : tour.description,
            date: type === 'date' ? data : tour.date,
          }
        }

        return tour;
      }),
    };

    await onUpdateData(newData);
  };

  const updateDay = async (tourId: number, dayId: number, type: 'image' | 'name' | 'description', data: string) => {
    if (!state.data) return;

    const newData: Data = {
      ...state.data,
      tours: state.data.tours.map((tour, i) => {
        if (i === tourId) {
          return {
            ...tour,
            program_short: tour.program_short.map((item, j) => {
              if (j === dayId) {
                return {
                  ...item,
                  name: type === 'name' ? data : item.name,
                  description: type === 'description' ? data : item.description,
                  image: type === 'image' ? data : item.image,
                }
              }

              return item;
            }),
          }
        }

        return tour;
      }),
    };

    await onUpdateData(newData);
  };

  const addDay = async (tourId: number) => {
    if (!state.data) return;

    const newData: Data = {
      ...state.data,
      tours: state.data.tours.map((tour, i) => {
        if (i === tourId) {
          return {
            ...tour,
            program_short: [...tour.program_short, {
              name: '-',
              description: '-',
              image: null,
            }]
          }
        }
        return tour;
      }),
    }

    await onUpdateData(newData);
  };

  const deleteDay = async (tourId: number, index: number) => {
    if (!state.data) return;

    const newData: Data = {
      ...state.data,
      tours: state.data.tours.map((tour, i) => {
        if (i === tourId) {
          return {
            ...tour,
            program_short: tour.program_short.filter((_, i) => i !== index),
          }
        }
        return tour;
      }),
    }

    await onUpdateData(newData);
  };

  const editQA = async (index: number, type: 'q' | 'a', data: string) => {
    if (!state.data) return;
    const newData: Data = {
      ...state.data,
      qa: state.data.qa.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            answer: type === 'a' ? data : item.answer,
            question: type === 'q' ? data : item.question,
          }
        }

        return item;
      }),
    }

    await onUpdateData(newData);
  };

  const addQA = async () => {
    if (!state.data) return;
    const newData: Data = {
      ...state.data,
      qa: [...state.data.qa, {
        question: 'Пусто',
        answer: 'Пусто',
      }],
    }

    await onUpdateData(newData);
  };

  const deleteQA = async (index: number) => {
    if (!state.data) return;
    const newData: Data = {
      ...state.data,
      qa: state.data.qa.filter((_, i) => i !== index),
    }

    await onUpdateData(newData);
  };

  const addTourLastTime = async (tourId: number, base64: string) => {
    if (!state.data) return;
    const newData: Data = {
      ...state.data,
      tours: state.data.tours.map((tour, i) => {
        if (i === tourId) {
          return {
            ...tour,
            lastPictures: [...tour.lastPictures, base64],
          };
        }

        return tour;
      }),
    }

    await onUpdateData(newData);
  };

  const deleteTourLastTimeImage = async (tourId: number, index: number) => {
    if (!state.data) return;
    const newData: Data = {
      ...state.data,
      tours: state.data.tours.map((tour, i) => {
        if (i === tourId) {
          return {
            ...tour,
            lastPictures: tour.lastPictures.filter((_, i) => i !== index),
          };
        }

        return tour;
      }),
    }

    await onUpdateData(newData);
  };

  const addTourLastTimeImage = async (tourId: number, base64: string) => {
    if (!state.data) return;

    const newData: Data = {
      ...state.data,
      tours: state.data.tours.map((tour, i) => {
        if (i === tourId) {
          return {
            ...tour,
            lastPictures: [...tour.lastPictures, base64],
          };
        }

        return tour;
      }),
    }

    await onUpdateData(newData);
  };

  const updateProgramDay = async (tourId: number, index: number, type: 'name' | 'description' | 'image', data: string) => {
    if (!state.data) return;
    const newData: Data = {
      ...state.data,
      tours: state.data.tours.map((tour, i) => {
        if (i === tourId) {
          return {
            ...tour,
            program: tour.program.map((day, i) => {
              if (i === index) {
                return {
                  ...day,
                  name: type === 'name' ? data : day.name,
                  description: type === 'description' ? data : day.description,
                  picture: type === 'image' ? data : day.picture,
                }
              }

              return day;
            }),
          };
        }

        return tour;
      }),
    }

    await onUpdateData(newData);
  };

  const deleteProgramDay = async (tourId: number, index: number) => {
    if (!state.data) return;
    const newData: Data = {
      ...state.data,
      tours: state.data.tours.map((tour, i) => {
        if (i === tourId) {
          return {
            ...tour,
            program: tour.program.filter((_, i) => i !== index),
          };
        }

        return tour;
      }),
    }

    await onUpdateData(newData);
  };

  useEffect(() => {
    (async () => {
      const data = await getData();
      console.log(data);
      setState({ data });
    })();
  }, []);

  return (
    <DataContext.Provider value={{
      data: state.data,
      updateData: onUpdateData,
      onAddImageToTab,
      addNewTab,
      deleteTab,
      onDeleteImageFromTab,
      updateTabInfo,
      onUpdateTourInfo,
      getTourById,
      updateDay,
      addDay,
      deleteDay,
      editQA,
      addQA,
      deleteQA,
      addTourLastTimeImage,
      deleteTourLastTimeImage,
      updateProgramDay,
      deleteProgramDay,
    }}>
      {state.data ? children : null}
    </DataContext.Provider>
  );
};


export default DataProvider;
