import {
     BrowserRouter as Router,
     Routes,
     Route,
     Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import { useAuthContext } from "./hooks/useAuthContext";
import Profile from './pages/Profile'

function App() {
     const { user } = useAuthContext();
     return (
          <>
               <div className="">
                    <Router>
                         {/* <Header /> */}
                         <Routes>
                              <Route
                                   path="/"
                                   element={
                                        user ? (
                                             <Dashboard />
                                        ) : (
                                             <Navigate to="/login" />
                                        )
                                   }
                              />
                              <Route
                                   path="/login"
                                   element={
                                        !user ? <Login /> : <Navigate to="/" />
                                   }
                              />
                              <Route
                                   path="/signup"
                                   element={
                                        !user ? <Signup /> : <Navigate to="/" />
                                   }
                              />
                              <Route path="/profile/:username" element={user ? <Dashboard/> : <Navigate to="/login"/>} />
                              <Route path="/api/entries/:postId" element={user ? <Dashboard/> : <Navigate to="/login"/>} />
                              <Route path="/:settings" element={user ? <Dashboard/> : <Navigate to="/login"/>} />
                         </Routes>
                    </Router>
               </div>
          </>
     );
}

export default App;
