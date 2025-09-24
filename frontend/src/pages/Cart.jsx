import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/CreateContext.jsx'
import Title from '../components/Title'
import { assets } from '../assets/assets.js';
import CartTotal from '../components/CartTotal';
const Cart = () => {
  const {products , currency , cartItems ,updateQuntity,navigate} = useContext(ShopContext);
  const [cartData , setCartData] = useState([])


  useEffect(() =>{
    console.log(cartItems)
    const tempData = []
    for( const productId in cartItems){
      for(const size in cartItems[productId]){
        tempData.push({
          _id:productId,
          size : size,
          quantity : cartItems[productId][size]
        })
      }
    }
    setCartData(tempData)
  },[cartItems])
  console.log()

  return (
    <div className='border-t pt-14'>
        <div className='text-2xl bm-3'>
          <Title text1={'your'} text2={'cart'}/>
        </div>
        <div>
          {
            cartData.map((item , index) =>{
              const productData = products.find((product) => product._id === item._id);
              return (
                <div className='py-4 flex border-t border-b text-gray-700  grid-cols-2 sm:grid-cols-3]' key={index}>

                  <div className='flex items-start w-full justify-around  gap-6'>
                    
                     <div className='flex items-start justify-around'>
                      <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />

                      <div>
                         <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                           <p>{currency}{productData.price}</p>
                      </div>
                      
                        <p className='p-2 ms-5 sm:ms-16 md:ms-20  lg:ms-28 sm:px-3 sm:py-1 border bg-slate-50 '>{item.size}</p>
                     </div> 

                      <input onChange={(e) =>{
                        if(e.target.value === '' || e.target.value === '0'){
                          updateQuntity(item._id ,item.size,0)
                        }
                        else{
                          updateQuntity(item._id ,item.size,Number(e.target.value))
                        }
                      }}
                      
                      className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 outline-none' type="number" min={1} defaultValue={item.quantity} />
                      <img onClick={()=>updateQuntity(item._id ,item.size,0)} className='mw-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
                  </div>
                 

                </div>
                
              )
            })
          }
          <div className='flex justify-end my-20 '>
            <div className='w-full sm:w-[450px]'>
               <CartTotal/>
            </div>

            {/* proceed to checkout  */}
            
          </div>
          <div className='w-full text-end'>
              <button className=' uppercase bg-black text-white text-sm my-8 px-8 py-3 rounded' onClick={() =>navigate('/place-order')}>Proceed to checkout</button>
          </div>
        </div>

       
    </div>
  )
}

export default Cart