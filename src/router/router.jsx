
import {
  createBrowserRouter
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
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
        path : "/register",
        element: <Register/>
       },
    ]
  },
]);

export default router;