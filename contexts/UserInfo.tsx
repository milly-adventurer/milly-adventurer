import { createContext, PropsWithChildren, useState } from "react";

const initialContextValue = {
	canEdit: false,
	updateValue: () => {},
};

interface UserInfoContext {
  canEdit: boolean;
	updateValue(value: boolean): void;
}

export const UserInfoContext = createContext<UserInfoContext>(initialContextValue);

const UserInfoProvider = ({
	children,
}: PropsWithChildren<{}>) => {
	const [state, setState] = useState({
		canEdit: false,
	});
	console.log(state);
	return (
		<UserInfoContext.Provider value={{
			canEdit: state.canEdit,
			updateValue: (newV: boolean) => setState({ ...state, canEdit: newV }), 
		}}>
			{children}
		</UserInfoContext.Provider>
	);
};

export default UserInfoProvider;
