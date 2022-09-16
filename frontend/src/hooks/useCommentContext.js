import { CommentContext } from "../context/CommentContext";
import { useContext } from "react";

export const useCommentContext = () => {
     const context = useContext(CommentContext);
     if (!context) {
          throw Error(
               "useCommentContext must be used inside an CommentContextProvider"
          );
     }
     return context;
};