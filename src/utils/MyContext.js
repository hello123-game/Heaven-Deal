// MyContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context
const MyContext = createContext();

// Create a Provider component
const MyProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState({ prop1: 'value1', prop2: 'value2' });

  return (
    <MyContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to use the context
const useMyContext = () => useContext(MyContext);

export { MyProvider, useMyContext };