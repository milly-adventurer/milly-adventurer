import React from "react";
import Data from "../interfaces/Tour";

interface EditContext {
  data: Data | null;
  updateData(newData: Data): void;
}

export const initialContextValue: EditContext = {
  data: null,
  updateData: () => {},
};

const EditContext = React.createContext<EditContext>(initialContextValue);

export default EditContext
