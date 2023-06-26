const userModel = require('../models/userModel');
const JWT = require('jsonwebtoken');

const createToken =  (_id)=>{
    return JWT.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

const signupController = async (req,res)=>{
    const {username,email,password} = req.body;
    try {
        const user = await userModel.signup(username,email,password)
        const token = createToken(user._id)
        res.status(200).json({email:user.email,username:user.username,token})
    }catch(err){
        res.status(400).json({message:err.message});
    }
}
const loginController = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.login(email,password)

        const token = createToken(user._id)
        res.status(200).json({email:user.email,username:user.username,token})
    }catch(err){
        res.status(400).json({message:err.message});
    }
}


module.exports = {signupController,loginController}