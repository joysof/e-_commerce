
import orderModel from "../models/order.models.js"
import userModel from '../models/user.model.js'

// placing order using cod method 


const placeOrder =async (req,res) =>{
    try {
        const {userId , items , amount , address  , } = req.body

        const orderData = {
            userId , 
            items,
            amount,
            address,
            paymentMethod :"COD",
            payment : false,
            date : Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId , {cartData :{}})

        res.json({success : true , message:"order placed"})
    } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
    }
    
}
// placing order using stripe method 

const placeOrderStripe = () =>{

}
// placing order using Razorpay method 

const placeOrderRazorpay = () =>{

}
// all order data for admin panel

const  userOrder= () =>{

}
// user order data  for frontend

const allOrders= () =>{

}


//

//update order status for admin panel

const updateStatus= () =>{

}


export {placeOrder , placeOrderStripe ,placeOrderRazorpay ,userOrder,allOrders , updateStatus}