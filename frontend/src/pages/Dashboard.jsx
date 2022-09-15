import Feed from "../components/Feed";
import RightBar from "../components/RightBar";
import LeftBar from "../components/LeftBar";
import {useParams} from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import Profile from "./Profile";
import SoloPost from "./SoloPost";
import Settings from "./Settings";
function Dashboard() {
     const username = useParams().username
     const postId = useParams().postId
     const settings = useParams().settings
     // console.log(username)
     // console.log(postId)
     // console.log(settings)
     return (
          <main className="flex w-full lg:w-[1280px] mx-auto">
               <LeftBar />
               {username  ?  <Profile /> : postId ? <SoloPost /> : settings ? <Settings /> : <Feed />}
               <RightBar />
          </main>
     );
}
export default Dashboard;
