import { createContext } from "react";

const initialContextValue = {
    canEdit: false,
};

interface UserInfoContext {
    canEdit: boolean;
}

const UserInfoContext = createContext<UserInfoContext>({
    canEdit: false,
});

export default UserInfoContext;