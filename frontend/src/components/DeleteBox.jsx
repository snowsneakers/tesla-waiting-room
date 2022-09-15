import { useAuthContext } from "../hooks/useAuthContext";
import { useEntryContext } from "../hooks/useEntryContext";
import { FiDelete } from "react-icons/fi";

function DeleteBox({ entry }) {
     const { entries, dispatch } = useEntryContext();
     const { user } = useAuthContext();

     const handleDelete = async (id) => {
          const res = await fetch("http://localhost:8000/api/entries/" + id, {
               method: "DELETE",
               headers: { Authorization: `Bearer ${user.token}` },
          });
          const data = await res.json();
          console.log(data);
          if (res.ok) {
               dispatch({ type: "DELETE_ENTRY", payload: data });
          }
     };

     return (
          <div>
               <FiDelete
                    className="text-xl cursor-pointer"
                    onClick={() => handleDelete(entry._id)}
               />
          </div>
     );
}
export default DeleteBox;
