import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from './../Layouts/Main';
import NotFound from './../Components/NotFound';
import Home from './../Layouts/Home';
import Login from "../Layouts/Login";
import Register from './../Layouts/Register';
import Contact from './../Layouts/Contact';
import App from './../App';

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
          path:"/Contact",
          element:<Contact></Contact>,
        },
        {
          path:"/App",
          element:<App></App>,
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