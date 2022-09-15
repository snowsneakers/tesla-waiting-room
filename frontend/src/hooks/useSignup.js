import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
     const [error, setError] = useState(null);
     const [isLoading, setIsLoading] = useState(null);
     const { dispatch } = useAuthContext();
     const signup = async (
          username,
          password,
          orderDate,
          trim,
          exterior,
          wheels,
          interior,
          fsd,
          location
     ) => {
          setIsLoading(true);
          setError(null);

          const res = await fetch("http://localhost:8000/api/user/signup", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                    username,
                    password,
                    orderDate,
                    trim,
                    exterior,
                    wheels,
                    interior,
                    fsd,
                    location,
               }),
          });
          const data = await res.json();

          if (!res.ok) {
               setIsLoading(false);
               setError(data.error);
          }
          if (res.ok) {
               localStorage.setItem("user", JSON.stringify(data));
               dispatch({ type: "LOGIN", payload: data });
               setIsLoading(false);
          }
     };

     return { signup, isLoading, error };
};
