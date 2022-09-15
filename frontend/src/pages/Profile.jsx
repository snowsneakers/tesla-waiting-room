import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import { useEntryContext } from "../hooks/useEntryContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Posts from "../components/Posts";
import Moment from "react-moment";
import {RiUserFollowLine, RiUserUnfollowLine} from 'react-icons/ri'
function Profile() {
     const username = useParams().username;
     const [user, setUser] = useState([]);
     const { user: loggedUser, dispatch: loggedUserDispatch } = useAuthContext();
     const { entries, dispatch } = useEntryContext();
     const [showLiked, setShowLiked] = useState(false);
     const [followed, setFollow] = useState(false)
     
     

     const getUser = async () => {
          const res = await fetch(
               `http://localhost:8000/api/user/profile/${username}`
          );
          const data = await res.json();
          setUser(data);
          setFollow(loggedUser.user.followings.includes(data._id))
     };

     const getPosts = async () => {
          const res = await fetch("http://localhost:8000/api/entries", {
               headers: { Authorization: `Bearer ${loggedUser.token}` },
          });
          const data = await res.json();
          if (res.ok) {
               dispatch({ type: "GET_ENTRIES", payload: data });
          }
     };

     useEffect(() => {
          getUser();
          setShowLiked(false);
     }, [username]);

     useEffect(() => {
          getPosts();
     }, [showLiked]);

 


     const handleFollowClick = async () => {
          const currentUser = JSON.parse(localStorage.getItem("user"));
          try {
               if(followed){
                    const res = await fetch(`http://localhost:8000/api/user/${user._id}/follow`, {
                         method: "PUT",
                         headers: {"Content-Type": "application/json"},
                         body: JSON.stringify({loggedUserId: loggedUser.user._id, profileUser: user._id})
                    })
                    const data = await res.json()
                    
                    if(res.ok){
                         loggedUserDispatch({type: "UNFOLLOW", payload: user._id})
                         //    localStorage.setItem("user", JSON.stringify({token, ...loggedUser}))
                         localStorage.setItem("user", JSON.stringify({...currentUser, user: {...currentUser.user, followings: currentUser.user.followings.filter(following => following !== user._id)}}))
                    }
               } else {
                    const res = await fetch(`http://localhost:8000/api/user/${user._id}/follow`, {
                         method: "PUT",
                         headers: {"Content-Type": "application/json"},
                         body: JSON.stringify({loggedUserId: loggedUser.user._id, profileUser: user._id})
                    })
                    const data = await res.json()
                    if(res.ok){
                         loggedUserDispatch({type: "FOLLOW", payload: user._id})
                         // localStorage.setItem("user", JSON.stringify({ ...loggedUser, user: {followings: }}))
                         localStorage.setItem("user", JSON.stringify({...currentUser, user: {...currentUser.user, followings: [...currentUser.user.followings, user._id]}}))
                    }
                    // localStorage.removeItem("user")
               }
          } catch (error) {
               console.log(error)
          }
          setFollow(!followed)
     }


     console.log(followed)
     // console.log(loggedUser.user.followings.includes(user._id))
     console.log(loggedUser)

     return (
          <div className="w-[50%] max-h-screen p-5 border overflow-scroll scrollbar-hide">
               <header className="mb-5">
                    <h1 className="text-3xl font-bold">Profile</h1>
               </header>
               <div className="border border-gray-200 mb-5 p-5 flex flex-row-reverse items-center justify-between">
                    <div className="flex flex-col items-center justify-center">
                         <img
                              src={user.profilePicture}
                              alt="avatar"
                              className="w-[100px] rounded-full"
                         />
                         <h1 className="text-2xl font-medium">
                              {user.username}
                         </h1>
                    </div>
                    <ul>
                         <li>
                              <span className="font-semibold capitalize">
                                   order date
                              </span>
                              :{" "}
                              <Moment format="MM/DD/YY">
                                   {user.orderDate}
                              </Moment>
                         </li>
                         <li>
                              <span className="font-semibold">Trim</span>:{" "}
                              {user.trim}
                         </li>
                         <li>
                              <span className="font-semibold">Paint</span>:{" "}
                              {user.exterior}
                         </li>
                         <li>
                              <span className="font-semibold">Interior</span>:{" "}
                              {user.interior}
                         </li>
                         <li>
                              <span className="font-semibold">Wheels</span>:{" "}
                              {user.wheels}
                         </li>
                         {loggedUser.user.username !== username && <li>
                              {followed ? <button className="py-1 px-2 bg-red-500 rounded text-white flex items-center gap-2" onClick={handleFollowClick}>Unfollow <RiUserUnfollowLine /></button> :
                              <button className="py-1 px-2 bg-red-500 rounded text-white flex items-center gap-2" onClick={handleFollowClick}>Follow <RiUserFollowLine /></button>}
                         </li>}
                         followings:
                         {user.followings && user.followings.map(x => <li>{x}</li>)}
                    </ul>
               </div>
               <div className="w-full flex items-center justify-between">
                    <div
                         className={
                              !showLiked
                                   ? `border border-gray-200 py-1 px-2 w-1/2 flex items-center justify-center cursor-pointer border-b-red-500`
                                   : `border border-gray-200 py-1 px-2 w-1/2 flex items-center justify-center cursor-pointer font-normal border-b-none`
                         }
                         onClick={() => setShowLiked(false)}
                    >
                         <p
                              className={
                                   !showLiked ? `font-bold` : `font-normal`
                              }
                         >
                              Posts
                         </p>
                    </div>
                    <div
                         className={
                              showLiked
                                   ? `border border-gray-200 py-1 px-2 w-1/2 flex items-center justify-center cursor-pointer border-b-red-500`
                                   : `border border-gray-200 py-1 px-2 w-1/2 flex items-center justify-center cursor-pointer font-normal border-b-none`
                         }
                         onClick={() => setShowLiked(true)}
                    >
                         <p className={showLiked ? `font-bold` : `font-normal`}>
                              Liked Posts
                         </p>
                    </div>
               </div>
               {showLiked ? (
                    <div className="">
                         {entries &&
                              entries
                                   .filter((entry) =>
                                        entry.likes.includes(user._id)
                                   )
                                   .map((entry) => {
                                        return <Posts entry={entry} />;
                                   })}
                    </div>
               ) : (
                    <div className="">
                         {entries &&
                              entries
                                   .filter(
                                        (entry) =>
                                             entry.user_username === username
                                   )
                                   .map((entry) => {
                                        return <Posts entry={entry} />;
                                   })}
                    </div>
               )}
          </div>
     );
}

export default Profile;
