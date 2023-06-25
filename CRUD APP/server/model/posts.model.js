const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    name:String,
    location:String,
    userID: String,
})

const CompanyModel = mongoose.model("company", CompanySchema)

module.exports =  CompanyModel
