import NavbarOne from "./components/navbar/NavbarOne";
import "./App.css"
import LoginRegister from "./components/loginRegister/LoginRegister";

import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import UserPage from "./pages/UserPages/UserPage";
import AdminPage from "./pages/AdminPages/AdminPage";
import { getCurrentUser } from "./services/GetCurrentUser";
import { useEffect, useState } from "react";



function App() {

  const [toggleLogin, setToggleLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  
  

  const handleToggleLogin = () => {
    setToggleLogin(!toggleLogin);
  }

  useEffect(() => {
    getCurrentUser().then((result) => {
      console.log(result.data)
      if(result.data.role === 'user'){
        setCurrentUser(result.data.user)
        
      }
      if(result.data.role === 'admin'){
        setCurrentUser(result.data.admin)
        
      }

    })
  }, [toggleLogin])

  const router = createBrowserRouter([

    {
      element: (
        <NavbarOne currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
      ),
      children: [
        {
          path: "/",
          element: (
            <LoginRegister handleToggleLogin = {handleToggleLogin} currentUser = {currentUser}/>  
          ),
        },
        {
          path: "/User",
          element: (
            <UserPage/>
          ),
        },
        {
          path: "/Admin",
          element:(
            <AdminPage/>
          ),
        }
      ]
    }
    
  ]);



  return (
    <div  className="App">
      
      <div className="AppContent">
        
        <RouterProvider router={router}/>

      </div>
    </div>
  );
}

export default App;
