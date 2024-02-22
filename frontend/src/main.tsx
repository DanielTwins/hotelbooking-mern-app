import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContext.tsx";

// create a new instance of QueryClient with custom default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // set the number of retries to 0 after an error in this case
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/*  wrap the app comp. with QueryClientProvider to provide React Query functionality */}
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
