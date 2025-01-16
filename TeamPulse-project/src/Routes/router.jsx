import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from './../Layouts/Main';
import NotFound from './../Components/NotFound';
import Home from './../Layouts/Home';

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
          path:"",
          element:<Home></Home>,
        }
      ]
    },
    {
      path:'*',
      element:<NotFound></NotFound>
    }
  ]);