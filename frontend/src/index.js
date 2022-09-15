import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { EntryContextProvider } from "./context/EntryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
     <React.StrictMode>
          <AuthContextProvider>
               <EntryContextProvider>
                    <App />
               </EntryContextProvider>
          </AuthContextProvider>
     </React.StrictMode>
);
