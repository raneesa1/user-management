const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors');
const mongoose = require('mongoose')
const multer = require('multer')


const userRouter = require('./router/user')
const adminRouter = require('./router/admin')

const bcrypt = require('bcrypt')
const path = require('path');
const port = 3000



require('dotenv').config()
// const nocache = require('nocache')



app.use(cors(
    {
        origin: "http://localhost:4200"
    }
))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'))
app.use("/profileimages", express.static('public/photos'))

app.use('/', userRouter)
app.use('/admin', adminRouter)


// app.use((req, res, next) => {
//     res.status(404).render('user/404'); 
// });


const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(error => {
        console.error('Failed to connect to MongoDB:', error);
    });

app.listen(port, (req, res) => {

    console.log('server running')
})



