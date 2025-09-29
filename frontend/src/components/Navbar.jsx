
import { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext} from '../context/CreateContext.jsx'
const Navbar = () => {
 
  const [visible , setVisible] = useState(false)
  const{setShowSearch , getCartCount ,navigate,token,setToken,setCartItems} =useContext(ShopContext)
 
  const logout = () =>{
    localStorage.removeItem('token')
    setToken("")
    setCartItems({})
    navigate('/login')
    console.log("logout word")
  }
  return (

    <div className='flex items-center justify-between py-5 font-medium'>
            {/* nav logo hear  */}
              <Link to={'/'}><img src={assets.logo} className='w-36' alt="" />  </Link>
            <ul className=' uppercase hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to={'/'} className='felx flex-col items-center gap-1'>
                  <p>home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to={'/collection'} className='felx flex-col items-center gap-1'>
                  <p>collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to={'/about'} className='felx flex-col items-center gap-1'>
                  <p>about</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to={'/contact'} className='felx flex-col items-center gap-1'>
                  <p>contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={() =>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
                <div className='group relative'>
                  <img onClick={() =>token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                  {
                    token &&
                 
                  <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                      <p className='cursor-pointer hover:text-black '>My profile</p>
                      <Link to={'/orders'} className='cursor-pointer hover:text-black '> Orders</Link>
                      <p className='cursor-pointer hover:text-black ' onClick={logout}> Logout</p>

                    </div>
                 
                  </div>
                  }
                </div>
                 <Link to={'/cart'} className=' relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" /> 
                      <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                  </Link>

                   <img onClick={() =>{setVisible(true)}} className='w-5 cursor-pointer max-w-5 sm:hidden' src={assets.menu_icon} alt="" />
            </div>


              {/* sidebar menu small screns  */}

            <div className={`absolute flex flex-col top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
              <div onClick={() =>{setVisible(false)}} className=' cursor-pointer flex items-center gap-4 p-3'>
                  <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                  <p>Back</p>
              </div>
              <NavLink className='py-2 pl-6 border ' onClick={() =>{setVisible(false)}} to={'/'}>Home</NavLink>
              <NavLink className='py-2 pl-6 border ' onClick={()=>{setVisible(false)}} to={'/collection'}>collection</NavLink>
              <NavLink className='py-2 pl-6 border ' onClick={()=>{setVisible(false)}} to={'/about'}>about</NavLink>
              <NavLink className='py-2 pl-6 border ' onClick={()=>{setVisible(false)}} to={'contact'}>contact</NavLink>
            </div>
           
    </div>
  )
}

export default Navbar