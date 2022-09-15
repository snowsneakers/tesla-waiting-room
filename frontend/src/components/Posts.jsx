import Moment from "react-moment";
import { useAuthContext } from "../hooks/useAuthContext";
import DeleteBox from "./DeleteBox";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import {BiCommentAdd} from 'react-icons/bi'
import {Link, useParams} from 'react-router-dom'
function Posts({ entry }) {
     const postId = useParams().postId
     const { user: loggedUser } = useAuthContext();
     const [user, setUser] = useState([])
     const [likes, setLikes] = useState(entry.likes.length);
     const [isLiked, setIsLiked] = useState(false);
     useEffect(() => {
          setLikes(entry.likes.length);
          setIsLiked(entry.likes.includes(loggedUser.user._id));
     }, [entry.likes]);
     const handleLike = async (id) => {
          const res = await fetch(
               `http://localhost:8000/api/entries/${id}/likes`,
               {
                    method: "PUT",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${loggedUser.token}`,
                    },
               }
          );
          const data = await res.json();
          console.log(data);
          setLikes(isLiked ? likes - 1 : likes + 1);
          setIsLiked((prevState) => !prevState);
     };

     useEffect(()=>{
          const getUser = async () => {
              const res = await fetch(`http://localhost:8000/api/user/${entry.user_id}`);
              const data = await res.json()
              setUser(data);
          };
          
          getUser();
      }, [entry.user_id]);

     //  console.log(user)

     return (
          <div className="p-5 bg-white mb-5 rounded border border-gray-200">
               <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                         <Link to={`/profile/${entry.user_username}`} className="flex items-center gap-2">
                              <img src={user.profilePicture} alt="avatar" className="w-[50px] rounded-full" />
                              <h2 className="text-xl">{entry.user_username}</h2>
                         </Link>
                    </div>
                    {loggedUser.user._id === entry.user_id && (
                         <DeleteBox entry={entry} />
                    )}
               </div>
               <div className="mb-5">
                    <p className="font-semibold">
                         <Moment format="MM/DD/YY">{entry.start}</Moment> -{" "}
                         <Moment format="MM/DD/YY">{entry.end}</Moment>
                    </p>
                    <p>{entry.text}</p>
               </div>
               <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                         <div className="flex items-center gap-2">
                              {isLiked ? (
                                   <FaThumbsUp
                                        className=""
                                        onClick={() => handleLike(entry._id)}
                                   />
                              ) : (
                                   <FaRegThumbsUp
                                        className="cursor-pointer"
                                        onClick={() => handleLike(entry._id)}
                                   />
                              )}
                              {/* <span>{likes} people found this helpful</span> */}
                              <p>{likes}</p>
                         </div>
                         {!postId && <div>
                              <Link to={`/api/entries/${entry._id}`}>
                                   <BiCommentAdd />
                              </Link>
                         </div>}
                    </div>
                    <p>
                         <Moment fromNow>{entry.createdAt}</Moment>
                    </p>
               </div>
          </div>
     );
}
export default Posts;
