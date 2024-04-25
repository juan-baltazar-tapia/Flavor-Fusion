const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users.js')
//const password = import.meta.env.VITE_MONGOOSE_PASSWORD

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://18jbaltazar:${import.meta.env.VITE_MONGOOSE_PASSWORD}@flavor-fusion.jz3ghjp.mongodb.net/users`)

app.post('/register', (req,res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch((err) => res.json(err) )

})

app.listen(3001, () => console.log("Server is running..."))