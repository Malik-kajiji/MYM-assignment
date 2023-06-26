const userModel = require('../models/userModel');
const JWT = require('jsonwebtoken');

const createToken =  (_id)=>{
    return JWT.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

const googleLogin = async (req,res) => {
    const {username,email} = req.body;
    try {
        const user = await userModel.googleSign(username,email)
        const token = createToken(user._id)
        res.status(200).json({email:user.email,username:user.username,token})
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

module.exports = { googleLogin }