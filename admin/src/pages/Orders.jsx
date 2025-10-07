import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backenUrl, currency } from '../App.jsx'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets.js'
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(
        backenUrl + 'api/order/list',
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchAllOrders()
  }, [token])

  orders.map((order) => {
    let address = {}
    try {
      address = JSON.parse(order.address)
    } catch (e) {
      console.error('Invalid address JSON', e)
    }
  })

  const statusHandler =async (e , orderId) =>{
    try {
      const response = await axios.post(backenUrl + 'api/order/status' ,{orderId , status:e.target.value} , {headers : {token}})
      if (response.data.success) {
        await fetchAllOrders()
        
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  return (
    <div>
      <h2>Order Page</h2>
      <div>
        {orders.map((order, index) => {
          let address = {}
          try {
            address = JSON.parse(order.address)
          } catch (e) {
            console.error('Invalid address JSON', e)
          }
          return (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            >
              {order.items?.map((item, index) =>(
                
                <img key={index}  src={item.image ? item.image[0] : ''}/>
        ))}

              <div>
                <div>
                  {order.items?.map((item, index) => {
                    if (index === order.items.length - 1 ? ',' : '') {
                      return (
                        
                        <p key={index} className="py-0.5">
                          {item.name} x {item.quantity} <span>{item.size}</span>
                        </p>
                      )
                    } else {
                      return (
                        <p key={index} className="py-0.5">
                          {item.name} x {item.quantity}{' '}
                          <span>{item.size} ,</span>
                        </p>
                      )
                    }
                  })}
                </div>
                <p className="mt-3 mb-2 font-medium">
                  {address.firstName} {address.lastName}
                </p>
                <div>
                  <p>{address.street + ' ,'}</p>
                  <p> {address.city +' ,' + address.state +
                      ',' +
                      address.country +
                      ',' +
                      address.zipcode}
                  </p>

                  <p>{address.phone}</p>
                </div> 
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? 'Done' : 'pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
             
              <p className='text-sm sm:text-[15px]'>
                {currency} {order.amount}
              </p>
              <select onChange={(e) =>statusHandler(e,order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="Order placed">Order placed</option>
                <option value="packing">packing</option>
                <option value="shipped">shipped</option>
                <option value="out for delivery">Out of delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
