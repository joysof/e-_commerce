
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

// user order product 

const  userOrder= async (req,res) =>{
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    const order = await orderModel.find({userId})
    res.json({success : true ,order})
  } catch (error) {
    console.log(error)
    res.json({success : false , message : error.message})
  }

}
// addmin all product list

const allOrders= async (req,res) =>{
  try {
    const orders = await orderModel.find({})
    res.json({success : true , orders})
  } catch (error) {
    console.log(error)
    res.json({success : false, message : error.message})
  }

}


//

//update order status for admin panel

const updateStatus= async (req,res) =>{
  try {
    const {orderId , status} = req.body

    await orderModel.findByIdAndUpdate(orderId , {status})
    res.json({success :true , message: "status updated"})
  } catch (error) {
     console.log(error)
    res.json({success : false, message : error.message})
  }
}


export {placeOrder , placeOrderStripe ,placeOrderRazorpay ,userOrder,allOrders , updateStatus}