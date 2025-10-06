import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/CreateContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Verify = () => {
  const { setCartItems, backendUrl } = useContext(ShopContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')


  const verifyPayment = async () => {
     console.log("Verify function called ✅");
    console.log("Request body:", { success, orderId });
    console.log(token)
    try {
      if (!token) {
        console.log('token not found ')
        return null
      }
      const response = await axios.post(
        backendUrl + 'api/order/verifyStripe',
        { success , orderId },
        { headers: { token: token } }
      )
      if (response.data.success) {
        setCartItems({})
        navigate('/orders')
      } else {

        navigate('/cart')
        console.log("this error")
      }
      console.log(response)
    } catch (error) {
        console.error(error.response?.data || error.message)
      toast.error(error.message)
    }
  }
  useEffect(
    () => {
      if(token) 
        verifyPayment()
    },
    [ token ]
  )
  return <div></div>
}

export default Verify
