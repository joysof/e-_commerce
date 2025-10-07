import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/CreateContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
  const { setCartItems, backendUrl } = useContext(ShopContext)
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const verifyPayment = async () => {
    console.log("Verify function called ✅")
    console.log("Request body:", { success, orderId })
    console.log("Token:", token)

    if (!token) {
      console.log("❌ Token not found")
      toast.error("Please login again!")
      navigate('/login')
      return
    }

    try {
      const response = await axios.post(
        `${backendUrl}api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      )

      console.log("✅ Response:", response.data)

      if (response.data.success) {
        toast.success("Payment verified successfully! ✅")
        setCartItems({})
        navigate('/orders')
      } else {
        toast.error("Payment verification failed ❌")
        navigate('/cart')
      }
    } catch (error) {
      console.error("🔥 Error:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Payment verification failed!")
    }
  }

  useEffect(() => {
    if (token && success && orderId) {
      (async () => {
        try {
          await verifyPayment()
        } catch (err) {
          console.error("Error in useEffect:", err)
        }
      })()
    }
  }, [token, success, orderId])

  return <div className="p-5 text-center">Verifying payment...</div>
}

export default Verify
