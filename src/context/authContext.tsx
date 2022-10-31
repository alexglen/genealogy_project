import React, {createContext, useState, useContext} from 'react';

export const AuthContext = createContext({});

export const AuthContainer = ({children}: React.PropsWithChildren) => {
    const [isAuth, setAuth] = useState<boolean>(false);
    const changeAuthStatus = ((status: boolean) => setAuth(status));

    return (
        <AuthContext.Provider value={{isAuth, changeAuthStatus}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);