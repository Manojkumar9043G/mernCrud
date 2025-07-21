const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./authRoutes/Routes');
require('dotenv').config();
app.use(express.json());
const PORT = 3000;


mongoose.connect('mongodb://localhost:27017/mernCurd')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api',authRoutes);


app.listen(PORT,()=>{
    console.log("This server runing on PORT number ",PORT);
});