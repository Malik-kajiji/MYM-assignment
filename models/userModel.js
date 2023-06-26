const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
    },
    provider: {
        type:String,
    }
},{ timestamps:true })


userSchema.statics.signup = async function(username,email,password){
    const exists = await this.findOne({email})
    if(exists){
        throw Error('email already in use')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({username,email,password:hash})

    return user
}

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(!user){
        throw Error('email does not exist')
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('wrong password')
    }

    return user
}

userSchema.statics.googleSign = async function(username,email){
    const user = await this.findOne({email,provider:'google'});
    if(user){
        return user
    }else {
        const user = await this.create({username,email,provider:'google'})
        return user
    }
}

module.exports = mongoose.model('user',userSchema)