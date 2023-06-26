const User = require('../models/userModel');
const JWT = require('jsonwebtoken');


const authMiddleware = async (req,res,next)=>{
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error:'token is required'});
    }

    try {
        const token = authorization.split(' ')[1];
        const {_id} = JWT.verify(token,process.env.SECRET);
        req.user = await User.findOne({_id}).select('_id');
        next()
    }catch (err){
        return res.status(401).json({error:err.message});
    }
}

module.exports = authMiddleware