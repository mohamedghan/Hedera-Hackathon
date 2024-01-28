import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SignIn from './pages/SignIn.jsx';
import { defer, redirect } from "react-router-dom";
import { authrequest } from './utils/api.js';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    loader: async function({ request }) {
        const token = localStorage.getItem("token")
        if(!token) {
          return redirect("/login")
        }

        const res = authrequest("/course", "get", token)
        const user = authrequest("/user", "get", token)
        return defer({courses: res, user});
    },
    element: <App />,
  },
  {
    path: "/login",
    loader: async function({ request }) {
      const token = localStorage.getItem("token")
      if(token) {
        return redirect("/")
      }
      return true;
  },
    element: <SignIn />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
