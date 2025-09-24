
import './App.css'
import Navbar from './components/Navbar'
import Sideber from './components/Sideber'
import { Routes ,Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Orders'
import { useEffect, useState } from 'react'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
export const backenUrl = import.meta.env.VITE_BACKEND_URL


export const currency = "$"
function App() {

const [token, setToken] = useState(localStorage.getItem("token") || "")

 useEffect(() =>{
  localStorage.setItem('token' ,token)
 },[token])


  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === "" ? <Login setToken={setToken}/>
      :  
   
      <>
      <Navbar setToken={setToken}/>
      <hr />
      <div className='flex w-full'>
        <Sideber/>
        <div className='w-[70%] mx-auto ml-[max(5vw , 25vw)] my-8 text-gray-600 text-base'>
        <Routes>
          <Route path='/add' element={<Add token={token}/>}/>
          <Route path='/list' element={<List token={token}/>}/>
          <Route path='/order' element={<Order token={token} />}/>
        </Routes>

        </div>

      </div>
      </>
     
     
      
      }
    </div>
  )
}

export default App
