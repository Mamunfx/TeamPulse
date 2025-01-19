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
import PaymentHistory from './../Layouts/PaymentHistory';
import EmployeeList from './../Layouts/EmployeeList';
import WorkSheet from './../Layouts/WorkSheet';
import AllEmployee from './../Layouts/AllEmployee';
import Payroll from './../Layouts/Payroll';
import DetailsOfSalary from './../Layouts/DetailsOfSalary';
import Progress from './../Layouts/Progress';

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
          children:[
            {
              path:"/Dashboard/WorkSheet",
              element:<WorkSheet></WorkSheet>,
            },
            {
              path:"/Dashboard/PayHistory",
              element:<PaymentHistory></PaymentHistory>,
            },
            {
              path:"/Dashboard/EmployeeList",
              element:<EmployeeList></EmployeeList>,
            },
            {
              path:"/Dashboard/details/:email",
              element:<DetailsOfSalary></DetailsOfSalary>,
            },
            {
              path:"/Dashboard/Progress",
              element:<Progress></Progress>,
            },
            {
              path:"/Dashboard/allEmployee",
              element:<AllEmployee></AllEmployee>,
            },
            {
              path:"/Dashboard/Payroll",
              element:<Payroll></Payroll>,
            },
          ]
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