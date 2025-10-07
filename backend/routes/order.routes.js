import expres from 'express'
import  {placeOrder , placeOrderStripe  ,userOrder,allOrders , updateStatus, verifyStripe, trackProdct} from '../controllers/order.controller.js'
import adminAuth  from '../middleware/adminAuth.js'
import userAuth from '../middleware/userAuth.middleware.js'
import authUser from '../middleware/userAuth.middleware.js'
const orderRouter = expres.Router()

// addmin featuress 

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)


//payment featuress

orderRouter.post('/place', userAuth , placeOrder)
orderRouter.post('/stripe' , userAuth , placeOrderStripe)


//user featuress 

orderRouter.post('/userorders' , userAuth , userOrder)
orderRouter.get('/trackorder' , userAuth , trackProdct)
// verify payment 
orderRouter.post('/verifyStripe',authUser , verifyStripe)
export default orderRouter
