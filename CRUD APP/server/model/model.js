const mongoose = require('mongoose');

const crudUsers = mongoose.Schema({
    email:String,
    password:String,
    location:String
})

const CrudModel = mongoose.model("user", crudUsers)

module.exports = CrudModel