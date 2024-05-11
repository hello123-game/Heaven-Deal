import React from 'react';
import './App.css';
import Head from './components/Head';
import Foot from './components/Foot';
// import Body from './components/Body';
import SignUp from './components/SignUp';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './components/Home';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail';

const AppLayout = () => (
  
    <div className='App'>
    <Head />
    <Outlet />
    <Foot />
  </div>
  
  
)
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element:<Home />
      },
      {
        path:"signup",
        element:<SignUp />
      },
      {
        path:"login",
        element:<Login />
      },
      {
        path:"verifyemail/:userId",
        element:<VerifyEmail />
      },
    ],
  },
])

function App() {
  return (
    <div>
      
      <RouterProvider router={router} />
      
    </div>
  );
}

export default App;
