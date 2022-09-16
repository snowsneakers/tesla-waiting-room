import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Moment from "react-moment";
import Input from "./Input";
import { useEntryContext } from "../hooks/useEntryContext";
import DeleteBox from "./DeleteBox";
import Posts from "../components/Posts";
import { Link } from "react-router-dom";
function Feed() {
  const { user } = useAuthContext();
  const { entries, dispatch } = useEntryContext();
  const [showFollowed, setShowFollowed] = useState(true)

  const getPost = async () => {
    const res = await fetch("http://localhost:8000/api/entries", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: "GET_ENTRIES", payload: data });
    }
  };

  useEffect(() => {
    getPost();
  }, [showFollowed]);


  return (
    <div className="w-[50%] max-h-screen p-5 border overflow-scroll scrollbar-hide">
      <header className="mb-5">
        <h1 className="text-3xl font-bold">Home</h1>
      </header>
      <Input />
      {/* {entries &&
        entries.map((entry) => {
          return (
              <div key={entry._id}>
                  <Posts entry={entry} />
              </div>
          );
        })} */}
         <div className="w-full flex items-center justify-between">
                    <div
                         className={
                              showFollowed
                                   ? `border border-gray-200 py-1 px-2 w-1/2 flex items-center justify-center cursor-pointer border-b-red-500`
                                   : `border border-gray-200 py-1 px-2 w-1/2 flex items-center justify-center cursor-pointer font-normal border-b-none`
                         }
                         onClick={() => setShowFollowed(true)}
                    >
                         <p className={showFollowed ? `font-bold` : `font-normal`}>
                              Followed Posts
                         </p>
                    </div>
                    <div
                         className={
                              !showFollowed
                                   ? `border border-gray-200 py-1 px-2 w-1/2 flex items-center justify-center cursor-pointer border-b-red-500`
                                   : `border border-gray-200 py-1 px-2 w-1/2 flex items-center justify-center cursor-pointer font-normal border-b-none`
                         }
                         onClick={() => setShowFollowed(false)}
                    >
                         <p
                              className={
                                   !showFollowed ? `font-bold` : `font-normal`
                              }
                         >
                              All Posts
                         </p>
                    </div>
               </div>
               {showFollowed ? (
                    <div className="">
                         {entries &&
                              entries
                                   .filter((entry) =>
                                        user.user.followings.includes(entry.user_id) || user.user._id === entry.user_id
                                   )
                                   .map((entry) => {
                                        return <Posts key={entry._id} entry={entry} />;
                                   })}
                    </div>
               ) : (
                    <div className="">
                         {entries &&
                              entries.map((entry) => {
                                        return <Posts entry={entry} />;
                                   })}
                    </div>
               )}
    </div>
  );
}
export default Feed;
