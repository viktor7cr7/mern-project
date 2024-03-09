import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom' 
import {
  HomeLayout,
  Landing, 
  Register, 
  Login, 
  DashboardLayout, 
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob
} from './pages'

import {action as actionRegister} from './pages/Register'
import {action as actionLogin} from './pages/Login'
import {loader as actionVerifyUser} from './pages/DashboardLayout'
import {action as actionCreateJob} from './pages/AddJob'
import {loader as actionAllJobs} from './pages/AllJobs'
import {loader as editJobLoader} from './pages/EditJob'
import {action as editJobAction} from './pages/EditJob'
import {action as deleteJobAction} from './pages/DeleteJob'
import {loader as adminLoader} from './pages/Admin'
import {action as profileAction} from './pages/Profile'
import {loader as loaderStats} from './pages/Stats'

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}

checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Landing></Landing>
      },
      {
        path: 'register',
        element: <Register></Register>,
        action: actionRegister
      },
      {
        path: 'login',
        element: <Login></Login>,
        action: actionLogin
      },
      {
        path: 'dashboard',
        element: <DashboardLayout></DashboardLayout>,
        loader: actionVerifyUser,
        children: [
          {
            index: true,
            element: <AddJob></AddJob>,
            action: actionCreateJob
          },
          {
            path: 'stats',
            element: <Stats></Stats>,
            loader: loaderStats
          },
          {
            path: 'all-jobs',
            element: <AllJobs></AllJobs>,
            loader: actionAllJobs
          },
          {
            path: 'profile',
            element: <Profile></Profile>,
            action: profileAction
          },
          {
            path: 'admin',
            element: <Admin></Admin>,
            loader: adminLoader
          },
          {
            path: 'edit-job/:id',
            element: <EditJob></EditJob>,
            loader: editJobLoader,
            action: editJobAction
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction
          }
        ]
      }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App