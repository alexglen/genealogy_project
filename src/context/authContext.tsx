import React, {createContext, useState, useContext} from 'react';
import {getCookie} from "../helpers";

export const AuthContext = createContext<object>({});

export const AuthContainer = ({children}: React.PropsWithChildren) => {
    const token = getCookie("token");
    const [isAuth, setAuth] = useState<boolean>(!!token);
    const changeAuthStatus = ((status: boolean) => setAuth(status));

    return (
        <AuthContext.Provider value={{isAuth, changeAuthStatus}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);