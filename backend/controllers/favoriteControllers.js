const favoriteModel = require('../models/favoriteModel');
const mongoose = require('mongoose');

const getAll = async (req,res) => {
    const { _id } = req.user
    try {
        const allImages = await favoriteModel.find({user_id:_id});
        res.status(200).json({allImages});
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const addOne = async (req,res) => {
    const { date , url , title } = req.body;
    const { _id } = req.user
    if(!date ||!url || !title){
        res.status(400).json({message:'all feilds are required'});
    }else {
        try {
            const oneImage = await favoriteModel.create({date,url,title,user_id:_id})
            res.status(200).json({oneImage});
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
}

const removeOne = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message:'image does not exist'})
    }else {
        try {
            const image = await favoriteModel.findOneAndDelete({_id:id})
            res.status(200).json({Image:image})
        }catch(err){
            res.status(400).json({message:err.message})
        }
    }
}

module.exports = {getAll,addOne,removeOne}