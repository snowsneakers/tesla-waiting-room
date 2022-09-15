import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
function Signup() {
     const { signup, error, isLoading } = useSignup();
     const [formData, setFormData] = useState({
          username: "",
          password: "",
          orderDate: "",
          trim: "",
          exterior: "",
          wheels: "",
          interior: "",
          fsd: "",
          location: "",
     });
     const {
          username,
          password,
          orderDate,
          trim,
          exterior,
          wheels,
          interior,
          fsd,
          location,
     } = formData;

     const handleChange = (e) => {
          setFormData((prevState) => ({
               ...prevState,
               [e.target.name]: e.target.value,
          }));
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          await signup(
               username,
               password,
               orderDate,
               trim,
               exterior,
               wheels,
               interior,
               fsd,
               location
          );
          console.log(formData);
     };

     return (
          <>
               <section>
                    <div className="flex items-center justify-center flex-col mb-5">
                         <h1 className="text-5xl font-bold flex items-center gap-2 mb-2">
                              Sign Up 🙋
                         </h1>
                         <p className="capitalize text-2xl font-medium">
                              Create An Account To Start Setting Tasks
                         </p>
                    </div>
                    <form
                         className="flex items-center justify-center flex-col gap-2 w-1/2 mx-auto"
                         onSubmit={handleSubmit}
                    >
                         <div className="w-full">
                              <h2 className="text-3xl font-semibold mb-5">
                                   Personal Details
                              </h2>
                              <div className="flex flex-wrap items-center justify-evenly gap-2 w-full mb-5">
                                   <input
                                        type="text"
                                        placeholder="username"
                                        name="username"
                                        value={username}
                                        onChange={handleChange}
                                        className="p-1 bg-gray-200 rounded placeholder:text-black indent-2 text-black focus:outline-0 w-1/3"
                                        autoComplete="off"
                                   />
                                   <input
                                        type="password"
                                        placeholder="password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        className="p-1 bg-gray-200 rounded placeholder:text-black indent-2 text-black focus:outline-0 w-1/3"
                                   />
                              </div>
                         </div>
                         <div>
                              <h2 className="text-3xl font-semibold mb-5">
                                   Car Details
                              </h2>
                              <div className="flex flex-wrap items-center justify-evenly gap-2 w-full mb-5">
                                   <div className="w-1/3">
                                        <h2>Order Date</h2>
                                        <input
                                             type="date"
                                             name="orderDate"
                                             value={orderDate}
                                             onChange={handleChange}
                                             className="p-1 bg-gray-200 rounded placeholder:text-black indent-2 text-black focus:outline-0 w-full"
                                        />
                                   </div>
                                   <div className="w-1/3">
                                        <h2>Trim</h2>
                                        <select
                                             name="trim"
                                             onChange={handleChange}
                                             className="p-1 bg-gray-200 rounded placeholder:text-black indent-2 text-black focus:outline-0 w-full"
                                             defaultValue="default"
                                        >
                                             <option value="default" disabled>
                                                  Trim
                                             </option>
                                             <option value="model 3 SR">
                                                  Model 3 SR
                                             </option>
                                             <option value="model 3 LR">
                                                  Model 3 LR
                                             </option>
                                             <option value="model 3 P">
                                                  Model 3 P
                                             </option>
                                             <option value="model Y">
                                                  Model Y LR
                                             </option>
                                             <option value="model Y">
                                                  Model Y P
                                             </option>
                                        </select>
                                   </div>
                                   <div className="w-1/3">
                                        <h2>Paint</h2>
                                        <select
                                             name="exterior"
                                             onChange={handleChange}
                                             className="p-1 bg-gray-200 rounded placeholder:text-black indent-2 text-black focus:outline-0 w-full"
                                             defaultValue="default"
                                        >
                                             <option value="default" disabled>
                                                  Paint
                                             </option>
                                             <option value="White">
                                                  White
                                             </option>
                                             <option value="Midnight Silver">
                                                  Midnight Silver
                                             </option>
                                             <option value="Blue">Blue</option>
                                             <option value="Black">
                                                  Black
                                             </option>
                                             <option value="Red">Red</option>
                                        </select>
                                   </div>
                                   <div className="w-1/3">
                                        <h2>Wheels</h2>
                                        <select
                                             name="wheels"
                                             onChange={handleChange}
                                             className="p-1 bg-gray-200 rounded placeholder:text-black indent-2 text-black focus:outline-0 w-full"
                                             defaultValue="default"
                                        >
                                             <option value="default" disabled>
                                                  Wheels
                                             </option>
                                             <option value="Aero">Aero</option>
                                             <option value="Sport">
                                                  Sport
                                             </option>
                                             <option value="Gemini">
                                                  Gemini
                                             </option>
                                             <option value="Induction">
                                                  Induction
                                             </option>
                                        </select>
                                   </div>
                                   <div className="w-1/3">
                                        <h2>Interior</h2>
                                        <select
                                             name="interior"
                                             onChange={handleChange}
                                             className="p-1 bg-gray-200 rounded placeholder:text-black indent-2 text-black focus:outline-0 w-full"
                                             defaultValue="default"
                                        >
                                             <option value="default" disabled>
                                                  Interior
                                             </option>
                                             <option value="Black">
                                                  Black
                                             </option>
                                             <option value="White">
                                                  White
                                             </option>
                                        </select>
                                   </div>
                                   <div className="w-1/3">
                                        <h2>fsd</h2>
                                        <select
                                             name="fsd"
                                             onChange={handleChange}
                                             className="p-1 bg-gray-200 rounded placeholder:text-black indent-2 text-black focus:outline-0 w-full"
                                             defaultValue="default"
                                        >
                                             <option value="default" disabled>
                                                  FSD
                                             </option>
                                             <option value="fsd">FSD</option>
                                             <option value="enhanced auto pilot">
                                                  Enhanced Auto Pilot
                                             </option>
                                             <option value="N/A">N/A</option>
                                        </select>
                                   </div>
                                   <div className="w-1/3">
                                        <h2>Location</h2>
                                        <input
                                             type="text"
                                             placeholder="optional"
                                             name="location"
                                             value={location}
                                             onChange={handleChange}
                                             className="p-1 bg-gray-200 rounded placeholder:text-black indent-2 text-black focus:outline-0 w-full"
                                        />
                                   </div>
                              </div>
                         </div>

                         <button
                              type="submit"
                              className="py-1 px-2 bg-[#a0c2fa] dark:bg-[#3c83f6] font-medium rounded w-full"
                              disabled={isLoading}
                         >
                              Add
                         </button>
                         {error && <div>{error}</div>}
                    </form>
               </section>
          </>
     );
}

export default Signup;
