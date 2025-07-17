import { useState, useEffect } from 'react';
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components/index';
import { Outlet } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.log("Auth check error:", error);
        dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className='min-h-screen flex flex-col justify-between bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500'>
      <div className='w-full h-full flex flex-col justify-start'>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
      <Analytics />
    </div>
  ) : null;
}

export default App
