import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { DarkModeContextProvider } from "./context/darkModeContext";

import { QueryClient, QueryClientProvider } from 'react-query';
// create an instance 
const queryClient = new QueryClient();



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <DarkModeContextProvider >
        <App />
      </DarkModeContextProvider>
      </QueryClientProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
