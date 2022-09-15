import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import Feed from '../components/Feed';
import Posts from '../components/Posts';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEntryContext } from '../hooks/useEntryContext';
import Input from '../components/Input';
function SoloPost() {
     const postId = useParams().postId
     const {user} = useAuthContext()
     const {entries, dispatch} = useEntryContext()
     const [comments, setComments] = useState([])

     const getPost = async () => {
        const res = await fetch("http://localhost:8000/api/entries", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        if (res.ok) {
          dispatch({ type: "GET_ENTRIES", payload: data });
        }
      };
     
      const getComments = async () => {
        const res = await fetch(`http://localhost:8000/api/entries/comment/${postId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setComments(data)
        }
      };
    
      useEffect(() => {
        getPost();
        getComments()
      }, [postId]);

      console.log(comments)

     return (
         <div className='w-[50%] max-h-screen p-5 border overflow-scroll scrollbar-hide'>
            <div>
                {entries && entries.filter(entry => entry._id === postId).map(entry => {
                    return (
                        <Posts key={entry._id} entry={entry} />
                        )
                    })}
            </div>
                    <Input />
            <div>
                <h2>Comments</h2>
                  {comments && comments.map(comment => {
                    return (
                        <Posts key={comment._id} entry={comment} />
                        )
                    })}
            </div>
         </div>
     );
}
export default SoloPost;