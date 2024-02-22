import React, { createContext, ReactNode, useContext } from "react";

// define the type for ToastMessage
type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

// define the type for the AppContext
type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
};

// create the AppContext with an initial value of undefined
const AppContext = createContext<AppContextType | undefined>(undefined);


// define the props for AppContextProvider
type AppContextProviderProps = {
  children: ReactNode;
};

// create the AppContextProvider component
export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  // define the showToast function with a placeholder console.log
  const showToast = (toastMessage: ToastMessage) => {
    console.log(toastMessage);
  };

  // create the context value with the showToast function
  const contextValue: AppContextType = {
    showToast,
  };

  // provide the context value to the AppContextProvider
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// define a custom hook to use the AppContext for further usage across application
export const useAppContext = () => {
  const context = useContext(AppContext);

  // throw an error if useAppContext is used outside of AppContextProvider
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
};
 

/* 
import React, { useContext } from 'react';

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
}

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <AppContext.Provider value={{ showToast: () => undefined}}>
      {children}
    </AppContext.Provider>
  )
}

// define a custom hook for AppContext for further use across the app 
export const useAppContext = () => {
  const context = useContext(AppContext);

  return context as AppContext;
} */