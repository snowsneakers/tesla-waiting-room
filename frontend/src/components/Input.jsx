import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEntryContext } from "../hooks/useEntryContext";
import {useParams} from "react-router-dom"
function Input() {
     const { user } = useAuthContext();
     const { dispatch } = useEntryContext();
     const [userPost, setUserPost] = useState({
          start: "",
          end: "",
          text: "",
     });
     const postId = useParams().postId

     const handleChange = (e) => {
          setUserPost((prevState) => ({
               ...prevState,
               [e.target.name]: e.target.value,
          }));
     };

     const { start, end, text } = userPost;

     const handleFeedSubmit = async (e) => {
          e.preventDefault();
          const res = await fetch("http://localhost:8000/api/entries", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
               },
               body: JSON.stringify({ start, end, text }),
          });
          const data = await res.json();
          console.log(data);
          if (res.ok) {
               dispatch({ type: "CREATE_ENTRY", payload: data });
               setUserPost({
                    start: "",
                    end: "",
                    text: "",
               });
          }
          
     };
   
     const handleCommentSubmit = async (e) => {
          e.preventDefault();
          const res = await fetch(`http://localhost:8000/api/entries/${postId}`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
               },
               body: JSON.stringify({ text, postId }),
          });
          const data = await res.json();
          setUserPost({
               text: "",
          });
     };
     return (
          <div className="p-2 mb-5">
               <form
                    onSubmit={postId ?  handleCommentSubmit : handleFeedSubmit}
                    className="flex items-center flex-col gap-2"
               >
                    <div className="flex items-center justify-center gap-2 w-full">
                         {!postId &&<div className=" flex flex-col items-center w-full">
                              {/* <label htmlFor="start" className="font-medium">
                                   First Date
                              </label> */}
                              <input
                                   type="text"
                                   placeholder="First Date"
                                   onFocus={(e) => (e.target.type = "date")}
                                   onBlur={(e) => (e.target.type = "text")}
                                   value={start}
                                   name="start"
                                   onChange={handleChange}
                                   className="w-full bg-white py-1 px-2 rounded placeholder:text-black placeholder:font-medium border border-gray-200 focus:outline-none"
                              />
                         </div>}
                        {!postId && <div className=" flex flex-col items-center w-full">
                              {/* <label htmlFor="start" className="font-medium">
                                   Second Date
                              </label> */}
                              <input
                                   type="text"
                                   placeholder="Second Date"
                                   onFocus={(e) => (e.target.type = "date")}
                                   onBlur={(e) => (e.target.type = "text")}
                                   value={end}
                                   name="end"
                                   onChange={handleChange}
                                   className="w-full rounded bg-white py-1 px-2 placeholder:text-black placeholder:font-medium border border-gray-200 focus:outline-none"
                              />
                         </div>}
                    </div>
                    <div className="w-full">
                         <textarea
                              type="text"
                              value={text}
                              name="text"
                              placeholder={postId ? "Enter a comment" : "Enter a message"}
                              onChange={handleChange}
                              rows={5}
                              cols={30}
                              className="bg-white placeholder:text-black placeholder:font-medium placeholder:capitalize w-full rounded p-2 border border-gray-200 focus:outline-none"
                         />
                    </div>
                    <button
                         className="bg-red-500 py-1 px-2 w-full rounded text-bold text-white"
                         type="submit"
                    >
                        {postId ? "Comment" : "Post"}
                    </button>
               </form>
          </div>
     );
}

export default Input;
