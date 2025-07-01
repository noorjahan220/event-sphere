
import {
  createBrowserRouter
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Events from "../Pages/Events/Events";
import AddEvent from "../Pages/AddEvent/AddEvent";
import MyEvent from "../Pages/MyEvent/MyEvent";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h2>Page Not Found</h2>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/events",
        element: <PrivateRoute><Events /></PrivateRoute>
      },
      {
        path: "/add-event",
        element: <PrivateRoute><AddEvent /></PrivateRoute>
      },
      {
        path: "/my-event",
        element: <PrivateRoute><MyEvent /></PrivateRoute>
      },
      {
        path: "/register",
        element: <Register />
      },

      {
        path: "/login",
        element: <Login />
      }
    ]
  },
]);

export default router;