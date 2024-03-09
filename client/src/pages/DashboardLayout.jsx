import React, { useState, createContext, useContext } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import { checkDefaultTheme } from '../App'
import customFetch from '../utils/customFetch'

export const loader = async() => {
  try {
    const {data} = await customFetch.get('/users/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}

const DashboardContext = createContext()

const DashboardLayout = () => {
  const {user} = useLoaderData()
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
  }
  
  const logoutUser = async () => {
    console.log(navigate('/'))
    await customFetch.get('/auth/login')
    toast.success('successful logout')
  }

  return (
    <DashboardContext.Provider
    value={{user, toggleDarkTheme, toggleSidebar, logoutUser, setIsDarkTheme, showSidebar, isDarkTheme}}>
    <Wrapper>
        <main className='dashboard'>
            <SmallSidebar></SmallSidebar>
            <BigSidebar></BigSidebar>
            <div>
                <Navbar></Navbar>
                <div className='dashboard-page'>
                <Outlet context={{user}}></Outlet>
                </div>
            </div>
        </main>
    </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout