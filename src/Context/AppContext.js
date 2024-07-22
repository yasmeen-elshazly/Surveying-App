import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [points, setPoints] = useState([
        { latitude: 30.0444, longitude: 31.2357, name: 'Building 1' },
        { latitude: 30.0522, longitude: 31.2336, name: 'Building 2' },
        { latitude: 30.0469, longitude: 31.2404, name: 'Building 3' },
        { latitude: 30.0569, longitude: 31.2314, name: 'Building 4' },
        { latitude: 30.0420, longitude: 31.2292, name: 'Building 5' },
        { latitude: 30.0402, longitude: 31.2368, name: 'Building 6' },
    ]);
    const [currentPointIndex, setCurrentPointIndex] = useState(0);
    const [isFirstPointSubmitted, setIsFirstPointSubmitted] = useState(false);

    return (
        <AppContext.Provider value={{ points, setPoints, currentPointIndex, setCurrentPointIndex, isFirstPointSubmitted, setIsFirstPointSubmitted }}>
            {children}
        </AppContext.Provider>
    );
};
