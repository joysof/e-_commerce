import mongoose  from "mongoose";

const ConnectDB = async() =>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/eCommerce`)
        console.log('connectDB successful')
    } catch (error) {
        console.log('connectDB error' , error)
    }
}

export default ConnectDB