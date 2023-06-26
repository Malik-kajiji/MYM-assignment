const express = require('express');
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const favoriteRouter = require('./routes/favoriteRouter');
const googleAuth = require('./routes/googleAuth');


const app = express()
app.use(express.json())
app.use(cors({
    origin:'*',
    methods:'GET,POST,PUT,DELETE',
    credentials:true
}))


app.use('/user',userRoutes)
app.use('/google',googleAuth)
app.use('/favorite',favoriteRouter)


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`listening to port ${process.env.PORT} & connected to mongodb`)
    })
})
.catch((err)=>{
    console.log(err)
})
