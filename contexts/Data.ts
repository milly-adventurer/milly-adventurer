import React from "react";
import Tour, { Tours } from "../interfaces/Tour";

interface DataContext {
  getTourById(id: string): Tour | undefined | null;
  tours: null | Tours;
}

export const initialContextValue: DataContext = {
  getTourById: (id: string) => { return undefined },
  tours: null,
};

const DataContext = React.createContext<DataContext>(initialContextValue);

export default DataContext
