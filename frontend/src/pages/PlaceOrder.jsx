import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/CreateContext.jsx'

const PlaceOrder = () => {
  const [method , setMethod] = useState('cod')
  const {navigate} =useContext(ShopContext)
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-4 sm:pt-14 min-h[80vh] border-t'>
      {/* left side  */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'delivery'} text2={'information'}/>
          </div>
          <div className='flex gap-3'>
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Frist Name' />
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
          </div>
             <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email 
             Address' />
                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
          
           <div className='flex gap-3'>
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
          </div>
           <div className='flex gap-3'>
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="Number" placeholder='Zipe code' />
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='country' />
          </div>
             <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='phone number' />
        </div>


        {/* Right side  */}
        <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <CartTotal/>
          </div>
          <div className='mt-12'>
            <Title text1={'payment'} text2={'method'}/>
            {/* payment method selection  */}
            <div className='flex gap-3 flex-col lg:flex-row'>
              <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border py-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe'? 'bg-green-400' : ''}`}></p>
                  <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
              </div>
              <div onClick={() =>setMethod('razorpa')} className='flex items-center gap-3 border py-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpa' ? 'bg-green-400' : ''}`}></p>
                  <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
              </div>
              <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border py-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
               <p className=' uppercase text-gray-500 text-sm font-medium mx-4'>cash on delivery</p>
              </div>
            </div>

          </div>
          <div className='w-full text-center sm:text-end mt-8'>
            <button onClick={()=>navigate('/order')} className='bg-black text-white px-16 py-3 text-sm rounded'>place order</button>
 
          </div>
        </div>
    </div>
  )
}

export default PlaceOrder