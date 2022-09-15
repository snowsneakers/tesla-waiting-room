import { useAuthContext } from "../hooks/useAuthContext";
import { FaRegUser } from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import { useLogout } from "../hooks/useLogout";
import { Link, useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
function LeftBar() {
     const { user: loggedUser } = useAuthContext();
     const { logout } = useLogout();
     const username = useParams().username;
     const [user, setUser]= useState([])

     const handleLogout = () => {
          logout();
     };

     const getUser = async () => {
          const res = await fetch(
               `http://localhost:8000/api/user/profile/${loggedUser.user.username}`
          );
          const data = await res.json();
          setUser(data);
     };

     useEffect(() => {
          getUser();
     }, [username]);

     // console.log(user)
     // console.log(loggedUser)

     return (
          <div className="w-[20%] max-h-screen p-5">
               <header className="px-4">
                    {/* <h1 className="text-3xl font-bold text-red-500">
                         Tesla Waiting Room
                    </h1> */}
                    <Link to="/">
                         <img
                              src="https://www.svgrepo.com/show/331599/tesla.svg"
                              alt=""
                              className="w-[35px]"
                         />
                    </Link>
               </header>
               <div className="pt-2 bg-white overflow-hidden">
                    <ul className="">
                         <li className="py-8 px-4">
                              <div className="flex items-center gap-2">
                                   <img src={user.profilePicture} alt="" className="rounded-full w-[25px]" />
                                   <Link to={`/profile/${loggedUser.user.username}`}>
                                        <h2 className="text-2xl font-medium">
                                             {loggedUser.user.username}
                                        </h2>
                                   </Link>
                              </div>
                              {/* <Link
              to={`/profile/${user.user.username}`}
              className="flex items-center gap-2"
            >
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.salisburyut.com%2Fwp-content%2Fuploads%2F2020%2F09%2Favatar-1-768x768.jpeg&f=1&nofb=1"
                alt="avatar"
                className="w-[50px]"
              />
              <h2 className="text-2xl font-medium">{user.user.username}</h2>
            </Link> */}
                         </li>
                         <li className="py-5 px-4 hover:bg-gray-200 transition duration-300 ease-in-out">
                              {username ? (
                                   <Link to="/">
                                        <div className="flex items-center gap-2">
                                             <HiOutlineHome className="text-2xl" />
                                             <span className="text-xl capitalize font-medium">
                                                  Home
                                             </span>
                                        </div>
                                   </Link>
                              ) : (
                                   <Link to={`/profile/${loggedUser.user.username}`}>
                                        <div className="flex items-center gap-2">
                                             <FaRegUser className="text-xl" />
                                             <span className="text-xl capitalize font-medium">
                                                  profile
                                             </span>
                                        </div>
                                   </Link>
                              )}
                         </li>
                         <li className="py-5 px-4 hover:bg-gray-200 transition duration-300 ease-in-out">
                              <Link to="/settings">
                                   <div className="flex items-center gap-2">
                                        <FiSettings className="text-2xl" />
                                        <span className="text-xl capitalize font-medium">
                                             settings
                                        </span>
                                   </div>
                              </Link>
                         </li>
                         <li
                              className="py-5 px-4 hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer"
                              onClick={handleLogout}
                         >
                              <div className="flex items-center gap-2">
                                   <FiLogOut className="text-2xl" />
                                   <span className="text-xl capitalize font-medium">
                                        logout
                                   </span>
                              </div>
                         </li>
                    </ul>
               </div>
          </div>
     );
}
export default LeftBar;
