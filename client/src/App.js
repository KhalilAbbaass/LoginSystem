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

  const handleToggleLogin = () => {
    setToggleLogin(!toggleLogin);
  }

  useEffect(() => {
    getCurrentUser().then((result) => {
      console.log(result.data)

    })
  }, [toggleLogin])

  const router = createBrowserRouter([

    {
      element: (
        <NavbarOne/>
      ),
      children: [
        {
          path: "/",
          element: (
            <LoginRegister handleToggleLogin = {handleToggleLogin}/>  
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
