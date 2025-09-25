import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import ConnectDB from './config/mongoDB.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/user.Routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'


// app confing

const app = express()
const port = process.env.PORT || 4000
ConnectDB()
connectCloudinary()
// middlerware


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())


// api endpoint

app.use('/api/user' , userRouter)
app.use('/api/product' ,productRouter)
app.use('/api/cart' , cartRouter)
app.use('/api/order' , orderRouter)

app.get('/', (req, res) => {
  res.send('api working is true you can work now')
})

app.listen(port, () => {
    
  console.log(`server start on port number http://localhost:${port}`)
})
