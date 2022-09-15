import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
function Login() {
     const { login, error, isLoading } = useLogin();
     const [formData, setFormData] = useState({
          username: "",
          password: "",
     });
     const { username, password } = formData;

     const handleChange = (e) => {
          setFormData((prevState) => ({
               ...prevState,
               [e.target.name]: e.target.value,
          }));
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          await login(username, password);
     };

     return (
          <section className="min-h-screen flex flex-col items-center justify-center">
               <div className="w-1/2">
                    <div className="flex items-center justify-center flex-col mb-5">
                         <h1 className="text-5xl font-bold flex items-center gap-2 mb-2">
                              Login
                         </h1>
                         <p className="capitalize text-2xl font-medium">
                              Tesla Waiting Room
                         </p>
                    </div>
                    <form
                         className="flex items-center justify-center flex-col gap-2 w-1/2 mx-auto"
                         onSubmit={handleSubmit}
                    >
                         <input
                              type="text"
                              placeholder="username"
                              name="username"
                              value={username}
                              onChange={handleChange}
                              className="p-1 bg-gray-200 rounded placeholder:text-black indent-2 text-black focus:outline-0 w-full"
                              autoComplete="off"
                         />
                         <input
                              type="password"
                              placeholder="password"
                              name="password"
                              value={password}
                              onChange={handleChange}
                              className="p-1 bg-gray-200 rounded placeholder:text-black indent-2 text-black focus:outline-0 w-full"
                         />
                         <button
                              type="submit"
                              className="py-1 px-2 bg-red-500 font-medium rounded w-full"
                              disabled={isLoading}
                         >
                              Add
                         </button>
                    </form>
                    {error && <div>{error}</div>}
                    <p className="text-center mt-5">
                         Don't have an account? Sign up
                    </p>
               </div>
          </section>
     );
}

export default Login;
