import React, { useContext } from 'react'
import { ShopContext } from '../context/CreateContext.jsx'
import Title from '../components/Title'
const CartTotal = () => {
    const {currency,delivery_fee,getCartAmount}= useContext(ShopContext)
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'cart'} text2={'totals'}/>
        </div>
        <div className='mt-2 text-sm flex gap-2 flex-col capitalize'>
            <div className='flex justify-between'>
                <p>subtotal</p>
                <p>{currency}{getCartAmount()}.00</p>

            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shiping Fee</p>
                <p>{delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Total</p>
                <p>{currency}{getCartAmount() ===0 ? 0 : getCartAmount() + delivery_fee}.00</p>
                
            </div>
            <hr />
        </div>

    </div>
  )
}

export default CartTotal