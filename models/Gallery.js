const mongoose = require("mongoose")

const galleryModel =  new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    tag:{
        type: String,
       
    },
    isFavorite:{
        type:Boolean,
        default:false
    },
    uploadedAt:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Gallery", galleryModel);