const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const items = require('./routes/api/items')

const app = express()

//Middleware

app.use(bodyParser.json())

// DB Config

const db = require('./config/keys').mongoURI

//Connect to Mongo
mongoose.connect(db)
    .then(()=>console.log("Mongo DB Connected..."))
    .catch(err => console.log(err))


//Use Routes
    app.use('/api/items',items)


//PORT & SERVER Connection Listener
const port = process.env.PORT || 5000
app.listen(port,()=>console.log(`SERVER Started at ${port}`))