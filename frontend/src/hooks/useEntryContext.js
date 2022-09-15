import { EntryContext } from "../context/EntryContext";
import { useContext } from "react";

export const useEntryContext = () => {
     const context = useContext(EntryContext);
     if (!context) {
          throw Error(
               "useEntryContext must be used inside an EntryContextProvider"
          );
     }
     return context;
};