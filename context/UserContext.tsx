import React from "react";

interface UserContextProps {
    changeUserState: () => void;
}

export const UserContext = React.createContext<UserContextProps>({
    changeUserState: () => { },
});