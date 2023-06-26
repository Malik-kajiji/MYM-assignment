const mongoose = require('mongoose');
const Schema = mongoose.Schema

const favoriteSchema = new Schema({
    date: {
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true,
    },
    url: {
        type:String,
        required:true
    },
    user_id: {
        type:String,
        required:true
    }
},{ timestamps:true })


module.exports = mongoose.model('favorite',favoriteSchema)