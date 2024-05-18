const Gallery = require('../models/Gallery')


// uploading images 
exports.uploadImage = async(req,res) =>{
    try{
      const {tag,isFavorite}  = req.body
      if(req.file==undefined ){
       return  res.status(400).json({
            success:false,
            message:"Image is mandatory"
         })
      }
      if(tag == undefined){
         return res.status(400).json({
            success:false,
            message:"Tag is mandatory"
         })
      }
const newData = Gallery({image:`http://localhost:4000/gallery/${req.file.filename}`,tag,isFavorite})
const message = await newData.save();
return res.status(200).json({
   success:true,
   message
})}
    catch(err){
 res.status(400).json({success:false,
    message:`Something Went Wrong - ${err}`
 })
    }
}


// fetching latest images
exports.getLatestImages = async(req,res)=>{
   try{
      let {count} = req.query
      if (count == undefined){
          count = 10
      }
      const message = await Gallery.find().sort({ uploadedAt: -1 }).limit(count).exec();
      return res.status(200).json({
         success:true,
         message
      })
   }
   catch(err){
res.status(400).json({success:false,
    message:`Error - ${err}`
 })
   }
}


// searching images with tags
exports.searchImages = async(req,res)=>{
try{
   const {tag} = req.params;
   console.log(tag)
   if(tag == undefined || tag == null ){
      return res.status(400).json({
         message:"Please Enter value"
      })
   }
   const regex = new RegExp(tag, 'i');
   const message = await Gallery.find({ tag: { $regex: regex } })
  
   return res.status(200).json({
      success:true,
      message
   })

}
catch(err){
   res.status(400).json({success:false,
      message:`Error - ${err}`
   })
}
}


// fetching favorites images
exports.getFavorites = async(req,res)=>{
try{
   let {count} = req.query
      if (count == undefined){
          count = 10
      }

const message = await Gallery.find({isFavorite:true}).sort({ uploadedAt: -1 }).limit(count).exec();

res.status(200).json({
   success:true,
   message
})
}
catch(err){
   res.status(400).json({success:false,
      message:`Error - ${err}`
   })
}
}

