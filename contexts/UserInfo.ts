import { createContext } from "react";

const initialContextValue = {
	canEdit: false,
	updateValue: () => {},
};

interface UserInfoContext {
  canEdit: boolean;
	updateValue(value: boolean): void;
}

const UserInfoContext = createContext<UserInfoContext>(initialContextValue);

export default UserInfoContext;
