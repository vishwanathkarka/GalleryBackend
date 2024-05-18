const express = require("express")
const router = express.Router()
const multer = require("multer");
const {uploadImage,getLatestImages,getFavorites,getImagesWithId,searchImages} = require("../controller/Gallery")
const path = require("path");

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage,
})

router.route("/upload").post(upload.single('gallery'),uploadImage)
router.route("/latestImages").get(getLatestImages)
router.route("/favorites").get(getFavorites)
router.route("/search/:tag").get(searchImages)


module.exports = router;