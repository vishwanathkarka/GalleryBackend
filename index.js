const express = require('express');
const app = express();
const GalleryRoutes = require('./routes/Gallery')
const cors = require('cors');
const connectWithDb = require("./config/db")
require("dotenv").config();

connectWithDb()
app.use(express.json());
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.urlencoded({ extended: true}));
app.use('/gallery', express.static('upload/images'));
app.use('/api',GalleryRoutes);




app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
