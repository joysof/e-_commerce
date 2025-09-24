import validator from 'validator'
import bcrypt from 'bcrypt'
import UserModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'

// Route for user login 

const createToken =(id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET)
}
const loginUser = async (req,res) =>{
    const {email , password} = req.body
    const user = await UserModel.findOne({email})

    if(!user){
        return res.json({success : false , message: "user does't exits"})
    }
    const isMatch = await bcrypt.compare(password ,user.password)

    if (isMatch) {
        const token = createToken(user._id)
        res.json({success: true , token})
        
    }else{
        res.json({success: false , message: "Invalid password"})
    }

}
// Route for user register

const registerUser =async (req,res)=>{
    try {
        const {name, email,password} = req.body;

        // checking user already exists or not 
        const exists = await UserModel.findOne({email})
        if (exists) {
            return res.json({success:false
                 , message:"user already register this email"
            })    
        }
        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false
                 , message:"plase enter a valid email"
            })  
        }
        if (password.length < 8 ) {
            return res.json({success:false
                 , message:"plase enter a strong password"
            })  
        }
        // hasihing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password ,salt)

        const newUser = new UserModel ({
            name,
            email,
            password : hashedPassword
        })
        
        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({
            success:true,
            token
        })


    } catch (error) {
      console.log('register user error ' ,error)
      res.json({success : false , message : error.message})  
    }
}

// Route for admin login 

const adminLogin =async (req,res) =>{
    try {
        const {email , password} = req.body

        console.log("froentend",'email',email ,'password' , password)
        
        if (email.trim() === process.env.ADMIN_EMAIL.trim() && String(password) === String(process.env.ADMIN_PASSWORD)) {
           const token = jwt.sign(email+password, process.env.JWT_SECRET)
           return res.json({success : true ,token})
        }else{
            res.json({success: false ,message  :"Invalid email/password"})
        }
    } catch (error) {
        console.log('admin login error ' ,error)
      res.json({success : false , message : error.message})  
    }

}

export {loginUser ,registerUser , adminLogin}
