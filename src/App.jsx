import { useState } from 'react'
import './App.css'
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Layout from './Components/Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Settings from './Components/Settings/Settings';
import PostDetails from './Components/PostDetails/PostDetails';
import AuthContextProvider from './context/AuthContext';
import MyPosts from './Components/MyPosts/MyPosts';
import Community from './Components/Community/Community';
import SavedPosts from './Components/SavedPosts/SavedPosts';
import NavLayout from './Components/NavLayout/NavLayout';
import Notifications from './Components/Notifications/Notifications';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import GuestRoute from './Components/GuestRoute/GuestRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';


const router = createBrowserRouter([

  {
    path: '', element: <Layout />, children: [

      {
        index: true, element: <ProtectedRoute><Home /></ProtectedRoute>
      },
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'myPosts', element: <ProtectedRoute><MyPosts /></ProtectedRoute> },
      { path: 'community', element: <ProtectedRoute><Community /></ProtectedRoute> },
      { path: 'saved', element: <ProtectedRoute><SavedPosts /></ProtectedRoute> },

    ]
  },

  {
    path: '', element: <NavLayout />, children: [

      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "/post/:id", element: <ProtectedRoute><PostDetails /></ProtectedRoute> },
      { path: 'settings', element: <ProtectedRoute><Settings /></ProtectedRoute> },
      { path: 'notifications', element: <ProtectedRoute><Notifications /></ProtectedRoute> },

    ]
  },

  { path: 'login', element: <GuestRoute><Signin /> </GuestRoute> },
  { path: 'signup', element: <GuestRoute><Signup /></GuestRoute> },


])

const queryClientConfig = new QueryClient();

function App() {

  return (
    <>

      <QueryClientProvider client={queryClientConfig}>

        <AuthContextProvider >

          <RouterProvider router={router} />

        </AuthContextProvider>

      </QueryClientProvider>
      <ToastContainer />
    </>
  )
}

export default App

