import orderModel from '../models/order.models.js'
import userModel from '../models/user.model.js'
import Stripe from 'stripe'

// golobal veriable
const currency = 'usd'
const deliveryCharge = 10

// getway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// placing order using cod method

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now(),
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.json({ success: true, message: 'order placed' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
// placing order using stripe method

const placeOrderStripe = async (req,res) => {
  try {
    const { userId, items, amount, address } = req.body
    const origin = req.headers.origin


    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now(),
    }
    const newOrder = new orderModel(orderData)
    await newOrder.save()
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }))

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,

      line_items,
      mode: 'payment',
    })
    res.json({ success: true, session_url: session.url })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// verifystripe payment method 

const verifyStripe = async (req,res) =>{
  const {orderId , success , userId} = req.body;
  try {
    if (success === 'true') {
      

      await orderModel.findByIdAndUpdate(orderId , {payment : true})
      await userModel.findByIdAndUpdate(userId , {cartData: {}})
       return res.status(200).json({
        success: true,
        message: "Payment verified successfully!",
        orderId
      })
    }else{
      await orderModel.findByIdAndDelete(orderId)
       return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      })
     
    }
  } catch (error) {
    console.log(error)
    res.json({success :false , message:error.message})
    console.log("error")
  }
}


// user order product

const userOrder = async (req, res) => {
  try {
    const { userId } = req.body
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'User ID is required' })
    }
    const order = await orderModel.find({ userId })
    res.json({ success: true, order })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// track single product 
// backend/routes/orderRoutes.js
const trackProdct =  async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id)
    res.json(order)
  } catch (error) {
    res.json({message : "something went wrong"})
  }
 
}

// addmin all product list

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//

//update order status for admin panel

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body

    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: 'status updated' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export {
  placeOrder,
  placeOrderStripe,
  userOrder,
  allOrders,
  updateStatus,
  verifyStripe,
  trackProdct
}
