import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
     switch (action.type) {
          case "LOGIN":
               return { user: action.payload };
          case "LOGOUT":
               return { user: null };
          case "FOLLOW":
               return {
                    ...state, user: {...state.user, user: {...state.user.user, followings: [...state.user.user.followings, action.payload]}}
               }
          case "UNFOLLOW":
               return {
                    ...state, user: {...state.user, user: {...state.user.user, followings: state.user.user.followings.filter(following => following !== action.payload)}}
               }
          default:
               return state;
     }
};

export const AuthContextProvider = ({ children }) => {
     const [state, dispatch] = useReducer(authReducer, { user: null });

     useEffect(() => {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user) {
               dispatch({ type: "LOGIN", payload: user });
          }
     }, []);

     return (
          <AuthContext.Provider value={{ ...state, dispatch }}>
               {children}
          </AuthContext.Provider>
     );
};
