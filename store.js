import React, {createContext, useState} from 'react';

const initialState = {loggedIn: 'loading'};

export const Context = createContext();

const Store = ({children}) => {
  const [state, setState] = useState(initialState);
  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default Store;
