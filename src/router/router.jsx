
import {
  createBrowserRouter
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Events from "../Pages/Events/Events";
import AddEvent from "../Pages/AddEvent/AddEvent";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    errorElement: <h2>Page Not Found</h2>,
    children:[
       {
         path : "/",
         element : <Home/>
       },
       {
        path : "/events",
        element: <Events/>
       },
       {
        path : "/add-event",
        element : <AddEvent/>
       },
       {
        path : "/register",
        element: <Register/>
       },
       {
        path:"/login",
        element:<Login/>
       }
    ]
  },
]);

export default router;