import { createBrowserRouter } from 'react-router-dom';
import Main from './../Layouts/Main';
import NotFound from './../Components/NotFound';
import Home from './../Layouts/Home';
import Login from "../Layouts/Login";
import Register from './../Layouts/Register';
import Contact from './../Layouts/Contact';
import PrivateRoute from "./PrivateRoute";
import PrivateForHr from "./PrivateForHr";
import PrivateForAdmin from "./PrivateForAdmin";
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
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/Dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          {
            path: "/Dashboard/WorkSheet",
            element: <WorkSheet />,
          },
          {
            path: "/Dashboard/PayHistory",
            element: <PaymentHistory />,
          },
          {
            path: "/Dashboard/EmployeeList",
            element: <PrivateForHr><EmployeeList /></PrivateForHr>,
          },
          {
            path: "/Dashboard/details/:email",
            element: <PrivateForHr><DetailsOfSalary /></PrivateForHr>,
          },
          {
            path: "/Dashboard/Progress",
            element: <PrivateForHr><Progress /></PrivateForHr>,
          },
          {
            path: "/Dashboard/allEmployee",
            element: <PrivateForAdmin><AllEmployee /></PrivateForAdmin>,
          },
          {
            path: "/Dashboard/Payroll",
            element: <PrivateForAdmin><Payroll /></PrivateForAdmin>,
          },
        ],
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Register",
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
