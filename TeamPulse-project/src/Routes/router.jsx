import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from './../Layouts/Main';
import NotFound from './../Components/NotFound';
import Home from './../Layouts/Home';
import Login from "../Layouts/Login";
import Register from './../Layouts/Register';
import Contact from './../Layouts/Contact';
import PrivateRoute from "./PrivateRoute";
import Dashboard from './../Layouts/Dashboard';

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
          path:"",
          element:<Home></Home>,
        },
        {
          path:"/Dashboard",
          element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        },
        {
          path:"/Contact",
          element:<Contact></Contact>,
        },
        {
          path:"Login",
          element:<Login></Login>,
        },
        {
          path:"Register",
          element:<Register></Register>,
        },
      ]
    },
    {
      path:'*',
      element:<NotFound></NotFound>
    }
  ]);