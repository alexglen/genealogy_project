import React, {createContext, useState, useContext} from 'react';

export const ScaleContext = createContext({});

export const ScaleContainer = ({children}: React.PropsWithChildren) => {
    const [scale, setScale] = useState<number>(1);
    const changeScale = ((scale: number) => setScale(scale));

    return (
        <ScaleContext.Provider value={{scale, changeScale}}>
            {children}
        </ScaleContext.Provider>
    );
};

export const useScale = () => useContext(ScaleContext);